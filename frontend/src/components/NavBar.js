import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './NavBarCSS.css';
class NavBar extends Component {
  state = {  }
  render() { 
    return ( 
      <div className="nav-div">
        <Link className="link" to={'/flights'}>Flights</Link>
        <br/>
        <Link className="link" to={'/aircraft'}>Aircraft</Link>
        <br/>
        <Link className="link" to={'/instructors'}>Instructors</Link>
        <br/>
        <Link className="link" to={'/billing'}>Billing</Link>
        <br/>
        <Link className="link" to={'/settings'}>Settings</Link>
      </div>
    );
  }
}

export default NavBar;
