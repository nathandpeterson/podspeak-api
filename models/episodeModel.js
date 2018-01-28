const db = require('../db/knex.js')
const feedparser = require('feedparser-promised')
const uuid = require('uuid')

const findOrCreateId = (data) => {
    return db('episodes').where({podcast_id: data.podcast_id, title: data.title })
        .then(result => {
            if(result.length) { return result[0] }
            return db('episodes').insert(data, '*')
                .then(res => {
                    return res[0]
                })
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
    return items.filter((item, i) => i < num)
}



class EpisodeModel{
    static getOne(id){
        return db('episodes').where({id}).first()
    }
    static getAll(){
        return db('episodes')
    }
    static getFeed(data){
        const { rss_feed } = data
        const podcast_id = data.id

        return feedparser.parse(rss_feed)
                    .then(items => {
                        // Pass page number into call
                        // Chunk according to desired depth
                const fiveEpisodes = chunk(items, 5)
                const data = fiveEpisodes.map(episode => prune(episode, podcast_id))
                return data
                    })
    }
    static getByPodcast(podcast_id){
        return db('podcasts').where({id}).first()
            // .then( podcast => {
            //     const { rss_feed } = podcast
            //     return feedparser.parse(rss_feed)
            //         .then(items => {
            //             // Pass page number into call
            //             // Chunk according to desired depth
            //     const fiveEpisodes = chunk(items, 4)
            //     const data = fiveEpisodes.map(episode => prune(episode))
            //     return data
                            // Prune the chunk
                        // Return pruned and chunked data
                        // console.log(prune(items[0]))
                   
                // return podcast

    }

    static create(data){
        return db('episodes').insert(data)
    }
}

module.exports = EpisodeModel