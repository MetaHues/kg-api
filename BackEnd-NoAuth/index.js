const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const log = require('./utilities').log;

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const kittys = require('./routes/kittys')
app.use('/kittys', kittys)

// connect local DB
mongoose.connect('mongodb://localhost/kg').then(()=>{
    return new Promise((resolve,reject)=>{
        const PORT = process.env.PORT || 3000
        app.listen(PORT, (err)=>{
            if(err){
                reject(err)
            }
            resolve(`Server started on port ${PORT}`);
        })
    })
})
.catch(err=>{
    log.info({err})
})
