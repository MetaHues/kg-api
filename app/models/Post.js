const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const PostSchema = new Schema({
    userId: ObjectId,
    mediaUrl: String,
    comments: [{user: ObjectId, comment: String}]
})

module.exports = mongoose.model('post', PostSchema);