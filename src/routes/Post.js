const router = require('express').Router()
const mongoose = require('mongoose')
const multer = require('multer')
const multerS3 = require('multer-s3')
const AWS = require('aws-sdk')
const path = require('path')
const urljoin = require('url-join')

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

//
const s3 = new AWS.S3()
const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'kg.jonathanearl.io',
      key: function (req, file, cb) {       // key = post/postid.ext
        new Post().save().then(newPost => {
            const key = urljoin('post', `${String(newPost._id)}${path.extname(file.originalname)}`)
            cb(null, key)
            req.newPost = newPost           // pass newPost to router
        })
      }
    })
})

router.post('/', upload.single('imgUpload'), (req, res) => {
    // require login to post
    if(!req.isAuthenticated()) {
        res.json({success: false, message: 'authentication failed'})
    }

    // retrieve post from s3-multer and update
    let newPost = req.newPost
    newPost.userId = req.user._id
    newPost.msg = req.body.msg
    newPost.media.img = req.file.location
    newPost.save()
    .then(() => {
        // update user post count
        return User.findOneAndUpdate(
                {'_id': req.user._id}, 
                {'$inc': {'counts.posts': 1}}, 
                {new: true}
            )
    })
    .then(updatedUser => {
        let self = Object.assign({}, updatedUser._doc)
        self.isAuthenticated = true
        console.log('self', self)
        console.log('newPost', newPost)
        res.json({post: newPost, self: self})
    })
    .catch(() => {
        res.send('type: "POST" route: "/" error')
    })
})

module.exports = router