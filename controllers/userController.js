const userModel = require('../models/userModel')

class UserController {
    static async getAll(req, res, next){
        const response = await userModel.getAll()
        return res.status(200).json(response)
    }

    static async getOne(req, res, next){
        const response = await userModel.getOne(req.params.id)
        return res.status(200).json({response})
    }

    static async create(req, res, next){
        const response = await userModel.create(req.body)
        return res.status(201).json(response)
    }

    static async update(req, res, next){
        const response = await userModel.update(req.params.id, req.body)
        return res.status(201).json({response})
    }
}

module.exports = UserController