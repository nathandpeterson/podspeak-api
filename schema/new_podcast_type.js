
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
        results : {type : new GraphQLList(NewPodcastType),
        resolve(parentValue, args){
            // console.log('in the newPODCAST resolver',parentValue)
            return parentValue
        }
     }
        // This will fetch reactions for an episode
    })
})

module.exports = NewPodcastType
