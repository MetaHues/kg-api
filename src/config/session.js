const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);

module.exports = {
    option: {
        name: 'kg-api',
        secret: 'temp', 
        resave: false, 
        saveUninitialized: false,
        store: new MongoStore({ 
            mongooseConnection: mongoose.connection,
            retryWrites: false
        })
    }
}