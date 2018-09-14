const FacebookStrategy = require('passport-facebook').Strategy;
const auth = require('../config/auth')
const User = require('../models/User')
const { uploadUrlToS3 } = require('../utilities/s3-util')
require('dotenv').config()

module.exports = new FacebookStrategy(
    {
        clientID: auth.facebookAuth.id,
        clientSecret: auth.facebookAuth.secret,
        callbackURL: auth.facebookAuth.callbackUrl,
        profileFields: ['id', 'displayName', 'email', 'picture.type(large)']
    },

    async (accessToken, refreshToken, profile, done) => {

        try {
            let existingUser = await User.findOne({'facebook.id': profile.id})
            if(existingUser) {
                // return user
                return done(null, existingUser)
            }
            // create new user
            let newUser = await User({
                facebook: {
                    id: profile.id,
                },
                name: profile.displayName,
                email: profile.emails[0].value,
            }).save({new: true})
            
            // upload photo to s3
            const fbProfileImgUrl = profile.photos[0].value
            let res = await uploadUrlToS3(String(newUser._id), fbProfileImgUrl)
            
            // save photo location
            newUser.img = res.Location
            await newUser.save({new: true})

            // return user
            done(null, newUser)
        } catch(err) {
            // return error
            done(err)
        }
    }
)
