const graphql = require('graphql')
const {
    GraphQLObjectType,
    GraphQLString
} = graphql

const UserType = require('./user_type')

const mutation = new GraphQLObjectType({
   name: 'Mutation',
   fields: {
        signup: {
            type: UserType,
            args: {
                email: {type: GraphQLString},
                password: {type: GraphQLString}
            },
            resolve(parentValue, {email, password}, req){
                // 
            }
        }
   }
})

module.exports = mutation