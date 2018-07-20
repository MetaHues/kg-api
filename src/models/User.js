const passport = require('passport')
const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

// TODO: rerun users to add stats to their profile
// TODO: generate random follows
// create schema
const UserSchema = new Schema({
    facebook: {
        id: String
    },
    name: String,
    img: String,
    email: String,
    friends: [String],
    counts: {
        media: {
            type: Number,
            default: 0
        },
        follows: {
            type: Number,
            default: 0
        },
        followed_by: {
            type: Number,
            default: 0
        }
    }
})
User = mongoose.model('user', UserSchema)

passport.serializeUser((user, done) => {
    done(null, user.facebook.id)
})

passport.deserializeUser((id, done) => {
    User.findOne({'facebook.id': id})
    .then(existingUser => {
        done(null, existingUser)
    })
    .catch(err => {
        done(err)
    })
})

module.exports = User