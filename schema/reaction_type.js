
const reactionModel = require('../models/reactionModel.js')
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
        reaction_id: {type: GraphQLID },
        episode_id: {type: GraphQLID },
        episode_timestamp: {type: GraphQLString },
        category: { type: GraphQLInt },
        content: { type: GraphQLString}
        // This will fetch reactions for an episode
        
    })
})

module.exports = ReactionType

