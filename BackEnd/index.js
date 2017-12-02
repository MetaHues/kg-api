const express = require('express');
const cors = require('cors');
const app = express();
const admin = require("firebase-admin");

// config data
const serviceAccount = require("./kittyglitter.json");

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

  if(!idToken) {
    res.send('Unauthorized!'); //handle send error 404 or whatever
  } else {
    // validate token
    admin.auth().verifyIdToken(idToken)
    .then(function(decodedToken) {
      var uid = decodedToken.uid;
      console.log(decodedToken);
      res.send('Authorized!');      
    }).catch(function(error) {
      // Handle error
      res.send('Could not authenticate token!');
    });
  }
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))