
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('reactions').del()
    .then(function () {
      // Inserts seed entries
      return knex('reactions').insert([
          {id: 1, 
          user_id: 1,
          episode_id: 1,
          episode_timestamp: '00:00:05',
          content: 'This sounds interesting'},
          {id: 2, 
          user_id: 2,
          episode_id: 1,
          episode_timestamp: '00:00:05',
          content: 'Better than last episode'},
          {id: 3, 
          user_id: 1,
          episode_id: 1,
          episode_timestamp: '00:01:27',
          content: 'Portland irony cray asymmetrical sustainable ethical trust fund cloud bread you probably haven\'t heard of them shabby chic 8-bit shaman cronut. '},
          {id: 4, 
          user_id: 3,
          episode_id: 1,
          episode_timestamp: '00:07:15',
          content: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?dpr=1&auto=format&fit=crop&w=376&h=376&q=60&cs=tinysrgb'},
          {id: 5, 
          user_id: 1,
          episode_id: 1,
          episode_timestamp: '00:07:15',
          content: 'Distillery next level yuccie iceland. PBR&B banh mi fashion axe, williamsburg kitsch skateboard ramps whatever truffaut.'},
          {id: 6, 
          user_id: 2,
          episode_id: 1,
          episode_timestamp: '00:12:13',
          content: ' Banh mi freegan tote bag plaid man bun. PBR&B pork belly bushwick wayfarers seitan ethical cronut. Poutine bushwick fixie next level, venmo VHS ennui plaid twee kogi tofu stumptown hell of dreamcatcher.'},
          {id: 7, 
          user_id: 3,
          episode_id: 1,
          episode_timestamp: '00:12:17',
          content: 'Tumeric austin lo-fi, heirloom cronut narwhal jianbing. Shaman cred occupy, vice keytar knausgaard man braid. Sustainable offal austin, twee lomo neutra glossier fixie pug taxidermy hell of prism tousled hot chicken.'},
          {id: 8, 
          user_id: 2,
          episode_id: 1,
          episode_timestamp: '00:12:25',
          content: 'Williamsburg +1 succulents, live-edge ugh humblebrag flannel lo-fi iceland twee tote bag bespoke raclette. '},
      ])
    }).then(() => {
      return knex.raw(
        `SELECT setval('reactions_id_seq', (SELECT MAX(id) FROM reactions));`
      )
    })
}