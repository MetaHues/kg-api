const express = require('express')
const mongoose = require('mongoose')

const app = express()

// connect local DB
mongoose.connect('mongodb://localhost/kg')

const kittys = require('./routes/kittys')
app.use('/kittys', kittys)

app.listen('3000', () => {
    console.log('Server started on port 3000')
})
