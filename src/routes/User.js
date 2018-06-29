const router = require('express').Router()

// import model
const User = require('../models/User')

// api get kitties ( all kitties right now )
router.get('/', (req, res) => {
    User.find({})
    .then(users => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(users))
    })
    .catch(err => {
        console.log("error " + err)
    })
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

// temp page to update kitties
router.get('/add', (req, res) => {
    res.render('add')
})

module.exports = router