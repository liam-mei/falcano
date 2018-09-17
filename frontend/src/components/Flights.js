import React, { Component } from 'react';
import NavBar from "./NavBar";
import axios from "axios";
// import { Breadcrumb } from 'reactstrap';
import TopHeader from "./TopHeader";
class Flights extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div>
        <TopHeader />
        <NavBar /> 
      
      </div>
     );
  }
}
 
export default Flights;
