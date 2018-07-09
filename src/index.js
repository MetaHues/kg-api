const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const log = require('./utilities').log
const sslRedirect = require('heroku-ssl-redirect')
const cors = require('cors')
const passport = require('passport')
const path = require('path')

// Environmental variables
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/kg'

// Strategies
const FacebookStrategy = require('./config/strategy').facebookStrategy
passport.use(FacebookStrategy)

// Passport and session setup
mongoose.connect(MONGO_URI)
.then(console.log(`Connected to Mongoose @ ${MONGO_URI}`))
.catch(err => log.info(err))

// App setup
const app = express()
app.enable("trust proxy");      // for heroku ssl validation
app.use(cors())                 // this is not needed if nothing else hits this api
app.use(sslRedirect())          // auto redirect to https (heroku)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Session setup
const sessionOption = require('./config/session').option
app.use(session(sessionOption))
app.use(passport.initialize())
app.use(passport.session())

// Routes Setup
// API                                   
app.use('/api/user', require('./routes/User'))
app.use('/api/post', require('./routes/Post'))
// Auth
app.use('/auth', require('./routes/Auth'))
// Client Files
app.use('/public', express.static(path.join(__dirname, 'build')))
// Client
app.use('*', (req,res) => {
    res.sendfile(path.join(__dirname, 'build', 'index.html'))
})

// Spin up server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
.on('error', err => log.info(err))

