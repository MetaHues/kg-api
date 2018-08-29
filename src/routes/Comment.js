const mongoose = require('mongoose')
const router = require('express').Router()
const Comment = require('../models/Comment')
const ObjectId = mongoose.Types.ObjectId

router.get('/:commentId', (req, res, next) => {
    const commentId = req.params.commentId;
    if(!mongoose.Types.ObjectId.isValid(commentId)) return res.sendStatus(400)
    Comment.findOne({_id: commentId})
    .then(post => {
        return res.json(post)
    }).catch(err => {
        console.log(err)
        return res.sendStatus(500)
    })
})

router.post('/', (req, res, next) => {
    // if(!req.user.isAuthenticated()) return res.sendStatus(404)
    console.log(req.body)
    console.log(req.body.postId)
    const commentData = {
        userId: ObjectId('5b80f55e3cb40b11536121d1'), //remove later
        // userId: req.user._id || ObjectId('5b80f55e3cb40b11536121d1'), //remove later
        // userName: req.user.name || 'bob dillan', //remove later 
        userName: 'bob dillan', //remove later 
        postId: req.body.postId,
        parentCommentId: req.body.parentCommentId,
        msg: req.body.msg,
    }
    console.log(commentData)

    let newComment = new Comment(commentData)
    newComment.save({new: true})
    .then(comment => {
        return res.json(comment)
    }).catch(err => {
        console.log(err)
        return res.sendStatus(500)
    })
})

module.exports = router