exports.up = (knex) => {
  return knex.schema.createTable("messages", (table) => {
    table.increments();
    
    table.bigInteger("id_sender").notNullable();
    table.bigInteger("id_receiver").notNullable();
    table.text("text");
    table.timestamp("send_date").notNullable();
    table.boolean("read");
    table.bigInteger("session");

    table.foreign("id_sender").references("id").inTable("users");
    table.foreign("id_receiver").references("id").inTable("users");
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable("messages");
};
