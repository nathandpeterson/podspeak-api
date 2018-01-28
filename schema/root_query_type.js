const graphql = require('graphql')
const { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLID } = graphql
const userModel = require('../models/userModel')
const podcastModel = require('../models/podcastModel')
const episodeModel = require('../models/episodeModel')
const reactionModel = require('../models/reactionModel')
const UserType = require('./user_type')
const PodcastType = require('./podcast_type')
const EpisodeType = require('./episode_type')
const ReactionType = require('./reaction_type')
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
            return userModel.getOne(args.id)
          }
        },
        podcasts: {
            type: new GraphQLList(PodcastType),
            async resolve(parentValue, args, ctx){
                if(ctx.headers.authorization) {
                    const res = await authService.verifyToken(ctx.headers.authorization)
                }
                console.log(ctx.headers.authorization)
                return podcastModel.getAll()
            }
        },
        podcast: {
            type: PodcastType,
            args: { id : { type: new GraphQLNonNull(GraphQLID)} },
            resolve(parentValue, args, ctx){
                return podcastModel.getOne(args.id)
            }
        },
        episodes: {
            type: new GraphQLList(EpisodeType),
            resolve(parentValue, args, ctx){
                return episodeModel.getAll()
            }
        },
        episode: {
            type: EpisodeType,
            args: { id : { type: new GraphQLNonNull(GraphQLID)} },
            resolve(parentValue, args, ctx){
                return episodeModel.getOne(args.id)
                    .then(res => {
                        console.log('endpoint', res)
                        return res
                    })
            }
        },
        reactions: {
            type: new GraphQLList(ReactionType),
            resolve(parentValue, args, ctx){
                return reactionModel.getAll()
            }
        },
        reaction: {
            type: ReactionType,
            args: { id : { type: new GraphQLNonNull(GraphQLID)}},
            resolve(parentValue, args, ctx){
                return reactionModel.getOne(args.id)
            }
        }
  })
})

module.exports = RootQueryType