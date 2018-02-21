const ReactionType = require('./reaction_type')
const PodcastType = require('./podcast_type')
const reactionModel = require('../models/reactionModel')
const podcastModel = require('../models/podcastModel')
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
        podcast_id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        pub_date: { type: GraphQLString },
        audio_URL: { type : GraphQLString},
        duration: { type : GraphQLString},
        // Page is the depth of search when browsing episodes
        // e.g. page 1 = first 4 episodes, page 2 = second 4 episodes
        page: {type: GraphQLInt},
        podcast: { type: require('./podcast_type'),
          resolve(parentValue, args){
            return podcastModel.getOne(parentValue.podcast_id)
          }
        },
        // This will fetch all reactions for an episode
        reactions: {type: new GraphQLList(ReactionType),
            resolve(parentValue, args){
               return reactionModel.getByEpisode(parentValue.id)
            }
        },
        // This will fetch reactions based on timestamp
        timeReactions: { type: new GraphQLList(ReactionType),
            resolve(parentValue, args){
                return reactionModel.getByEpisode(args.id, args.timestamp)
                            .then(reactions => {
                                episodeData.reactions = reactions
                                return episodeData
                            })
            }
        },
    })
})

module.exports = EpisodeType
