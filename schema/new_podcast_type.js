
const graphql = require('graphql')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLInt,
} = graphql


const NewPodcastType = new GraphQLObjectType({
    name: 'NewPodcastType',
    fields: () => ({
        id: { type: GraphQLID},
        rss_feed: { type: GraphQLString},
        description: { type: GraphQLString},
        image_URL: { type: GraphQLString},
        query : { type : GraphQLString},
        title: { type: GraphQLString },
        genre: { type: GraphQLString},
        results : {type : new GraphQLList(NewPodcastType),
        resolve(parentValue, args){
            return parentValue
            }
        }
    })
})

module.exports = NewPodcastType
