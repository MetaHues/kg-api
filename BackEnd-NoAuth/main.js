const express = require('express')

const app = express()

//MongoClient.connect('')

const kitty = require('./routes/kittys')
app.use('/kittys', kitty)

app.listen('3000', () => {
    console.log('Server started on port 3000')
})
