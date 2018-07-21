const router = require('express').Router()
const mongoose = require('mongoose')

// import model
const Post = require('../models/Post')
const User = require('../models/User')

// api get posts ( all kitties right now )
router.get('/', (req, res) => {
    let query = {}
    if(typeof req.query.userId === "string" && req.query.userId.length === 24) query = {'userId': mongoose.Types.ObjectId(req.query.userId)}
    Post.find(query)
    .then(thePosts => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(thePosts))
    })
    .catch(err => {
        console.log("type: 'GET' route: '/' error: " + err)
    })
})

router.get('/:postId', (req, res) => {
    Post.findById(req.params.postId)
    .then(thePost => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(thePost))
    })
    .catch(err => {
        console.log("type: 'GET' route: '/:postId' error: " + err)
    })
})

router.post('/', (req, res) => {
    // require login to post
    if(!req.isAuthenticated()) {
        res.json({success: false, message: 'authentication failed'})
    }
    // create new post
    let newPost = new Post(req.body);
    newPost.userId = req.user._id
    newPost.createdAt = Date.now()
    newPost.save()
    .then(savedPost => {
        // update user post count
        User.findById(req.user._id)
        .then(user => {
            user.counts.posts += 1
            user.save()
            .then(
                // likely need to send updated user info
                res.json({post: newPost, self: user})
            )
            .catch(err => {
                console.log(err)
                res.json(err)
            })
        })
        .catch(err => {
            console.log('failed to get user', err)
            res.json(err)
        })
    })
    .catch(() => {
        res.send('type: "POST" route: "/" error')
    })
})

module.exports = router