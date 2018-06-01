const mongoose = require('mongoose')
const Schema = mongoose.Schema
 
// create schema
const UserSchema = new Schema({
    name: String,
    img: String,
    role: String
})

module.exports = mongoose.model('Users', UserSchema)

// no export required, is connected through singleton mongoose