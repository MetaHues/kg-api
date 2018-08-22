const FacebookStrategy = require('passport-facebook').Strategy;
const auth = require('./auth')
const User = require('../models/User')

module.exports = {
    facebookStrategy: (new FacebookStrategy({
        clientID: auth.facebookAuth.id,
        clientSecret: auth.facebookAuth.secret,
        callbackURL: auth.facebookAuth.callbackUrl,
        profileFields: ['id', 'displayName', 'email', 'picture.type(large)']
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('profile', profile)
        console.log(profile.photos.data)
        User.findOne({'facebook.id': profile.id})
        .then(existingUser => {
            if(existingUser) {
                existingUser.img = profile.photos[0].value
                existingUser.save()
                .then(() => {
                    return done(null, existingUser)
                })
                .catch(err => {
                    return done(err)
                })
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
                    return done(null, newUser)   
                })
                .catch(err => {
                    return done(err)
                })
            }
        })
        .catch((err) => {
            return done(err)
        })
    }))
}