const router = require('express').Router()
const Like = require('../models/Like')
const Post = require('../models/Post')

router.get('/:postId', (req, res) => {
    Like.find({postId: req.params.postId})
    .then(likes => {
        res.json(likes)
    })
    .catch(err => {
        console.log('get like err', err)
        res.status(501).json({success: false, errorMessage: 'could not retrieve likes'})
    })
})

router.post('/:postId', (req, res) => {
    // validate user is logged in
    if(!req.isAuthenticated()) return res.setStatus(404).json({msg: 'Not Authenticated'})
    // add like
    const newLike = new Like({userId: req.user._id, postId: req.params.postId})
    newLike.save()
    // update post count and return updated post
    .then(() => {
        return Post.findOneAndUpdate({_id: req.params.postId}, {$inc:{likeCount: 1}}, {new: true})
    })
    .then((post) => {
        res.json({success: true, post, like: newLike})
    })
    .catch(err => {
        console.log(err)
        if(err.code === 11000) res.status(401).json({success: false, errorMessage: 'Post is already liked'})
        else res.status(501).json({success: false, errorMessage: 'Could not like post'})
    })
})

router.delete('/:postId', (req, res) => {
    if(!req.isAuthenticated()) return res.status(404).json({msg: 'Not Authenticated'})
    Like.deleteOne({userId: req.user._id, postId: req.params.postId})
    .then((db) => {
        const likeFound = db.n !== 0
        if(!likeFound) return res.json({success: false, errorMessage: 'Post is not liked by user'})
        return Post.findOneAndUpdate({_id: req.params.postId}, {$inc:{likeCount: -1}}, {new: true})
    })
    .then((post) => {
        return res.json({success: true, post})
    })
    .catch(err => {
        console.log('like delete error', err)
        return res.json({success: false, errMessage: 'Could not remove like'})
    })
})

module.exports = router