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
        return db('users').insert(data)
    }
}

module.exports = UserModel