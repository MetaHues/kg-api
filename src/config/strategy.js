const FacebookStrategy = require('passport-facebook').Strategy;
const auth = require('./auth')
const User = require('../models/User')

module.exports = {
    facebookStrategy: (new FacebookStrategy({
        clientID: auth.facebookAuth.id,
        clientSecret: auth.facebookAuth.secret,
        callbackURL: auth.facebookAuth.callbackUrl
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOne({'facebook.id': profile.id})
        .then(existingUser => {
            if(existingUser) {
                console.log('finding existing user')
                console.log(existingUser)
                return done(null, existingUser)
            } else {
                console.log('creating user')
                new User({
                    facebook: {
                        id: profile.id,
                    },
                    name: profile.displayName,
                }) 
                .save()
                .then((newUser) => {
                    console.log(newUser)
                    done(null, newUser)   
                })
                .catch(err => {
                    done(err)
                })
            }
        })
        .catch((err) => {
            done(err)
        })
    }))
}