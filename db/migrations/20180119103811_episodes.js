
exports.up = function(knex, Promise) {
    return knex.schema.createTable('episodes', table => {
        table.increments()
        table.integer('podcast_id').notNullable()
        table.foreign('podcast_id').references('podcasts.id')
        table.string('title').notNullable().defaultsTo('')
        table.text('description').notNullable().defaultsTo('')
        table.string('pub_date').notNullable().defaultsTo('')
        table.text('audio_URL').notNullable().defaultsTo('')
        table.string('duration').notNullable().defaultsTo('')
        table.timestamps(true, true)
      })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('episodes')
}
