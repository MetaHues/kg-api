const router = require('express').Router()
const Post = require('../models/Post')

router.post('/:postId', (req, res) => {
    if(!req.isAuthenticated()) return res.setStatus(404).json({msg: 'Not Authenticated'})
    console.log(req.params)
    let user = {
        userId: req.user._id, 
        userName: req.user.name
    }
    Post.findById({_id: req.params.postId})
    .then(post => {
        console.log(post)
        post.likes.push(user)
        post.likeCount += 1
        return post.save()
    })
    .then(post => {
        console.log(post)
        return res.json(user)
    })
    .catch(err => {
        console.log(err)
        return res.setStatus(501).json({msg: 'Could not access post'})
    })
})

router.delete('/', (req, res) => {
    if(!req.isAuthenticated()) return res.setStatus(404).json({msg: 'Not Authenticated'})
    console.log('hey')
    return res.send('<h1>likes</h1>')
})

module.exports = router