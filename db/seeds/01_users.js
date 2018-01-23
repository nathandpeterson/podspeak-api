
exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
         {id: 1, 
          email: 'nathan@gmail.com',
          hashed_password: '$2a$10$7a6XUbAtrlqlRNEK9eXBVuYWEhgdb1VMQZ7DB7JvefV9Skvi74BWO',
          first_name: 'Nathan',
          last_name: 'Peterson',
          avatar: '🦁',
          active: false,
          privacy: 0},
          {id: 2, 
          email: 'galen@example.com',
          hashed_password: '$2a$10$7a6XUbAtrlqlRNEK9eXBVuYWEhgdb1VMQZ7DB7JvefV9Skvi74BWO',
          first_name: 'Galen',
          last_name: 'Longstreth',
          avatar: '🦄',
          active: false,
          privacy: 2},
          {id: 3, 
          email: 'ivan@example.com',
          hashed_password: '$2a$10$7a6XUbAtrlqlRNEK9eXBVuYWEhgdb1VMQZ7DB7JvefV9Skvi74BWO',
          first_name: 'Ivan',
          last_name: 'Johnson',
          avatar: '🧟‍',
          active: true,
          privacy: 1},
      ])
    }).then(() => {
      return knex.raw(
        `SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));`
      )
    })
}
