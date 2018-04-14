const mongoose = require('mongoose')
const router = require('express').Router()

// import model
const Kittys = require('../models/kittys')

/**
 * 
 */
router.get('/', (req, res) => {
    Kittys.find({}, function (err, docs) {
        if(err){
            res.status(400).send(err);
        }
        res.status(200).send(docs)
      });
})

router.post('/', (req, res) => {
    console.debug(req.body);
    Kittys.create(req.body).then((data)=>{
        res.send(data);
    }).catch(err=>{
        log.info({err})
    })
})

module.exports = router