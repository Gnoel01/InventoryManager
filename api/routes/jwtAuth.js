const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const knex = require("knex")(require("../knexfile.js")["development"]); 
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");
// Authentication
router.post("/register", validInfo, async (req, res) => {
  const { name, username, password } = req.body;
  try {
    // Refactor to use Knex for database query
    const user = await knex('users').where({username: username });
    if (user.length > 0) {
      return res.status(401).json("User already exist!");
    }
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);
    // Refactor to use Knex for inserting a new user
    let newUser = await knex('users')
      .returning('*')
      .insert({
        name: name,
        username: username,
        password: bcryptPassword
      });
    const jwtToken = jwtGenerator(newUser[0].user_id);
    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.post("/login", validInfo, async (req, res) => {
  const { username, password } = req.body;
  try {
    // Refactor to use Knex for database query
    const user = await knex('users').where({ username: username });
    if (user.length === 0) {
      return res.status(401).json("Invalid Credential");
    }
    const validPassword = await bcrypt.compare(
      password,
      user[0].password
    );
    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }
    const jwtToken = jwtGenerator(user[0].user_id);
    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.get("/verify", authorize, 
async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;