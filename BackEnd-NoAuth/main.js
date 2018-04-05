const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

// set viewengine
app.set('view engine', 'pug')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// connect local DB
mongoose.connect('mongodb://localhost/kg')

const kittys = require('./routes/kittys')
app.use('/kittys', kittys)

app.listen('3000', () => {
    console.log('Server started on port 3000')
})
