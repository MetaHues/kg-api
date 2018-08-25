const urljoin = require('url-join')
const AWS = require('aws-sdk')
const axios = require('axios')
AWS.config.update({region: 'us-east-2'})

const s3 = new AWS.S3()

const uploadImgToS3 = (userId, img) => {
    // file type?? prolly in file name??
    // const key = urljoin('post', `${userId}.jp`)
}

const uploadUrlToS3 = (userId, url) => {
    const key = urljoin('profile', `${userId}.jpg`)
    let requestOptions = {
        url: url,
        responseType:'stream'
    }
    axios(requestOptions)
    .then(res => {
        const params = {Bucket: process.env.AWS_BUCKET, Key: key, Body: res.data}
        s3.upload(params, (err, data) => {
            if(err) console.log(err)
            else console.log('data', data)
        })
    })
}

module.exports = { uploadUrlToS3, uploadImgToS3 }