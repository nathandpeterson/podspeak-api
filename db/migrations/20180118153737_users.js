
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments()
        table.string('email').notNullable().defaultsTo('')
        table.string('hashed_password').notNullable().defaultsTo('')
        table.string('first_name').notNullable().defaultsTo('')
        table.string('last_name').notNullable().defaultsTo('')
        table.string('avatar').notNullable().defaultsTo('')
        table.boolean('active').defaultsTo(false)
        table.integer('privacy').notNullable().defaultsTo(0)
        table.timestamps(true, true)
      })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
}
