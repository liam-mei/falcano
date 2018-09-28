import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import TopHeader from '../TopHeader';


class InstructorCard extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: "",
			license_number: "",
			photo: "",
			ratings: "",
			contact_number: "",
			contact_email: "",
			description: "",
			modal: false,
     }
  }
  render() { 
    console.log("INSTR PROPS: ", this.props)
    return ( 
      <div>
        <div className="Instructors-container">
				<div className="Instructor-card ">
					<div className="card-name">{this.props.data.name}</div>
					<div className="card-number">{this.props.data.license_number}</div>
					<div className="card-img">
						<img src={this.props.data.photo} />
					</div>
					<div className="card-description">
						<div className="description-title">Descriptions/Notes</div>
						<div className="description-content">
							{this.props.data.description}
            </div>
					</div>
					<div className="card-rating">
						<div className="rating-title">Ratings:</div>
						<div className="rating-details">{this.props.data.ratings}</div>
					</div>
					<div className="card-contact">
						<div className="contact-title">Contact</div>
						<div className="contact-info">
							<div className="contact-email">{this.props.data.contact_email}</div>
							<div className="contact-number">{this.props.data.contact_number}</div>
						</div>
					</div>
				</div>
      </div>
      </div>
     );
  }
}
 
export default InstructorCard;