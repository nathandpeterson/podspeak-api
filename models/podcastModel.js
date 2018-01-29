const db = require('../db/knex.js')
const axios = require('axios')
const unirest = require('unirest')


class PodcastModel {
    static async getOne(id, page){
        return db('podcasts').where({id}).first()
    }
    static getAll(){
        return db('podcasts')
    }
    static create(data){
        return db('podcasts').insert(data, '*')
            .then(res => res[0])
    }
    static update(data){
        return db('users').where({id}).update(data)
    }
    static async getForUser(user_id){
        return db('podcasts')
                .join('user_podcast', 'podcasts.id', 'user_podcast.podcast_id')
                .where({user_id})  
    }
    static addUserPodcast(user_id, podcast_id){
        return db('user_podcast').where({user_id , podcast_id})
            .then(check => {
                return check.length ? {message: 'User is already subscribed'} : 
                    db('user_podcast').insert({user_id , podcast_id}, '*')
                        .then(res => res[0])
            })
    }

    static prune(data){
        const format =  {rss_feed: data.rss,
            image_URL: data.image,
            title: data.title_highlighted,
            description: data.description_original,
            latest_pub_date: data.lastest_pub_date_ms}
        return format  
    }

    static async discover(query){
        // You are going to have to let the user choose a genre
        let base = `https://listennotes.p.mashape.com/api/v1/search?&genre_ids=128offset=10&q=${query}&sort_by_date=1&type=podcast`
        return axios.get(`https://listennotes.p.mashape.com/api/v1/search?&genre_ids=128&offset=10&q=${query}&sort_by_date=1&type=podcast`,
            {headers: {"X-Mashape-Key": "TnMVWQLr0RmshISqPFpAfNyrznpVp1LQdUSjsnd7c17TB2CMmH",
                        "Accept": "application/json"}})
            .then(result => {
                const { results } = result.data
                const format = results.map(result => this.prune(result))
                return format
            })
            
          
    }
}

module.exports = PodcastModel