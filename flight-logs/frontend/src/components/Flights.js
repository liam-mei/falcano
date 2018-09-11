import React, { Component } from 'react';
import NavBar from "./NavBar";
import axios from "axios";
class Flights extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div>
        <NavBar /> 
        
      </div>
     );
  }
}
 
export default Flights;