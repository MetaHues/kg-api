const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const log = require('./utilities').log
const cors = require('cors')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy;
// temp fix :S broke errthing
// const config = require('config'); //https://www.npmjs.com/package/config

// Configuration this should be hidden in environmental variables
const config = require('./config/default')
const auth = require('./config/auth')

// Models
const User = require('./models/User')

passport.use(new FacebookStrategy({
        clientID: auth.facebookAuth.id,
        clientSecret: auth.facebookAuth.secret,
        callbackURL: auth.facebookAuth.callbackUrl
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOne({'facebook.id': profile.id})
        .then(existingUser => {
            if(existingUser) {
                console.log('finding existing user')
                console.log(existingUser)
                return done(null, existingUser)
            } else {
                console.log('creating user')
                new User({
                    facebook: {
                        id: profile.id,
                    },
                    name: profile.displayName,
                }) 
                .save()
                .then((newUser) => {
                    console.log(newUser)
                    done(null, newUser)   
                })
                .catch(err => {
                    done(err)
                })
            }
        })
        .catch((err) => {
            done(err)
        })
    }
))

// assign port based on config/environment varible
const PORT = process.env.PORT || 5000

// TODO: implmenet CSRF https://www.npmjs.com/package/csurf
const app = express()

// Passport and session setup
// TODO: set in environmental variable not visible
app.use(session({secret: 'temp', resave: false, saveUninitialized: false}))
app.use(passport.initialize())
app.use(passport.session())

// CORS
// TODO: set explicit allowed URL's in config
app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'))
                                      
// TODO: rename the routes https://restfulapi.net/resource-naming/
const UserRoute = require('./routes/User')
app.use('/User', 
        passport.authenticate('facebook'),
        UserRoute)

const PostRoute = require('./routes/Post')
app.use('/Post', 
        passport.authenticate('facebook'), 
        PostRoute)

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));
// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback', 
        passport.authenticate('facebook', { successRedirect: 'http://localhost:3000', failureRedirect: 'http://localhost:3000/login' }));

// connect DB with credentials
let uri = config.db.localUri
if (process.env.NODE_ENV === 'production') uri = config.db.serverUri
console.log(uri)
mongoose.connect(uri)
.then(() => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`))
    .on('error', err => log.info(err))
})
.catch(err => log.info(err))