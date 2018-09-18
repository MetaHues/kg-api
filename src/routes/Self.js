const router = require('express').Router()
const ObjectId = require('mongoose').Types.ObjectId

// import model
const Like = require('../models/Like')
const Comment = require('../models/Comment')
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
        return res.json({likes, comments})
    } catch(err) {
        console.log("error " + err)
        res.statusCode = 501
        return res.json({success: false, message: 'INTERNAL_ERROR', error: err})
    }
})

module.exports = router