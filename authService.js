const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userModel = require('./models/userModel')

class authService {
    static async isValidEmail(email){ 
        const verifyEmail = await userModel.verifyEmail(email)
        return verifyEmail
    }
    static async login({email, password}){
        const { hashed_password } = await userModel.checkPassword(email)
        if(!hashed_password) return false
        const verification = await bcrypt.compare(password, hashed_password)
        return verification
    }
    static async signup(data){

    }
}


module.exports = authService