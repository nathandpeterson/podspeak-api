const db = require('../db/knex.js')

class PodcastModel {
    static getOne(id){
        return db('podcasts').where({id})
    }
    static getAll(){
        return db('podcasts')
    }
    static create(data){
        return db('podcasts').insert(data)
    }
    static update(data){
        return db('users').where({id}).update(data)
    }

}

module.exports = PodcastModel