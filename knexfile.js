const path = require('path')

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/pod_dev',
    migrations: {
      directory: path.join(__dirname, 'db', 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'db', 'seeds')
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://tjzcwcamneytyh:f7e21cb925d80ceb31c4ac11c34591b5fa5b80b717c5f4d16a7e0d11408882ca@ec2-54-163-237-249.compute-1.amazonaws.com:5432/dub46vla5unlq',
  },
  migrations: {
    directory: path.join(__dirname, 'db', 'migrations')
  },
  seeds: {
    directory: path.join(__dirname, 'db', 'seeds')
  }
}
