const mongoose = require('mongoose')
const Schema = mongoose.Schema
 
// create schema
const UserKittySchema = new Schema({
    name: String,
    userId: ObjectId,
    kittyId: ObjectId
})

module.exports = mongoose.model('User_Kitty', UserKittySchema)

// no export required, is connected through singleton mongoose