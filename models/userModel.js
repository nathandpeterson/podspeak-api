
class UserModel {
    static getAll(){
        console.log('GETALL MODEL')
    }
    static getOne(id){
        console.log(`Get ${id}!!!!`)
    }
    static update(data){
        console.log(`Update user with data ${data}`)
    }
    static create(data){
        console.log(`create user with profile ${data}`)
    }
}

module.exports = UserModel