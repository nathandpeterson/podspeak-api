
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('reactions').del()
    .then(function () {
      // Inserts seed entries
      return knex('reactions').insert([
          {id: 1, 
          user_id: 1,
          reaction_id: 0,
          episode_id: 1,
          episode_timestamp: '00:00:05',
          category: 1,
          content: 'This sounds interesting'},
          {id: 2, 
          user_id: 2,
          reaction_id: 1,
          episode_id: 1,
          episode_timestamp: '00:00:05',
          category: 1,
          content: 'Better than last episode'},
          {id: 3, 
          user_id: 1,
          reaction_id: 0,
          episode_id: 1,
          episode_timestamp: '00:01:27',
          category: 2,
          content: '😀'},
          {id: 4, 
          user_id: 3,
          reaction_id: 0,
          episode_id: 1,
          episode_timestamp: '00:07:15',
          category: 3,
          content: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?dpr=1&auto=format&fit=crop&w=376&h=376&q=60&cs=tinysrgb'},
          {id: 5, 
          user_id: 1,
          reaction_id: 4,
          episode_id: 1,
          episode_timestamp: '00:07:15',
          category: 2,
          content: '🌟'},
          {id: 6, 
          user_id: 2,
          reaction_id: 0,
          episode_id: 1,
          episode_timestamp: '00:12:13',
          category: 1,
          content: 'What does he mean by that?'},
          {id: 7, 
          user_id: 3,
          reaction_id: 1,
          episode_id: 1,
          episode_timestamp: '00:12:17',
          category: 1,
          content: 'I think he\s talking about redux'},
          {id: 8, 
          user_id: 2,
          reaction_id: 7,
          episode_id: 1,
          episode_timestamp: '00:12:25',
          category: 1,
          content: 'No, he means that you can use graphQL'},
      ])
    }).then(() => {
      return knex.raw(
        `SELECT setval('reactions_id_seq', (SELECT MAX(id) FROM reactions));`
      )
    })
}