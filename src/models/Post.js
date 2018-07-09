const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const PostSchema = new Schema({
    userId: ObjectId,
    msg: String,
    media: {
        img: String,
        video: String,
    },
    likes: Number,
    comments: [{user: ObjectId, comment: String}]
})

module.exports = mongoose.model('post', PostSchema);