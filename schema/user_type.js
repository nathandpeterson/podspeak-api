const graphql = require('graphql')
const UserModel = require('../models/userModel')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
} = graphql


const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
        id: { type : GraphQLID },
        email: { type: GraphQLString },
        // This will query the users podcasts?
        podcasts: { type: GraphQLString }
    })
})

module.exports = UserType