
exports.up = function(knex, Promise) {
    return knex.schema.createTable('podcasts', table => {
        table.increments()
        table.string('title').notNullable().defaultsTo('')
        table.text('image_URL').notNullable().defaultsTo('')
        table.text('description').notNullable().defaultsTo('')
        table.string('rss_feed').notNullable().defaultsTo('')
        table.string('latest_pub_date').defaultsTo('')
        table.string('website').defaultsTo('')
        table.timestamps(true, true)
      })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('podcasts')
}
