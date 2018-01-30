const db = require('../db/knex.js')

class ReactionModel{
    static getAll(){
        return db('reactions')
    }
    static getOne(id){
        return db('reactions').where({id})
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