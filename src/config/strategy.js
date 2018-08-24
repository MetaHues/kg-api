const FacebookStrategy = require('passport-facebook').Strategy;
const auth = require('./auth')
const User = require('../models/User')
const axios = require('axios')
const AWS = require('aws-sdk')
const urljoin = require('url-join')
require('dotenv').config()

AWS.config.update({region: 'us-east-2'})
const s3 = new AWS.S3({})



const uploadToS3 = (userId, profileImgUrl) => {
    const key = urljoin('profile', `${userId}.jpg`)
    let requestOptions = {
        url: profileImgUrl,
        responseType:'stream'
    }
    return axios(requestOptions)
    .then(res => {
        const params = {Bucket: process.env.AWS_BUCKET, Key: key, Body: res.data}
        return s3.upload(params).promise()
    })
}


module.exports = {
    facebookStrategy: (new FacebookStrategy({
        clientID: auth.facebookAuth.id,
        clientSecret: auth.facebookAuth.secret,
        callbackURL: auth.facebookAuth.callbackUrl,
        profileFields: ['id', 'displayName', 'email', 'picture.type(large)']
    },
    function(accessToken, refreshToken, profile, done) {
        let user = {}
        User.findOne({'facebook.id': profile.id})
        .then(existingUser => {
            if(existingUser) {
                done(null, existingUser)
                throw new Error('user already exists')
            }
            // create new user
            return new User({
                facebook: {
                    id: profile.id,
                },
                name: profile.displayName,
                email: profile.emails[0].value,
            }).save()                         
        })
        .then(newUser => {
            user = newUser
            // upload photo to s3
            const fbProfileImgUrl = profile.photos[0].value
            return uploadToS3(String(newUser._id), fbProfileImgUrl)
        }).then(res => {
            user.img = res.Location
            return user.save({new: true})
        })
        .then(updatedUser => {
            done(null, updatedUser)
        })
        .catch((err) => {
            return done(err)
        })
    }))
}