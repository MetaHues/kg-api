'use strict'
var mongoose = require('mongoose')

const Schema = mongoose.Schema,
 
var kittySchema = new Schema({
    name: String,
    color: String,
    img: String
});

var model = mongoose.model('Kitty', kittySchema)

module.exports = model