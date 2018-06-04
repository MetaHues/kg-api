import React, { Component } from 'react';
import logo from '../logo/logo.svg';
import '../css/Card.css';

class Card extends Component {
  render() {
    let rows = []
    this.props.post.comments.forEach((comment) => {
        rows.push(<li><strong>{comment.userName}: </strong>{comment.text}</li>)
    })

    return (
        <article className="kard">
          <div className="section header">
            <img src={this.props.kitty.profileImg} alt="" srcset=""/>
            <div className="kitty_name"><strong>{this.props.kitty.name}</strong></div>
            <div className="option_button">...</div>
          </div>
          <div className="media">
            <video preload='auto' autoplay='autoplay' loop='loop'>
              <source src="https://i.imgur.com/K9YWnXI.mp4" type="video/mp4"/>
            </video>
          </div>
          <div className="section interactions">
            <a className="like_button"><i className="fa fa-heart-o"/></a>
            <a className="comment_button"><i className="fa fa-diamond"/></a>
            <a className="bookmark_button"><i className="fa fa-bookmark-o"/></a>
          </div>
          <div className="section like_info">
            <p><strong>69 Grumpys</strong></p>
          </div>
          <div className="section comments">
            <ol>
                <li><strong>{this.props.kitty.name}: </strong>{this.props.post.postText}</li>
                {rows}
            </ol>
          </div>
          <div className="section time_posted">69hours and 69mins ago</div>
          <div className="section comment_area">
            <input type="text" name="" id="" placeholder="Add a some glitter..."/>
            <a><i className="fa fa-ellipsis-h"/></a>
          </div>
        </article>
    );
  }
}

export default Card;
