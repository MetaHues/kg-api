const router = require('express').Router()
const mongoose = require('mongoose')

// import model
const Post = require('../models/Post')

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
        console.log("error " + err)
    })
})

router.get('/:postId', (req, res) => {
    Post.findById(req.params.postId)
    .then(thePost => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(thePost))
    })
    .catch(err => {
        console.log("error " + err)
    })
})

router.post('/', (req, res) => {    
    let newPost = new Post(req.body);
    newPost.userId = req.user._id
    console.log(newPost)
    newPost.save()
    .then(savedPost => {
        console.log(savedPost)
        res.json(savedPost)
    })
    .catch(() => {
        res.send('error')
    })
})

module.exports = router