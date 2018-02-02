const graphql = require('graphql')
const podcastModel = require('../models/podcastModel')
const EpisodeType = require('./episode_type')
const episodeModel = require('../models/episodeModel')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLInt
} = graphql


const PodcastType = new GraphQLObjectType({
    name: 'PodcastType',
    fields: () => ({
        id: { type : GraphQLID },
        title: { type: GraphQLString },
        description: {type: GraphQLString},
        rss_feed: { type : GraphQLString },
        image_URL: { type: GraphQLString },
        latest_pub_date: { type : GraphQLString },
        website: { type : GraphQLString },
        page: { type: GraphQLInt},
        genre: { type: GraphQLString},
        episodes: {type: new GraphQLList(EpisodeType),
        resolve(parentValue, args){
            return episodeModel.getFeed(parentValue)
            }
        }
    })
})

module.exports = PodcastType
