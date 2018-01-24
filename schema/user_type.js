const graphql = require('graphql')
const PodcastType = require('./podcast_type')
const podcastModel = require('../models/podcastModel')
const UserModel = require('../models/userModel')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList
} = graphql



const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: () => ({
        id: { type : GraphQLID },
        email: { type: GraphQLString },
        first_name: { type : GraphQLString },
        last_name: { type : GraphQLString },
        avatar: { type : GraphQLString },
        active: { type : GraphQLBoolean },
        privacy: { type : GraphQLInt},
        token: { type : GraphQLString },
        error: { type: GraphQLString},
        podcasts: { 
            type: new GraphQLList(PodcastType),
        resolve(parentValue, args){
            return podcastModel.getForUser(parentValue.id)
         }
        }
    })
})

module.exports = UserType
