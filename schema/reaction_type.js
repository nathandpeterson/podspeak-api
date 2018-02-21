
const reactionModel = require('../models/reactionModel.js')
const userModel = require('../models/userModel')
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
        user: { type: require('./user_type'),
          resolve(parentValue, args){
              return userModel.getOne(parentValue.user_id)
          }
        }
    })
})

module.exports = ReactionType
