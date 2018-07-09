const FacebookStrategy = require('passport-facebook').Strategy;
const auth = require('./auth')
const User = require('../models/User')

module.exports = {
    facebookStrategy: (new FacebookStrategy({
        clientID: auth.facebookAuth.id,
        clientSecret: auth.facebookAuth.secret,
        callbackURL: auth.facebookAuth.callbackUrl,
        profileFields: ['id', 'displayName', 'photos', 'email']
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(`${profile} has logged in!`)

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
                    img: profile.photos[0].value
                }) 
                .save()
                .then((newUser) => {
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