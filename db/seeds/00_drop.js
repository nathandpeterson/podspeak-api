
exports.seed = function(knex, Promise) {
  return knex('user_podcast').del()
    .then(() => knex('users').del())
    .then(() => knex('podcasts').del())
    .then(() => knex('episodes').del())
    .then(() => knex('reactions').del())
}
