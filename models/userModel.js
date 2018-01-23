const db = require('../db/knex.js')
const auth = require('../authService')

class UserModel {
    static getAll(){
        return db('users')
    }
    static getOne(id){
        return db('users').where({id}).first()    
    }
    static checkEmail(email){
        return db('users').where({email}).first()
            .then(res => {
                return res ? true : false
            })
    }
    static update(id, data){
        // Placeholder; data should be verified 
        return db('users').where({id}).update(data)
    }
    static async create(data, req){
        //Checks if email is taken. True means email is taken, false it is not.
        const emailTaken = await this.checkEmail(data.email)
        if (emailTaken) return {message: 'That email is taken'}
        // Sends to authService to hash password and delete plaintext password
        let hashedData = await auth.signup(data)
        // Adds active propery to data
        hashedData.active = true
        return db('users').insert(hashedData).returning('*')
    }
    static verifyEmail(email) {
        // Check and see if a user exists
        return db('users').where({email}).first()
            .then(({email}) => email)
        // If no user, send them to a signup form
    }
}

module.exports = UserModel