const graphql = require('graphql')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLID
} = graphql

const UserType = require('./user_type')
const userModel = require('../models/userModel')
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
                // active: { type : GraphQLBoolean },
                privacy: { type : GraphQLInt}
            },
            resolve(parentValue, args, req){
                return userModel.create(args, req)
                // This returns the object, but nothing gets into graphQL
                // Should re-route use and grant jwt
            }
        },
        login: {
            type: UserType,
            args: {
                email: {type: GraphQLString},
                password: {type: GraphQLString},
                token: { type: GraphQLString},
                error: { type: GraphQLString},
                // Needs a method to resolve ids with email?
                id: { type : GraphQLID}
            },
            resolve(parentValue, {email, password}, ctx){
                // Returns a token if password is correct and user is in db
                return userModel.verify({email, password})
                    .then(verificationResult => {
                        const { error } = verificationResult
                        // Checks for error on the result and then appends either error or token to response
                        const response = verificationResult.token ? { email, token: verificationResult.token } : { email, error }
                        console.log('just before sending back',response)
                        return response
                    }).catch(err => {
                        console.log('error catch', err)
                        return {message : err}
                    })
                }
            }
        
   }
})

module.exports = mutation