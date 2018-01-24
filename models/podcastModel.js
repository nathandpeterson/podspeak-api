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
    static async getForUser(user_id){
        return db('podcasts')
                .join('user_podcast', 'podcasts.id', 'user_podcast.podcast_id')
                .where({user_id})
                
    }

}

module.exports = PodcastModel