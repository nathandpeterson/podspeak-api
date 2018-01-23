const db = require('../db/knex.js')

class UserModel {
    static getAll(){
        return db('users')
    }
    static getOne(id){
        return db('users').where({id}).first()    
    }
    static checkPassword(email){
        return db('users').where({email}).first()
            .then(res => !res ? 'nope' : res)
    }
    static update(id, data){
        return db('users').where({id}).update(data)
    }
    static create(data){
        console.log(data)
        return db('users').insert({data})
        // verify that the data is complete and return
        // return db('users').insert(data)
    }
    static verifyEmail(email) {
        // Check and see if a user exists
        return db('users').where({email}).first()
            .then(({email}) => email)
        // If no user, send them to a signup form
    }
}

module.exports = UserModel