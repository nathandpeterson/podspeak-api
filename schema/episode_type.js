const ReactionType = require('./reaction_type')
const reactionModel = require('../models/reactionModel')
const graphql = require('graphql')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLInt,
} = graphql


const EpisodeType = new GraphQLObjectType({
    name: 'EpisodeType',
    fields: () => ({
        id: { type : GraphQLID },
        podcast_id: {type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        pub_date: { type: GraphQLString },
        audio_URL: { type : GraphQLString},
        duration: { type : GraphQLString},
        page: {type: GraphQLInt},
        // This will fetch reactions for an episode
        reactions: {type: new GraphQLList(ReactionType),
            resolve(parentValue){
                console.log(parentValue)
                return reactionModel.getByEpisode(parentValue.id)
            }
        }
    })
})

module.exports = EpisodeType
