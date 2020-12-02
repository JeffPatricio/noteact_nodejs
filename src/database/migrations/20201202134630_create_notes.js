exports.up = function (knex) {
  return knex.schema.createTable('notes', (table) => {
    table.increments();
    table.string('title').notNullable();
    table.text('content').notNullable();
    table.string('userId').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('notes');
};
