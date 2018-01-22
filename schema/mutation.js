const graphql = require('graphql')
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt
} = graphql

const UserType = require('./user_type')
const userModel = require('../models/userModel')

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
                userModel.create({email, password})
                return parentValue.email
            }
        }
   }
})

module.exports = mutation