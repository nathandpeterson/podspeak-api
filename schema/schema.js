const { GraphQLSchema } = require('graphql')
const RootQueryType = require('./root_query_type')
const mutation = require('./mutation')

module.exports = new GraphQLSchema({
    query: RootQueryType,
    mutation
})