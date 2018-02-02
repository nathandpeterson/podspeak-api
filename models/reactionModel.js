const db = require('../db/knex.js')
const userModel = require('./userModel')

class ReactionModel{
    static getAll(){
        return db('reactions')
    }
    static getOne(id){
        return db('reactions').where({id}, '*').first()
            .then(reaction => {
                return this.getUserInfo(reaction.user_id)
                    .then(userInfo => {
                        reaction.userInfo = userInfo
                        return reaction
                    })
            })
    }
    static create(data){
        return db('reactions').insert(data).returning('*')
            .then(res => {
                return res[0]
            })
    
    }
    static getUserInfo (user_id) {
        return userModel.getOne(user_id)
            .then(userInfo => {
                let data = `${userInfo.id},${userInfo.avatar},${userInfo.first_name},${userInfo.last_name}`
                return data
            })
    }

    static filterByTimestamp(arr, timestamp) {
        return arr.filter(item => {
            let reactionTime = item.episode_timestamp.split(':')
            return parseInt(timestamp) === parseInt(reactionTime[1]) ? item : null
        })
    }

    static getByEpisode(episode_id, timestamp){
        return db('reactions').where({episode_id})
            .then(allReactions => {
                return timestamp ? this.filterByTimestamp(allReactions, timestamp) : allReactions
            })    
            .then(reactions => {
                    const promises = []
                     // create an array of userInfo for each promise
                    reactions.forEach(reactionPromise => {
                        let promise = this.getUserInfo(reactionPromise.user_id)
                        promises.push(promise)
                    })
                //    return userInfo for each promise and map it onto the reaction
                    return Promise.all(promises).then(userInfo => {
                        reactions.map((reaction, i) => {
                            reaction.userInfo = userInfo[i]
                            return reaction
                        })
                    // returning with userInfo attached here
                        return reactions
                    })

                })
            
    }

}

module.exports = ReactionModel