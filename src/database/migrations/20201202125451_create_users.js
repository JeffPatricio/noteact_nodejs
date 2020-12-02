exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('image');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
