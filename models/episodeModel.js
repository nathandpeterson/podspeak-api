const db = require('../db/knex.js')

class EpisodeModel{
    static getOne(id){
        return db('episodes').where({id}).first()
    }
    static getAll(){
        return db('episodes')
    }
    static getByPodcast(podcast_id){
        return db('episodes').where({podcast_id})
    }
    static create(data){
        return db('episodes').insert(data)
    }
}

module.exports = EpisodeModel