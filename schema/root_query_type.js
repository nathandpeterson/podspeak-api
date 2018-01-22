const graphql = require('graphql')
const { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLID } = graphql
const userModel = require('../models/userModel')
const podcastModel = require('../models/podcastModel')
const UserType = require('./user_type')
const PodcastType = require('./podcast_type')
const authService = require('../authService')

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
      users: {
          type: new GraphQLList(UserType),
          resolve(parentValue, args, context){
              return userModel.getAll()
          }
      },
      user: {
          type: UserType,
          args: { id : { type: new GraphQLNonNull(GraphQLID)} },
          resolve(parentValue, args){
            return userModel.getOne(parentValue.id)
          }
        },
        podcasts: {
            type: new GraphQLList(PodcastType),
            resolve(parentValue, args, ctx){
                return podcastModel.getAll()
            }
        },
        podcast: {
            type: PodcastType,
            args: { id : { type: new GraphQLNonNull(GraphQLID)} },
            resolve(parentValue, args, ctx){
                
                return podcastModel.getOne(parentValue.id)
            }
        }
  })
})

module.exports = RootQueryType