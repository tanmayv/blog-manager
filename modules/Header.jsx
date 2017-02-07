import React, {Component} from 'react';
import "./header.scss"
import {Link} from 'react-router'
import { StickyContainer, Sticky } from 'react-sticky';

class Header extends Component{

  render(){
    return (
      <div className="header-container">
        <div className="header">
            <img src="/icon.png"/>
            <span className="title">Tanmay Vijayvargiya</span>
        </div>
          <Sticky isActive={true}>
            <div className="nav-container">
              <Link className="nav-link" to="/" activeClassName="active-link">Blog</Link>
              <Link className="nav-link" to="/about" activeClassName="active-link">About</Link>
              <Link className="nav-link" to="/resume" activeClassName="active-link">Resume</Link>
              <Link className="nav-link" to="/contact" activeClassName="active-link">Contact</Link>
            </div>
          </Sticky>


      </div>
    );
  }
}
export default Header
