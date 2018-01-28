const db = require('../db/knex.js')
const feedparser = require('feedparser-promised')
const uuid = require('uuid')

const findOrCreateId = (data) => {
    return db('episodes').where({podcast_id: data.podcast_id, title: data.title })
        .then(result => {
            if(result.length) {
                return result[0]
            } else {
                return db('episodes').insert(data, '*')
                    .then(res => {
                        return res[0]
                    })
            }  
        })
}

const prune = (episode, podcast_id) => {
    let data = {title: episode.title,
                podcast_id,
                description: episode.description,
                pub_date: episode.pubDate,
                audio_URL: episode.enclosures[0].url,
                duration: episode['itunes:duration']['#']}
           return findOrCreateId(data)
    }
const chunk = (items, num) => {
    // Num is page number. I want five results per page.
    // I use (5 * num) as max depth and (5 * num) -5 as min depth
    let min = num * 5 - 5
    return items.filter((item, i) => i < num * 5 && i >= min )
}



class EpisodeModel{
    static getOne(id){
        return db('episodes').where({id}).first()
    }
    static getAll(){
        return db('episodes')
    }
    static getFeed(data){
        const { rss_feed, page } = data
        const podcast_id = data.id
        return feedparser.parse(rss_feed)
                    .then( items => {
                        // chunk will filter for desired depth by taking a page number pulling five from there
                const fiveEpisodes = chunk(items, page)
                const data = fiveEpisodes.map(episode => prune(episode, podcast_id))
                        return data
                    })
    }
    static getByPodcast(podcast_id){
        return db('podcasts').where({id}).first()
    }

    static create(data){
        return db('episodes').insert(data)
    }
}

module.exports = EpisodeModel