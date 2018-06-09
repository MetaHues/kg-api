import React, { Component } from 'react';
import logo from '../logo/logo.svg';
import Card from './Card';
import Navigator from './Navigator';
//import '../css/App.css';

const user = {
  name:"SampleKitty1",
  id:"317047310",
  profileImg:"https://placekitten.com/500/500",
  posts:["324230842"],
  friends:["1","2","3","4"]
}

const post = {
  id:"324230842",
  userId:"317047310",
  labels:null,
  postText:"This is a kitty, there are many like it, but this is mine. My kitty is my best friend. It is my life. I must master it as I must master my life. My kitty, without me, is useless. Without my kitty, I am useless.",
  likedBy:null,
  comments:[
    {userId:"1", userName:"friend1", text:"awesome pic!", time:"10pm"},
    {userId:"2", userName:"friend2", text:"SoOooOoO cool!", time:"10pm"},
    {userId:"3", userName:"friend3", text:"Cute...", time:"10pm"},
    {userId:"4", userName:"friend4", text:"not good pic!", time:"10pm"},
    {userId:"317047310", userName:"SampleKitty1", text:"your not good pic!", time:"10.1pm"}
  ]
}

class App extends Component {
  render() {
    //let kitty = this.props.kitty;
    return (
      <div className="App">
        <Navigator/>
        <Card kitty={user} post={post}/>
      </div>      
    );
  }
}

export default App;
