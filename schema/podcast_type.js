const graphql = require('graphql')
const podcastModel = require('../models/podcastModel')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
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
        website: { type : GraphQLString }
    })
})

module.exports = PodcastType
