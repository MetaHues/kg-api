const express = require('express');
const cors = require('cors');
const app = express();
const admin = require("firebase-admin");

// config data
const serviceAccount = require("kittyglitter.json");
// initialize firebase verification object
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kittyglitter-186906.firebaseio.com"
});

// allow cross domain requests
app.use(cors({origin:true,credentials: true}));

// No real logic to login, but validates user
app.get('/', (req, res) => {
    console.log("");
    console.log("****** request ******");
    // get token from header
    let idToken = req.get('Authorization')
    console.log("token: " + idToken);
    // check if token sent
    if(idToken) {
        // validate token (should cache this eventually)
        admin.auth().verifyIdToken(idToken)
        .then(function(decodedToken) {
        var uid = decodedToken.uid;
        console.log(decodedToken);
        res.send('Authorized!');      
        }).catch(function(error) {
        // Handle error
        res.send('Error with authentication!');
        });
    } else { //no token sent
        res.send('Error no token attached!');        
    }

    
});

