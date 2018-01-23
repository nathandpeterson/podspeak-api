const graphql = require('graphql')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt
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
                    .then(result => result)
            }
        },
        login: {
            type: UserType,
            args: {
                email: {type: GraphQLString},
                password: {type: GraphQLString}
            },
            resolve(parentValue, {email, password}, req){
                // This call just returns true if the email exists in db
                // I can't figure out why it won't return the email to frontend
                return userModel.verifyEmail(email)
                // This call checks the password... Won't work because its below return...
                auth.login({email, password})
                    .then( result => console.log('parentValue...',parentValue) )
                }
            }
        
   }
})

module.exports = mutation