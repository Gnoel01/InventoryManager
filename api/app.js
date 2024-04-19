const express = require('express');
const app = express();
const cors = require('cors');
//const axios = require('axios');
const port = 8081;
const knex = require("knex")(require("./knexfile.js")["development"]);
//const masterinv = knex(require("./knexfile.js")["development"]);
const authorize = require('./middleware/authorize');

app.use(cors(), express.json());


app.get('/', (req, res) => {
    res.send('testing');
  })

// register and login routes
app.use("/auth", require("./routes/jwtAuth.js"));

app.use("/dashboard", require("./routes/dashboard"));

  app.get('/users', (req, res) => {
    knex('users')
        .select('id','name',)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(404).send(err))
})

app.get('/inventory', authorize, (req, res) => {
  const user_id = req.user;
  knex('inventory')
    .join('items', 'inventory.item_id', 'items.id')
    .select('items.name', 'items.description', knex.raw('SUBSTRING(items.description, 1, 100) AS trimmed_description'), 'items.quantity')
    .where('inventory.user_id', user_id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(404).send(err))
});
app.post('/item', authorize, async (req, res) => {
  try {
      const { name, description, quantity } = req.body;
      const user_id = req.user;
      const newItem = await knex('items').insert({
          name,
          description,
          quantity,
          user_id
      }).returning('*');
      if(newItem.length > 0) {
          return res.status(201).send(newItem);
      } else {
          return res.status(400).send("Item could not be created");
      }
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
  }
});

app.post('/api/items/add', authorize, async (req, res) => {
  const { name, description, quantity } = req.body;
  try {
      const newItem = await knex('items').insert({
          name,
          description,
          quantity
      }).returning('*');
      if(newItem.length > 0) {
          res.status(201).json({ success: true, message: "Item added", item: newItem });
      } else {
          res.status(400).json({ success: false, message: "Item could not be created" });
      }
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
});

app.put('/item/:id', authorize, async (req, res) => {
  const { id } = req.params;
  const { name, description, quantity } = req.body;
  try {
      const updatedItem = await knex('items')
          .where({ id })
          .update({
              name,
              description,
              quantity
          }).returning('*');
      if(updatedItem.length > 0) {
          res.json(updatedItem);
      } else {
          res.status(404).json({ error: "Item not found" });
      }
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Server Error" });
  }
});


app.delete('/api/items/delete/:id', authorize, async (req, res) => {
  const { id } = req.params;
  try {
      const deleted = await knex('items').where('id', id).del();
      if(deleted) {
          res.json({ success: true, message: "Item deleted" });
      } else {
          res.status(404).json({ success: false, message: "Item not found" });
      }
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
});


// app.delete('/item/:id', authorize, async (req, res) => {
//   const { id } = req.params;
//   try {
//       const deleted = await knex('items')
//           .where({ id })
//           .del();
//       if(deleted) {
//           res.json({ message: "Item deleted" });
//       } else {
//           res.status(404).json({ error: "Item not found" });
//       }
//   } catch (err) {
//       console.error(err.message);
//       res.status(500).json({ error: "Server Error" });
//   }
// });
app.get('/items', (req, res) => {
  knex('items')
    .select('name', knex.raw('SUBSTRING(description, 1, 100) AS trimmed_description'), 'quantity')
    .then(data => res.status(200).json(data))
    .catch(err => res.status(404).send(err))
});
app.get('/item/:id', (req, res) => {
  const { id } = req.params;
  knex('items')
    .where({ id })
    .select('*')
    .first()
    .then(item => {
        if (item) {
            res.status(200).json(item);
        } else {
            res.status(404).json({error: "Item not found"});
        }
    })
    .catch(err => res.status(500).json({error: "Server Error"}));
});
  app.listen(port, () => console.log(`Express server is listening on ${port}.`))



  //   app.get('/inventory', async (req, res) => {
//     try {
//       const data = await knex('inventory').select('*');
//       res.status(200).json(data);
//     } catch (err) {
//       res.status(404).send(err);
//     }
//   });

  /*app.post("/register", (req, res) => {
    const { username, password } = req.body;
    knex('users').insert({
      username: username,
      password: password
    }).then(result => {
        res.json({ success: "User created successfully" });
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: "Error registering new user" });
    });
  });
  app.post('/login', (req, res) => {
    const { username, password } = req.body;
    knex.select('*').from('users').where({
      username: username,
      password: password
    }).then(result => {
        if (result.length > 0) {
          res.send(result);
        } else {
          res.send({ message: "Wrong username/password combination!" });
        }
    }).catch(err => {
        res.send({ err: err });
    });
  });*/

//   app.listen(3000, () => {
//     console.log("running server");
//   });