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
                // Needs a method to resolve ids with email?
                id: { type : GraphQLID}
            },
            resolve(parentValue, {email, password}, ctx){
                console.log(ctx.headers)
                // Returns a token if password is correct and user is in db
                return userModel.verify({email, password})
                    .then(token => {
                        console.log('token?', token)
                        // Bad error handling
                        if(token.message) return
                        const response = { email, token }
                        console.log('response', response)
                        return response
                    })
                }
            }
        
   }
})

module.exports = mutation