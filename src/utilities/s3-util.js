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
    return axios(requestOptions)
    .then(res => {
        const params = {Bucket: process.env.AWS_BUCKET, Key: key, Body: res.data}
        return s3.upload(params).promise()
    })
}

module.exports = { uploadUrlToS3, uploadImgToS3 }