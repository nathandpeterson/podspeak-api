const graphql = require('graphql')
const { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLID } = graphql
const userModel = require('../models/userModel')
const UserType = require('./user_type')

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
      users: {
          type: new GraphQLList(UserType),
          resolve(parentValue, args){
              return userModel.getAll()
          }
      },
      user: {
          type: UserType,
          args: { id : { type: new GraphQLNonNull(GraphQLID)} },
          resolve(parentValue, args){
            return userModel.getOne(parentValue.id)
          }
        }
  })
})

module.exports = RootQueryType