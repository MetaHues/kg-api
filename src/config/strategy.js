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
    console.log('profile', `${String(userId)}.jpg`)
    const key = urljoin('profile', `${userId}.jpg`)
    console.log('key', key)
    let requestOptions = {
        url: profileImgUrl,
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


module.exports = {
    facebookStrategy: (new FacebookStrategy({
        clientID: auth.facebookAuth.id,
        clientSecret: auth.facebookAuth.secret,
        callbackURL: auth.facebookAuth.callbackUrl,
        profileFields: ['id', 'displayName', 'email', 'picture.type(large)']
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOne({'facebook.id': profile.id})
        .then(existingUser => {
            if(existingUser) {
                return done(null, existingUser)
            } else {
                new User({
                    facebook: {
                        id: profile.id,
                    },
                    name: profile.displayName,
                    email: profile.emails[0].value,
                }) 
                .save()                         // save new user
                .then(newUser => {
                    const fbProfileImgUrl = profile.photos[0].value
                    uploadToS3(String(newUser._id), fbProfileImgUrl)
                    return done(null, newUser)  // return new user to be sent back 
                })
                .catch(err => {
                    return done(err)            // pass error on
                })
            }
        })
        .catch((err) => {
            return done(err)
        })
    }))
}