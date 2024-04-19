/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('inventory', table => {
        table.increments('id')
        table.string('item_name')
        // table.foreign('item_name').references('items.name')
        table.integer('item_id')
        table.foreign('item_id').references('items.id')
        table.integer('user_id')
        table.foreign('user_id').references('users.id')
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .alterTable('inventory', table => {
      // table.dropForeign('item_name');
      table.dropForeign('item_id');
      table.dropForeign('user_id');
    })
    .then(() => {
        return knex.schema.dropTableIfExists("inventory")
    })
};
