
exports.up = function(knex, Promise) {
    return knex.schema.createTable('user_podcast', (table) => {
        table.integer('podcast_id').notNullable()
        table.foreign('podcast_id').references('podcasts.id')
        table.integer('user_id').notNullable()
        table.foreign('user_id').references('users.id')
    })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_podcast')
}
