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

    static getByEpisode(episode_id, time){
        return db('reactions').where({episode_id})
            .then(reactions => {
                    // create an array of promises to resolve reaction ids into userInfo
                    const promises = []
                    reactions.forEach(reaction => {
                        let promise = this.getUserInfo(reaction.user_id)
                        promises.push(promise)
                    })
                    // return an array of userInfo for each promise
                    return Promise.all(promises).then(userInfo => {
                        reactions.map((reaction, i) => {
                            reaction.userInfo = userInfo[i]
                            return reaction
                        })
                        console.log(reactions)
                        return reactions
                    })

                })
                
    }

}

module.exports = ReactionModel