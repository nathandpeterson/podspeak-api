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
          resolve(parentValue, args, ctx){
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
            async resolve(parentValue, args, ctx){
                if(ctx.headers.authorization) {
                    const res = await authService.verifyToken(ctx.headers.authorization)
                    console.log('after the call to authservices', res)
                }
                console.log(ctx.headers.authorization)
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