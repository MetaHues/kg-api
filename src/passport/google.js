var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('../models/User')
const { uploadUrlToS3 } = require('../utilities/s3-util')
require('dotenv').config()

module.exports = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK,
    },

    async (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        try {
            let existingUser = await User.findOne({'email': profile.emails[0].value})
            if(existingUser) {
                // return user
                return done(null, existingUser)
            }
            // create new user
            let newUser = await User({
                google: {
                    id: profile.id,
                },
                name: profile.displayName,
                email: profile.emails[0].value,
            }).save({new: true})
            
            // upload photo to s3
            let fbProfileImgUrl = profile.photos[0].value
            fbProfileImgUrl = fbProfileImgUrl.substring(0, fbProfileImgUrl.length - 2) + '250'
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
