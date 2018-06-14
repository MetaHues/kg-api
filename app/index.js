const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const log = require('./utilities').log;
const config = require('config'); //https://www.npmjs.com/package/config

// assign port based on config/environment varible
const PORT = process.env.PORT || 3000

// TODO: implement CORS https://github.com/expressjs/cors
// TODO: implmenet CSRF https://www.npmjs.com/package/csurf
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'))

// TODO: rename the routes https://restfulapi.net/resource-naming/
const User = require('./routes/User')
app.use('/User', User)

const Post = require('./routes/Post')
app.use('/Post', Post)

// connect local DB with credentials
// TODO: DB credentials should come from environment variables
const connectionString = config.get('db.connectionString');
mongoose.connect(connectionString).then(
    app.listen(PORT, console.log(`Server started on port ${PORT}`))
    .on('error', err => log.info(err))
)
.catch(err => log.info(err))