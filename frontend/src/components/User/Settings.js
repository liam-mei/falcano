import React, { Component } from 'react';
import axios from "axios";
import NavBar from '../NavBar';
import TopHeader from '../TopHeader';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div>
        {/*remove total hours from line 13*/}
        <TopHeader breadcrumb={[ 'settings' ]} />
        <NavBar />
      </div>
    );
  }
}

export default Settings;
