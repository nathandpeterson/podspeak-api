const db = require('../db/knex.js')
const feedparser = require('feedparser-promised')

class EpisodeModel{
    static getOne(id){
        return db('episodes').where({id}).first()
    }
    static getAll(){
        return db('episodes')
    }
    static chunk(items, num){
        // Num is page number. I want five results per page.
        // I use (5 * num) as max depth and (5 * num) -5 as min depth
        let min = num * 4 - 4
        return items.filter((item, i) => i < num * 4 && i >= min )
    }
    static prune (episode, podcast_id){
        let data = {title: episode.title,
            podcast_id,
            description: episode.description,
            pub_date: episode.pubDate,
            audio_URL: episode.enclosures[0].url,
            duration: episode['itunes:duration']['#']}
       return this.findOrCreateId(data)
    }
    static findOrCreateId(data) {
        return db('episodes').where({podcast_id: data.podcast_id, title: data.title })
            .then(result => {
                if(result.length) {
                    return result[0]
                } else {
                return db('episodes').insert(data, '*')
                    .then(newEpisode => newEpisode[0])
                }
            })
    }
    static getFeed(data){
        const { rss_feed, page } = data
        const podcast_id = data.id
        return feedparser.parse(rss_feed)
                    .then( items => {
                        // chunk will filter for desired depth by taking a page number pulling five from there
                const fourEpisodes = this.chunk(items, page)
                const data = fourEpisodes.map(episode => this.prune(episode, podcast_id))
                        return data
                    })
    }
    static getByPodcast(podcast_id){
        return db('podcasts').where({podcast_id}).first()
    }

    static create(data){
        return db('episodes').insert(data)
    }
}

module.exports = EpisodeModel
