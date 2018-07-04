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
app.use(bodyParser.json())      // parse all input as json

// Session setup
const sessionOption = require('./config/session').option
app.use(session(sessionOption))
app.use(passport.initialize())
app.use(passport.session())


// Routes Setup
app.use(express.static(path.join(__dirname, '../build')))
                                      
const UserRoute = require('./routes/User')
app.use('/user', UserRoute)

const PostRoute = require('./routes/Post')
app.use('/post', PostRoute)

app.get('/me', (req, res) => {
    if(!req.user) {
        res.status(403).send('not logged in')
    }
    res.json(req.user)
})

const auth = require('./routes/Auth')
app.get('/auth', auth)

// TODO: ensure this is working
app.get('/logout', function(req, res){
    console.log('loggingout')
    req.logout();
    res.redirect('/')
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
.on('error', err => log.info(err))

