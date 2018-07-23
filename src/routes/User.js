const router = require('express').Router()
const ObjectId = require('mongoose').Types.ObjectId

// import model
const User = require('../models/User')

// api get kitties ( all kitties right now )
router.get('/', (req, res) => {
    User.find({})
    .then(users => {
        res.setHeader('Content-Type', 'application/json');
        res.json(users)
    })
    .catch(err => {
        console.log("error " + err)
    })
})

router.get('/profile', (req, res) => {
    if(!req.user) {
        res.statusMessage = 'NOT_AUTHORIZED'
        res.sendStatus(403)
    }
    let self = Object.assign({}, req.user._doc)
    self.isAuthenticated = true
    res.json(self)
})

router.get('/:userId', (req, res) => {
    if(!req.params.userId || !ObjectId.isValid(req.params.userId)) {
        res.statusCode = 400
        res.json({success: false, message: 'INVALID_USERID'})
        return;
    }

    User.findById(req.params.userId)
    .then(theUser => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(theUser))
    })
    .catch(err => {
        console.log("error " + err)
    })
})

router.post('/', (req, res) => {
    let newUser = new User(req.body);
    newUser
    .save()
    .then(() => {
        res.send('success')
    })
    .catch(() => {
        res.send('error')
    })
})

// {userId: id} is passed with the user to (un)follow
router.post('/friend', (req, res) => {
    if(!req.isAuthenticated()) {
        res.statusCode = 401
        res.json({success: false, message: 'AUTHENTICATION_FAILED'})
        return;
    }

    // verify userId
    if(!req.body.userId || !ObjectId.isValid(req.body.userId)) {
        res.statusCode = 400
        res.json({success: false, message: 'INVALID_USERID'})
        return;
    }

    // +1 to follower/followee
    let updateSelf = { $push: { friends: req.body.userId }, $inc: { 'counts.followees':  1}}
    let updateUser = { $inc: { 'counts.followers':  1}}
    // -1 follower/followee
    if(req.user.friends.includes(req.body.userId)){
        updateSelf = { $pull: { friends: req.body.userId }, $inc: {'counts.followees': -1}}
        updateUser = { $inc: { 'counts.followers':  -1}}
    }

    // update self counts
    User.findOneAndUpdate(
            {_id: req.body.userId},
                updateUser)
    .then(() => {
        // update target count
        User.findOneAndUpdate(
                {_id: req.user._id}, 
                updateSelf,
                {new: true})    // required to get updated document
        // success update both!
        .then(updatedSelf => {
            let data = Object.assign({}, updatedSelf._doc)
            data.isAuthenticated = true
            res.json(data)
        })
        .catch(err => {
            res.statusCode = 500;
            res.json({ success:false, err: err, msg: "INTERNAL_SERVER_ERROR", self: req.self})
        })
    })
    .catch(err => {
        console.log('find follower user', err)
        res.statusCode = 500;
        res.json({ success:false, err: err, msg: "INTERNAL_SERVER_ERROR", user: req.body.userId})
    })
})

module.exports = router