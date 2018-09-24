import React, { Component } from 'react';
import axios from 'axios';
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const headers = {
	'Authorization': 'JWT ' + localStorage.getItem('token')
}
class TotalsModal extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      openModal: false,
      flightData: [],
     }
  }

  toggleModal = () => {
    axios({
      method: "GET",
			url: "http://127.0.0.1:8000/api/flights/",
			header: headers,
		}).then(response => {
      console.log("flightdata res", response.data)
      this.setState({ flightData: response.data})
    }).catch(err => {
      console.log(err)
    });
    this.setState({ openModal: !this.state.openModal })
  }

  componentDidMount() {
    
    
  }
  render() { 
    return ( 
      <div className="TotalsModal">
      <Modal className="TotalsModal-modal" isOpen={this.state.openModal} toggle={this.toggleModal}>
      <ModalHeader>
        header
      </ModalHeader>
      <ModalBody>
        body
      </ModalBody>
      </Modal>
      </div>
     );
  }
}
 
export default TotalsModal;
