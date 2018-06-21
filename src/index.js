const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const log = require('./utilities').log
// temp fix :S broke errthing
// const config = require('config'); //https://www.npmjs.com/package/config
const config = require('./config/default')

// assign port based on config/environment varible
const PORT = process.env.PORT || 3000

// TODO: implmenet CSRF https://www.npmjs.com/package/csurf
const app = express()

// CORS
// TODO: implement cors for deployment
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://kg-client.herokuapp.com")
    res.header("Access-Control-Allow-Origin", "http://localhost:5000")
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next()
})

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

// connect DB with credentials
let uri = config.db.localUri
if (process.env.NODE_ENV === 'production') uri = config.db.serverUri
console.log(uri)
mongoose.connect(uri).then(
    app.listen(PORT, console.log(`Server started on port ${PORT}`))
    .on('error', err => log.info(err))
)
.catch(err => log.info(err))