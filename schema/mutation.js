const graphql = require('graphql')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLID,
    GraphQLNonNull
} = graphql

const UserType = require('./user_type')
const PodcastType = require('./podcast_type')
const NewPodcastType = require('./new_podcast_type')
const userModel = require('../models/userModel')
const podcastModel = require('../models/podcastModel')
const auth = require('../authService')

const mutation = new GraphQLObjectType({
   name: 'Mutation',
   fields: {
        signup: {
            type: UserType,
            args: {
                email: {type: GraphQLString},
                password: {type: GraphQLString},
                first_name: { type : GraphQLString },
                last_name: { type : GraphQLString },
                avatar: { type : GraphQLString },
                privacy: { type : GraphQLInt}
            },
            resolve(parentValue, args, req){
                return userModel.create(args, req)
            }
        },
        login: {
            type: UserType,
            args: {
                email: {type: GraphQLString},
                password: {type: GraphQLString},
                token: { type: GraphQLString},
                error: { type: GraphQLString},
                id: { type : GraphQLID},
                first_name: { type : GraphQLString },
                last_name: { type : GraphQLString },
                avatar: { type : GraphQLString },
                active: { type : GraphQLBoolean },
                privacy: { type : GraphQLInt}
            },
            resolve(parentValue, {email, password}, ctx){
                // Returns a token if password is correct and user is in db
                return userModel.verify({email, password})
                    .then(verificationResult => {
                        const { token, error } = verificationResult
                        // Checks for error on the result and then appends either error or token to response
                        return token ? { ...verificationResult, token } : { error }
                    }).catch(err => {
                        console.log('error catch', err)
                        return {message : err}
                    })
                }
            },
        newPod :{
                type: NewPodcastType,
                args: { query: { type : new GraphQLNonNull(GraphQLString)},
                        genre: { type : new GraphQLNonNull(GraphQLString)}   
            },
                resolve(parentValue, args){
                    return podcastModel.discover(args.query, args.genre)
                }
            },
        newSubscription: {
            type: PodcastType,
            args: {
                title: { type: GraphQLString},
                description:  { type: GraphQLString},
                rss_feed:  { type: GraphQLString},
                image_URL:  { type: GraphQLString},
                user_id: { type: GraphQLID },
                genre: { type: GraphQLString}
            },
            resolve(parentValue, args){
                let podcastData = { ...args }
                delete podcastData.user_id
                return podcastModel.create(podcastData)
                    .then(newPodcast => {
                        return podcastModel.addUserPodcast(args.user_id, newPodcast.id)
                    })
            }
        }
    }
})

module.exports = mutation
