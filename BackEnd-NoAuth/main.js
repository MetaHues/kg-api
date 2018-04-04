const express = require('express')

const app = express()

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/KG', (err) => {
    if(err) {
        console.log(err)
    } else {
        console.log('Successfully connected to mongodb KG')
    }
})

const kitty = require('./routes/kittys')
app.use('/kittys', kitty)

app.listen('3000', () => {
    console.log('Server started on port 3000')
})
