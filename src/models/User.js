const passport = require('passport')
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

// create schema
const UserSchema = new Schema({
    facebook: {
        id: String,
        token: String,
        name: String
    },
    name: String,
    img: String,
    profileImg: String,
    posts: [ObjectId],
    friends: [ObjectId]
})

//serialize user?
passport.serializeUser((user, done) => {
    console.log('serializing')
    console.log(user)
    done(null, user._id)
})

passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
        console.log('deserializing')
        console.log(user)
        done(null, user)
    })
    .catch(err => {
        done(err)
    })
})

module.exports = mongoose.model('user', UserSchema)

// no export required, is connected through singleton mongoose