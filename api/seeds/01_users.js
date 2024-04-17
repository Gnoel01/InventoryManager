/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // await knex('table_name').del()
  await knex.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE')
  await knex('users').insert([
    {name: 'Bob', username: 'bobcat', password: 'theword'},
    {name: 'Bill', username: 'clinton', password: 'theword'},
    {name: 'Watson', username: 'thewizard', password: 'theword'}
  ]);
};
