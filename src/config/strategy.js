const FacebookStrategy = require('passport-facebook').Strategy;
const auth = require('./auth')
const User = require('../models/User')
const { uploadUrlToS3 } = require('../utilities/s3-util')
require('dotenv').config()

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
                    console.log('running uploadUrlToS3')
                    uploadUrlToS3(String(newUser._id), fbProfileImgUrl)
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