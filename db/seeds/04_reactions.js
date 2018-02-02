
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
          content: 'lol 🤪'},
          {id: 3, 
          user_id: 1,
          episode_id: 1,
          episode_timestamp: '00:01:27',
          content: 'Good point'},
          {id: 4, 
          user_id: 3,
          episode_id: 1,
          episode_timestamp: '00:01:31',
          content: 'Hm. I\m not sure that I agree...'},
          {id: 5, 
          user_id: 1,
          episode_id: 1,
          episode_timestamp: '00:01:40',
          content: 'I guess it depends on how you look at it...'},
          {id: 6, 
          user_id: 2,
          episode_id: 1,
          episode_timestamp: '00:02:01',
          content: 'better than last episode'},
          {id: 7, 
          user_id: 3,
          episode_id: 1,
          episode_timestamp: '00:03:17',
          content: 'not again'},
          {id: 8, 
          user_id: 2,
          episode_id: 1,
          episode_timestamp: '00:04:25',
          content: 'i\'ve never actually listened this long before'},
      ])
    }).then(() => {
      return knex.raw(
        `SELECT setval('reactions_id_seq', (SELECT MAX(id) FROM reactions));`
      )
    })
}