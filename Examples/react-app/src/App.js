import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase, { auth, provider } from './firebase.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: '',
      username: '',
      items: [],
      user: null // <-- add this line
    }
  }

  // TODO: cleanup login function so that it is it's own componenet
  // TODO: separate as route or something dah https://css-tricks.com/firebase-react-part-2-user-authentication/
  login(e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    
    auth.signInWithPopup(provider)
			.then((res, err) => {
				if (err) console.log("error:", err);
				else {
					//get token
					auth.currentUser.getIdToken( /* forceRefresh */ true)
						.then(function (idToken) {
							function reqListener() {
								console.log(this.responseText);
							}
							var oReq = new XMLHttpRequest();
							oReq.addEventListener("load", reqListener);
							oReq.open("GET", "http://localhost:3000");
							oReq.setRequestHeader("Authorization", idToken);
							//oReq.setRequestHeader("Nope", "yup");
							oReq.send();
							console.log('Your token is ');
							console.log(typeof (idToken));
							console.log(idToken);
						}).catch(function (error) {
							// Handle error
							console.log(error);
						});
				}
			});
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to KittyGlitter!!!</h1>
        </header>

        <form onSubmit={this.login.bind(this)}>
          <input type="text" ref={ el => this.inputEl = el }/>
          <input type="submit"/>
        </form>
        
        <div id="main">
            <div class="container">
                <h1>KittyGlitter</h1>
                <div id="cute-kitty">
                  <img src={logo} className="App-logo" alt="logo" />
                </div>
                <div id="login-button">
                    <button id="button">Login</button>
                </div>
                <div id="logout">
                    <span>Not insertidhere? </span><a src="">Switch Accounts</a>
                </div>
            </div>
        </div>
        <div id="footer">
            <nav id="footer-links">
                <ul>
                    <li><a href="">About Us</a></li>
                    <li><a href="">Blog</a></li>
                    <li><a href="">Jobs</a></li>
                    <li><a href="">Privacy</a></li>
                </ul>
            </nav>
            <span id="Logo">KittyGlitter!</span>
        </div>
        <script src="https://www.gstatic.com/firebasejs/4.6.2/firebase.js"></script>
        <script src="app.js"></script>
      </div>
    );
  }
}

export default App;
