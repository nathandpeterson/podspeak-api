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
            }
        },
        login: {
            type: UserType,
            args: {
                email: {type: GraphQLString},
                password: {type: GraphQLString}
            },
            async resolve(parentValue, {email, password}, req){
                // Returns a token if password is correct and user is in db
                const token = await userModel.verify({email, password})
                return token
                // attach token to headers
                }
            }
        
   }
})

module.exports = mutation