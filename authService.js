const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userModel = require('./models/userModel')

class authService {
   
    static async login({email, password}){
        const { hashed_password } = await userModel.checkPassword(email)
        if(!hashed_password) return false
        const verification = await bcrypt.compare(password, hashed_password)
        return verification
    }
    static async signup(data){
        console.log('data with plaintext', data)
        const hashed_password = await bcrypt.hash(data.password, 11)
        console.log('hashed_password', hashed_password)
        const dataWithHashed = {...data, hashed_password}
        console.log('data with hashed', dataWithHashed)
        delete dataWithHashed.password
        return dataWithHashed
    }
}


module.exports = authService