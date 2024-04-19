const router = require("express").Router();
const authorize = require("../middleware/authorize");
const knex = require("knex")(require("../knexfile.js")["development"]);
router.post("/", authorize, async (req, res) => {
  try {
    // Refactoring to use Knex for querying the database
    const user = await knex('users')
      .select('user_name')
      .where({ id: req.user.id });
    // Since Knex returns an array, we directly access the first item
    res.json(user[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;