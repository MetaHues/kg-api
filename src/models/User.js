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
User = mongoose.model('user', UserSchema)

//serialize user?
passport.serializeUser((user, done) => {
    console.log('serializing')
    console.log(user)
    done(null, user.facebook.id)
})

passport.deserializeUser((id, done) => {
    console.log('deserializing')
    console.log(id)
    User.findOne({'facebook.id': id})
    .then(existingUser => {
        console.log(existingUser)
        done(null, existingUser)
    })
    .catch(err => {
        done(err)
    })
})

module.exports = User