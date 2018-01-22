const db = require('../db/knex.js')

class UserModel {
    static getAll(){
        return db('users')
    }
    static getOne(id){
       return db('users').where({id}).first()
    }
    static update(id, data){
        return db('users').where({id}).update(data)
    }
    static create(data){
        console.log(data)
        // return db('users').insert(data)
    }
    static userExists(data) {
        // Check and see if a user exists
        const { email } = data
        return db('users').where({email})
        // If no user, send them to a signup form
    }
}

module.exports = UserModel