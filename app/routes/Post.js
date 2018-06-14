const mongoose = require('mongoose')
const router = require('express').Router()

// import model
const Post = require('../models/Post')

// api get posts ( all kitties right now )
router.get('/', (req, res) => {
    Post.find({})
    .then(k => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(k))
    })
    .catch(err => {
        console.log("error " + err)
    })
})

router.post('/', (req, res) => {
    console.log(req.body)
    
    let newPost = new Post(req.body);

    newPost.save()
    .then(() => {
        res.send('success')
    })
    .catch(() => {
        res.send('error')
    })
})

module.exports = router