/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // await knex('table_name').del()
  await knex.raw('TRUNCATE TABLE items CASCADE')
  await knex('items').insert([
    {name: 'safety_vest', description: "reflective vest to keep employees visable while working" , quantity:50},
    {name: 'radio', description: "multi channel walky talky", quantity:50},
    {name: 'gloves', description: "protective gear for employees while working and handling materials", quantity:50},
    {name: 'Tug', description: "a mini car that is used to transport material around the work area", quantity:50}
  ]);
};
