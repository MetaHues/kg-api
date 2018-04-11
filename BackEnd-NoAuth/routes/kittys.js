const mongoose = require('mongoose')
const router = require('express').Router()

// import model
const Kitty = require('../models/kittys')

// Kitty.find({})
// .then((k)=>{console.log(k)})
// .catch((err)=>{console.log("error " + err)})

router.get('/', (req, res) => {
    res.render('kittys')
})

router.post('/', (req, res) => {
    console.log(req.body.name)
    console.log(req.body.img)
    console.log(req.body.color)
    res.send(req.body);
})

module.exports = router