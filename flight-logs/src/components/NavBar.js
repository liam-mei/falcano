import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Billing from "./Billing";
import Flights from "./Flights";
import Settings from "./Settings";
import Aircraft from "./Aircraft";
import Instructors from "./Instructors";
class NavBar extends Component {
  state = {  }
  render() { 
    return ( 
      <div>
        <Link to={Flights}></Link>
        <Link to={Aircraft}></Link>
        <Link to={Instructors}></Link>
        <Link to={Billing}></Link>
        <Link to={Settings}></Link>
      </div>
     );
  }
}
 
export default NavBar;