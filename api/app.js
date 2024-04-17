const express = require('express');
const app = express();
const cors = require('cors');
const port = 8081;
const knex = require("knex")(require("./knexfile.js")["development"]);

app.use(cors(), express.json());