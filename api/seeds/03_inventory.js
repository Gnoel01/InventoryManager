/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.raw('TRUNCATE TABLE inventory CASCADE')
  await knex('inventory').insert([
    {item_id: 1, item_name: 'safety_vest', user_id: 1},
    {item_id: 2, item_name: 'radio', user_id: 1},
    {item_id: 3, item_name: 'gloves', user_id: 2},
    {item_id: 4, item_name: 'Tug', user_id: 2}
  ]);
};
