const db = require('../db/knex.js')
const feedparser = require('feedparser-promised')

const prune = (episode) => {
    let data = {title: episode.title,
                description: episode.description,
                pubDate: episode.pubDate,
                audio_URL: episode.enclosures[0].url,
                duration: episode['itunes:duration']['#']}
        return data
    }
const chunk = (items, num) => {
    return items.filter((item, i) => i < num)
}


class PodcastModel {
    static async getOne(id){
        return db('podcasts').where({id}).first()
            .then( podcast => {
                const feed = podcast.rss_feed
                feedparser.parse(feed)
                    .then((items) => {
                        // Pass page number into call
                        // Chunk according to desired depth
                        // Prune the chunk
                        // Return pruned and chunked data
                        console.log(prune(items[0]))
                    })
                return podcast
            })
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