const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const secret = process.env.TOKEN_SECRET || '$2a$11$Z4o/N3IeRF6kfNKKaM5j4esHDq55Q4Eoc7.ruY2WH5wM1kZVdqaxe'


class authService {
   
    static async login({email, password}){
        const { hashed_password } = await userModel.checkPassword(email)
        if(!hashed_password) return false
        const verification = await bcrypt.compare(password, hashed_password)
        return verification
    }
    static async signup(data){
        const hashed_password = await bcrypt.hash(data.password, 11)
        const dataWithHashed = {...data, hashed_password}
        delete dataWithHashed.password
        return dataWithHashed
    }
    static async verifyPassword(plain_password, hashed_password){
        let verification = await bcrypt.compare(plain_password, hashed_password)
        return verification
    }
    static async newToken(data){
        const frontendData = {id: data.id, first_name: data.first_name, email: data.email}
        let tokenHash = jwt.sign( frontendData, secret, {expiresIn: '1000h'})
        const token = `Bearer: ${tokenHash}`
        return token
    }
    static async verifyToken(token){
        const justToken = token.slice(8)
        const result = await jwt.verify(justToken, secret)
        return result        
    }
}


module.exports = authService