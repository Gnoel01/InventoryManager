const express = require('express');
const app = express();
const cors = require('cors');
//const axios = require('axios');
const port = 8081;
const knex = require("knex")(require("./knexfile.js")["development"]);
//const masterinv = knex(require("./knexfile.js")["development"]);

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

app.get('/inventory', (req, res) => {
    knex('inventory')
      .select('*')
      .then(data => res.status(200).json(data))
      .catch(err => res.status(404).send(err))
  });

//   app.get('/inventory', async (req, res) => {
//     try {
//       const data = await knex('inventory').select('*');
//       res.status(200).json(data);
//     } catch (err) {
//       res.status(404).send(err);
//     }
//   });



  app.listen(port, () => console.log(`Express server is listening on ${port}.`))


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