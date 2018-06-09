import React, {Component} from 'react';
import '../css/Navigator.css'

class Navigator extends Component {
    render() {
        return (
            <nav className="Navigator">
                <div className="logo"><a href=""><i className="fa fa-diamond"/> | KittyGlitter</a></div>
                <div className="search">
                    <div className="searchBoarder">
                        <i className="fa fa-search"/>
                        <input type="text" placeholder="Search"/>
                    </div>
                </div>
                <div className="subnav">
                    <ul>
                        <a href=""><li><i className="fa fa-diamond"/></li></a>
                        <a href=""><li><i className="fa fa-heart-o"/></li></a>
                        <a href=""><li> <i className="fa fa-user-o"/></li></a>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navigator;