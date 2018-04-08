const mongoose = require('mongoose')
const router = require('express').Router()

// import model
const Kitty = require('../models/KittyModel')

// api get kitties ( all kitties right now )
router.get('/', (req, res) => {
    Kitty.find({})
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
    
    let newKitty = new Kitty({
        name: req.body.KittyName,
        img: req.body.KittyImg,
        color: req.body.KittyColor
    });

    newKitty
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