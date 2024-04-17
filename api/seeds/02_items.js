/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // await knex('table_name').del()
  await knex.raw('TRUNCATE TABLE items CASCADE')
  await knex('items').insert([
    {name: 'safety_vest', user_id: 1},
    {name: 'radio', user_id: 1},
    {name: 'gloves', user_id: 2},
    {name: 'Tug', user_id: 2}
  ]);
};
