import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import TopHeader from '../TopHeader';

const dev = true;
let URL;
dev
  ? (URL = "http://127.0.0.1:8000/api")
  : (URL = "https://flightloggercs10.herokuapp.com/api");
const headers = {
  Authorization: "JWT " + localStorage.getItem("token")
};

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

  toggleEditModal = () => {
    this.setState({ modal: !this.state.modal })
  }

  toggleput = () => {
    this.setState({ modal: !this.state.modal });

    axios({
      method: "PUT",
      url: `${URL}/instructors/${this.props.data.id}/`,
      data: {
        name: this.state.name,
        license_number: this.state.license_number,
        description: this.state.description,
        photo: this.state.photo,
        ratings: this.state.ratings,
				contact_number: this.state.contact_number,
				contact_email: this.state.contact_email
			},
			
      headers: headers
    })
      .then(response => {
        console.log("put response", response);
      })
      .catch(error => {
        console.log("put error", error);
			});
			window.location.reload()
  }

  render() { 
    console.log("INSTR PROPS: ", this.props)
    return ( 
      <div>
        <div className="Instructors-container">
        <Button onClick={this.toggleEditModal}>Edit</Button>
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
      <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <div>
            <div className="Instructors-container">
              <div className="Instructor-card ">
                <input
                  className="card-name"
                  name="name"
                  onChange={this.handleChange}
                  placeholder="Instructor Name"
                />
                <input
                  className="card-number"
                  name="license_number"
                  placeholder="License Number"
                  onChange={this.handleChange}
                />
                <div className="card-img">
                  <img src={this.state.photo} />
                </div>
                <div className="card-description">
                  <div className="description-title">Descriptions/Notes</div>
                  <input
                    name="description"
                    onChange={this.handleChange}
                    placeholder="Description"
                    className="description-content"
                  >
                  </input>
                </div>
                <div className="card-rating">
                  <div className="rating-title">Ratings:</div>
                  <input name="ratings" onChange={this.handleChange} placeholder="Ratings" className="rating-details"></input>
                </div>
                <div className="card-contact">
                  <div className="contact-title">Contact</div>
                  <div className="contact-info">
                    <input onChange={this.handleChange} name="contact_email" placeholder="Contact Email" className="contact-email">
                    </input>
                    <input onChange={this.handleChange} name="contact_number" placeholder="Contact Number" className="contact-number">
                    </input>
                  </div>
                </div>
								<Button onClick={this.toggleput}>
								Save
								</Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
     );
  }
}
 
export default InstructorCard;