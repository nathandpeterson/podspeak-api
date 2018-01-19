
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {podcast_id: 1, user_id: 1},
        {podcast_id: 1, user_id: 2},
        {podcast_id: 1, user_id: 3},
        {podcast_id: 1, user_id: 4},
        {podcast_id: 4, user_id: 2},
        {podcast_id: 1, user_id: 2},
        {podcast_id: 2, user_id: 3},
        {podcast_id: 3, user_id: 3}
      ])
    })
}
