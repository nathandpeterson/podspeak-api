const userModel = require('../models/userModel')

class UserController {
    static getAll(req, res, next){
        console.log('GETALLUSERS')
        return res.status(200).json({msg: 'get all users'})
    }

    static getOne(req, res, next){
        console.log('GETONEUSER', req.params)
        return res.status(200).json({msg: 'get one users'})
    }
    static create(req, res, next){
        console.log('CREATE USER')
        return res.status(201).json({msg: `you created a user`})
    }
    static update(req, res, next){
        console.log('UPDATE USER')
        return res.status(201).json({msg: `you updated a user`})
    }
}

module.exports = UserController