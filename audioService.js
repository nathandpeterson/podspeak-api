const fs = require('fs')
var AWS = require('aws-sdk')

class Audio {
    static findOrCreate(data){
        console.log('findOrCreate',data)
        let s3 = new AWS.S3()
        var bucketName = 'sean-songs'
        var keyName = 'test-songs/Hands.mp3';
        var params = { Bucket: 'sean-songs', Key: keyName }
        s3.getObject(params, function(err, data) {
            if (err)
              console.log(err)
            else
                console.log('worjked?....')
                fs.writeFile('temp.mp3',data, err => {
                    if(err) throw err 
                    console.log('the file has been saved...')
                })
          })
    }
}

module.exports = Audio