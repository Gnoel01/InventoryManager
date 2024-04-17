/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('items', table => {
        table.increments('id')
        table.string('name').unique()
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
    .alterTable('items', table => {
      table.dropForeign('user_id');
      table.dropUnique('name');
    })
    .then(() => {
        return knex.schema.dropTableIfExists("items")
    })
};
