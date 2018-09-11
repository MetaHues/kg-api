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
    likeCount: {
        type: Number,
        default: 0
    },
    comments: [{user: ObjectId, comment: String}],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('post', PostSchema);