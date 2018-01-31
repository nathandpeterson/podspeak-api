
const reactionModel = require('../models/reactionModel.js')
const userModel = require('../models/userModel')
const UserType = require('./user_type')
const graphql = require('graphql')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql


const ReactionType = new GraphQLObjectType({
    name: 'ReactionType',
    fields: () => ({
        id: { type : GraphQLID },
        user_id: {type: GraphQLID },
        episode_id: {type: GraphQLID },
        episode_timestamp: {type: GraphQLString },
        content: { type: GraphQLString},
        userInfo: {type: GraphQLString} 
    })
})

module.exports = ReactionType

