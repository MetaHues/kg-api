const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const LikeSchema = new Schema({
    userId: {
        type: ObjectId,
        required: true,
    },
    postId: {
        type: ObjectId,
        required: true,
    },
    likedAt: {
        type: Date,
        default: Date.now
    }
})

LikeSchema.index({userId: 1, postId: 1}, {unique: true})

module.exports = mongoose.model('like', LikeSchema);