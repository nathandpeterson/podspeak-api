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
        podcast_id: {type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        pub_date: { type: GraphQLString },
        audio_URL: { type : GraphQLString},
        duration: { type : GraphQLString},
        page: {type: GraphQLInt},
        // This will fetch reactions for an episode
        reactions: {type: new GraphQLList(ReactionType),
            resolve(parentValue, args){
               return reactionModel.getByEpisode(parentValue.id)
            }
        },
        timeReactions: { type: new GraphQLList(ReactionType),
            resolve(parentValue, args){
                return reactionModel.getByEpisode(args.id, args.timestamp)
                            .then(reactions => {
                                episodeData.reactions = reactions
                                return episodeData
                            })
            }
        },
        podcast_name : { type: GraphQLString,
        resolve(parentValue, args){
            return podcastModel.getOne(parentValue.podcast_id)
                .then(end => end.title)
            }
        }
    })
})

module.exports = EpisodeType
