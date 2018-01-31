const db = require('../db/knex.js')
const userModel = require('./userModel')

class ReactionModel{
    static getAll(){
        return db('reactions')
    }
    static getOne(id){
        return db('reactions').where({id}, '*').first()
            .then(reaction => {
                return userModel.getOne(reaction.user_id)
                    .then(userInfo => {
                        let data = `${userInfo.avatar},${userInfo.first_name},${userInfo.last_name}`
                        reaction.userInfo = data
                        return reaction
                    })
            })
    }
    static create(data){
        console.log('in the model',data)
        return db('reactions').insert(data, "*").first()
    
    }
    static getByEpisode(episode_id){
        return db('reactions').where({episode_id})
    }

}

module.exports = ReactionModel