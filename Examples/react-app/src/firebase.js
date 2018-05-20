import firebase from 'firebase'
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

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
