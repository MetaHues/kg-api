const mongoose = require('mongoose')
const router = require('express').Router()
const ObjectId = mongoose.Types.ObjectId

// Models
const Comment = require('../models/Comment')
const Post = require('../models/Post')

router.get('/:postId', async(req, res, next) => {
    const postId = req.params.postId;
    if(!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({success: false, err: 'INVALID_POSTID'})
    }

    try {
        let comments = await Comment.find({postId: postId})
        return res.json(comments)
    } catch(err) {
        console.log(err)
        return res.status(500).json({success: false, err})
    }
})

router.post('/', async(req, res, next) => {
    if(!req.isAuthenticated()) return res.sendStatus(404)

    const commentData = {
        userId: req.user._id, 
        userName: req.user.name, 
        postId: req.body.postId,
        parentCommentId: req.body.parentCommentId,
        msg: req.body.msg,
    }

    // get owner of post and attach to comment
    try {
        let thePost = await Post.findById(commentData.postId)
        commentData.postOwnerId = thePost.userId
    } catch (err) {
        console.log(err)
        return res.statusCode(401).json({success: false, err})
    }

    // create comment and return to user
    try {
        let newComment = await (new Comment(commentData).save({new: true}))
        return res.json([newComment])
    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
})

module.exports = router