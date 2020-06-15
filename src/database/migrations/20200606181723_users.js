exports.up = (knex) => {
  return knex.schema.createTable("users", (table) => {
    table.increments();
    table.string("name").notNullable();
    table.string("photo");
    table.boolean("online");
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("users");
};
