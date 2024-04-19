// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

// require('dotenv').config()

const seeding = 'postgres://postgres:docker@127.0.0.1:5432/masterinv'
const building = 'postgres://postgres:docker@127.0.0.1:5432/masterinv'

module.exports = {

  development: {
    client: 'pg',
    connection: building
  },

  seeding: {
    client: 'pg',
    connection: seeding
  }



};


  // staging: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // },

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'my_db',
  //     user:     'username',
  //     password: 'password'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }