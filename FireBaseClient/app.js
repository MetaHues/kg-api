(() => {
	// Initialize Firebase
	var config = {
	apiKey: "AIzaSyBAYfuyfA5pe5ZUkYRGxCAeGZ5DHuaFM8g",
	authDomain: "kittyglitter-186906.firebaseapp.com",
	databaseURL: "https://kittyglitter-186906.firebaseio.com",
	projectId: "kittyglitter-186906",
	storageBucket: "kittyglitter-186906.appspot.com",
	messagingSenderId: "193451824798"
	};
	firebase.initializeApp(config);

	// connect button with event listener
	let button = document.getElementById('button');

	// on click authenticate and print token
	button.addEventListener('click', e => {
		//authenticate


	let provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider)
		.then((res, err) =>{
			if(err) console.log("error:", err);
			else {
				//get token
				firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
				.then(function(idToken) {
					function reqListener () {
					  console.log(this.responseText);
					}
                    var oReq = new XMLHttpRequest();
					oReq.addEventListener("load", reqListener);
					oReq.open("GET", "http://localhost:3000");
                    oReq.setRequestHeader("Authorization", idToken);
                    //oReq.setRequestHeader("Nope", "yup");
                    oReq.send();
                    console.log('Your token is ');
                    console.log(typeof(idToken));
                    console.log(idToken);
				}).catch(function(error) {
				  // Handle error
				  console.log(error);
				});
			}
		});
	});

	
})();