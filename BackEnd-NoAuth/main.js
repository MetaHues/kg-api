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

let app = express()

// set bodyPaser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// set view engine
app.set('view engine', 'pug')

const KittyRoute = require('./routes/KittiesRoute')
app.use('/kitties', KittyRoute)

app.listen('3000', () => {
    console.log('Server started on port 3000')
})
