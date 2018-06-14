const mongoose = require('mongoose')
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId

// create schema
const UserSchema = new Schema({
    name: String,
    img: String,
    profileImg: String,
    posts: [ObjectId],
    friends: [ObjectId]
})

module.exports = mongoose.model('user', UserSchema)

// no export required, is connected through singleton mongoose