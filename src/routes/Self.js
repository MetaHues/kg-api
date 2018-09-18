const router = require('express').Router()
const ObjectId = require('mongoose').Types.ObjectId

// import model
const Like = require('../models/Like')
const Comment = require('../models/Comment')
const User = require('../models/User')
const Post = require('../models/Post')
// const Friend = require('../models/Friend')

// Self Routes for retrieving recent information posted at the user
router.get('/', (req, res) => {
    if(!req.isAuthenticated()) {
        res.statusMessage = 'NOT_AUTHORIZED'
        return res.sendStatus(401)
    }
    let self = Object.assign({}, req.user)
    self.isAuthenticated = true
    res.json(self)
})


router.get('/RecentActivity', async(req, res) => {
    if(!req.isAuthenticated()) {
        res.statusMessage = 'NOT_AUTHORIZED'
        return res.sendStatus(401)
    }

    try {
        let comments = await Comment.find({userId: {$ne: req.user._id}, postOwnerId: req.user._id})
        let likes = await Like.find({userId: {$ne: req.user._id}, postOwnerId: req.user._id})
        // get all posts and users in recent activity
        // get all postId userId
        let userIds = []
        let postIds = []
        comments.forEach(comment => {
            userIds.push(comment.userId)
            postIds.push(comment.postId)
        })
        likes.forEach(like => {
            userIds.push(like.userId)
            postIds.push(like.postId)
        })
        // retrieve user and post by id
        let users = await User.find({_id: {$in: userIds}})
        let posts = await Post.find({_id: {$in: postIds}})
        // send to user
        return res.json({likes, comments, users, posts})
    } catch(err) {
        console.log("error " + err)
        res.statusCode = 501
        return res.json({success: false, message: 'INTERNAL_ERROR', error: err})
    }
})

module.exports = router