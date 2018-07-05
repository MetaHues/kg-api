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

// Configuration this should be hidden in environmental variables
const config = require('./config/default')

// Strategies
const FacebookStrategy = require('./config/strategy').facebookStrategy
passport.use(FacebookStrategy)

// Passport and session setup
// TODO: set in environmental variable not visible
let uri = config.db.localUri
if (process.env.NODE_ENV === 'production') uri = config.db.serverUri
// connect DB with credentials
mongoose.connect(uri)
.then(console.log(`Connected to Mongoose @ ${uri}`))
.catch(err => log.info(err))

// App setup
const app = express()
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
const UserRoute = require('./routes/User')
app.use('/api/user', UserRoute)

const PostRoute = require('./routes/Post')
app.use('/api/post', PostRoute)

const AuthRoute = require('./routes/Auth')
app.use('/auth', AuthRoute)

app.use(express.static(path.join(__dirname, '/../build')))

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
.on('error', err => log.info(err))

