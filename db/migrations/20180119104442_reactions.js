
exports.up = function(knex, Promise) {
    return knex.schema.createTable('reactions', table => {
        table.increments() 
        table.integer('user_id').notNullable()
        table.foreign('user_id').references('users.id')
        table.integer('episode_id').notNullable()
        table.foreign('episode_id').references('episodes.id')
        table.string('episode_timestamp').notNullable().defaultsTo('')
        table.string('content').notNullable().defaultsTo('')
        table.timestamps(true, true)
      })
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('reactions')
}
