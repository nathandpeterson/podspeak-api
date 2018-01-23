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
                password: {type: GraphQLString}
                // Leaving this stuff out for testing
                // first_name: { type : GraphQLString },
                // last_name: { type : GraphQLString },
                // avatar: { type : GraphQLString },
                // active: { type : GraphQLBoolean },
                // privacy: { type : GraphQLInt},
            },
            resolve(parentValue, {email, password}, req){
                console.log(parentValue)
                return userModel.create({email, password})
                    .then(res => console.log('end',res))
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