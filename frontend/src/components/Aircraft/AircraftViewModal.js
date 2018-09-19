import React, { Component } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
class AircraftViewModal extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: "",
     }
  }
  render() { 
    return ( 
      <div className="AircraftViewModal">
        {/* title */}
        {/* IMG of aircraft*/}
        {/* data */}
      </div>
     );
  }
}
 
export default AircraftViewModal;
