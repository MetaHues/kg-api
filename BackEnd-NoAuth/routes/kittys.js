const mongoose = require('mongoose')
const router = require('express').Router()

// import model
const Kitty = require('../models/kittys')

router.get('/', (req, res) => {
    Kitty.find({})
    .then((k)=>{console.log(k)})
    .catch((err)=>{console.log("error " + err)})
    res.send('hello world')
})

module.exports = router