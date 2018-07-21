const router = require('express').Router()
const passport = require('passport')

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
    res.json(req.user)
})

router.get('/:userId', (req, res) => {
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
        res.json({success: false, message: 'authentication failed'})
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

    // update self
    User.findOneAndUpdate(
            {_id: req.user._id}, 
            updateSelf,
            {new: true})    // required to get updated document
    .then(user => {
        // update target count
        User.findOneAndUpdate(
            {_id: req.userId},
            updateUser)
        // success update both!
        .then(() => {
            res.json({success: true, self: user})
        })
        .catch(err => {
            res.statusCode = 500;
            res.json({ success:false, err: err, msg: "could not retrieve user", user: req.userId})
        })
    })
    .catch(err => {
        console.log(err)
        res.statusCode = 500;
        res.json({ success:false, err: err, msg: "could not retrieve self", self: req.user})
    })
})

module.exports = router