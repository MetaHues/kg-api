const mongoose = require('mongoose')
const Schema = mongoose.Schema
 
// create schema
const KittySchema = new Schema({
    name: String,
    color: String,
    img: String
})

module.exports = mongoose.model('Kittys', KittySchema)

// no export required, is connected through singleton mongoose
// if exported this way then model can be retrieved through import