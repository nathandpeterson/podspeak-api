const graphql = require('graphql')
const UserModel = require('../models/userModel')
const {
    GraphQLObjectType,
    GraphQLString
} = graphql


const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: {
        email: { type: GraphQLString },
        // This will query the users podcasts?
        podcasts: { type: GraphQLString }
    }
})

module.exports = UserType