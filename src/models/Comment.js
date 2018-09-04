const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.SchemaTypes.ObjectId

const CommentSchema = new Schema({
    userId: {               // id of user who posted this comment
        type: ObjectId,
        required: true,
    },
    userName: {             // name of user who posted comment
        type: String,
        require: true,
    },
    postId: {
        type: ObjectId,
        required: true,
    },
    parentCommentId: {      // comment this is a subcomment to
        type: ObjectId,
    },
    msg: {                  // actual comment value
        type: String,
        required: true,
    },
replyCount: {               // number of subcomments
        type: Number,
        default: 0,
    },
    date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('comment', CommentSchema)