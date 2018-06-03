import React, { Component } from 'react';
import logo from '../logo/logo.svg';
import Card from './Card';
//import '../css/App.css';

class App extends Component {
  render() {
    //let kitty = this.props.kitty;
    return (
      <div className="App">
        <Card/>
      </div>      
    );
  }
}

export default App;
