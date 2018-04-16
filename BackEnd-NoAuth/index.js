const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const log = require('./utilities').log;

const PORT = process.env.PORT || 3000

const app = express()

// set viewengine
app.set('view engine', 'pug')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const kittys = require('./routes/kittys')
app.use('/kittys', kittys)

// connect local DB
mongoose.connect('mongodb://localhost/kg').then(
    app.listen(PORT, console.log(`Server started on port ${PORT}`))
    .on('error', err => log.info(err))
)
.catch(err => log.info(err))