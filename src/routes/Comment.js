const mongoose = require('mongoose')
const router = require('express').Router()
const Comment = require('../models/Comment')
const ObjectId = mongoose.Types.ObjectId

router.get('/:postId', (req, res, next) => {
    const postId = req.params.postId;
    if(!mongoose.Types.ObjectId.isValid(postId)) return res.sendStatus(400)
    Comment.find({postId: postId})
    .then(comments => {
        return res.json(comments)
    }).catch(err => {
        console.log(err)
        return res.sendStatus(500)
    })
})

router.post('/', (req, res, next) => {
    if(!req.isAuthenticated()) return res.sendStatus(404)
    console.log(req.body)
    console.log(req.body.postId)
    const commentData = {
        userId: req.user._id, 
        userName: req.user.name, 
        postId: req.body.postId,
        parentCommentId: req.body.parentCommentId,
        msg: req.body.msg,
    }
    console.log(commentData)

    let newComment = new Comment(commentData)
    newComment.save({new: true})
    .then(comment => {
        return res.json([comment])
    }).catch(err => {
        console.log(err)
        return res.sendStatus(500)
    })
})

module.exports = router