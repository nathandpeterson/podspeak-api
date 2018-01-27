const gql = require('graphql-tag')
const { request } = require('graphql-request')

// an experiment in pulling rss feeds through graphql

const query = `{
    Movie(title: "Inception") {
      releaseDate
      actors {
        name
      }
    }
  }`


request('https://api.graph.cool/simple/v1/movies', query)
    .then(data => console.log(data))
    .catch(err => console.log(err))