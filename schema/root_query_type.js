const graphql = require('graphql')
const { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLID, GraphQLInt, GraphQLString } = graphql
const userModel = require('../models/userModel')
const podcastModel = require('../models/podcastModel')
const episodeModel = require('../models/episodeModel')
const reactionModel = require('../models/reactionModel')
const UserType = require('./user_type')
const PodcastType = require('./podcast_type')
const EpisodeType = require('./episode_type')
const NewPodcastType = require('./new_podcast_type')
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
          async resolve(parentValue, args, ctx){
            if(ctx.headers.authorization) {
                const verification = await authService.verifyToken(ctx.headers.authorization)
                return verification.id === parseInt(args.id) ? userModel.getOne(args.id) 
                    : { error : 'You must be logged in...'}
            } else {
                return { error : 'You must be logged in...'}
            }
          }
        },
        podcasts: {
            type: new GraphQLList(PodcastType),
            async resolve(parentValue, args, ctx){    
                return podcastModel.getAll()
            }
        },
        podcast: {
            type: PodcastType,
            args: { id : { type: new GraphQLNonNull(GraphQLID)},
                    page: {type: new GraphQLNonNull(GraphQLInt) } },
            resolve(parentValue, {id, page}, ctx){
                return podcastModel.getOne(id, page)
                            .then(podcast => {
                                return {...podcast, page}
                            })
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
        },
        newPod :{
            type: NewPodcastType,
            args: { query: { type : new GraphQLNonNull(GraphQLString)}},
            resolve(parentValue, args){
                return podcastModel.discover(args.query)
            }
        }
  })
})

module.exports = RootQueryType