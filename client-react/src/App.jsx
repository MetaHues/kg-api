import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    //let kitty = this.props.kitty;
    return (
      <div className="App">
        <article className="kard">
          <div className="section header">
            <img src="" alt="" srcset=""/>
            <div className="kitty_name"><strong>SampleKitty</strong></div>
            <div className="option_button">...</div>
          </div>
          <div className="media">
            <video preload='auto' autoplay='autoplay' loop='loop'>
              <source src="https://i.imgur.com/K9YWnXI.mp4" type="video/mp4"/>
            </video>
          </div>
          <div className="section interactions">
            <div className="like_button">
              <img src="/img/grumpy_kitty.png" alt=""/>
            </div>
            <div className="comment_button">Comment</div>
            <div className="bookmark_button">Bookmark</div>
          </div>
          <div className="section like_info">
            <p>69 Grumpys</p>
          </div>
          <div className="section comments">
            <ol>
              <li>Boom: This is a kitty, there are many like it, but this is mine. My kitty is my best friend. It is my life. I must master it as I must master my life. My kitty, without me, is useless. Without my kitty, I am useless. </li>
              <li>Other1: comment 1</li>
              <li>Other2: comment 2</li>
            </ol>
          </div>
          <div className="section time_posted">69hours and 69mins ago</div>
          <div className="section comment_area">
            <input type="text" name="" id=""/>
            <button>...</button>
          </div>
        </article>
      </div>      
    );
  }
}

export default App;
