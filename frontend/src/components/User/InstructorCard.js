import React, { Component } from "react";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CardMedia from '@material-ui/core/CardMedia'
import TopHeader from "../TopHeader";

// const dev = process.env.REACT_APP_DEV === "true" ? true : false;
// let URL;
// dev
//   ? (URL = "http://127.0.0.1:8000/api")
//   : (URL = "https://flightloggercs10.herokuapp.com/api");

let URL = process.env.REACT_APP_URL;

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
      uploadurl: "",
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  toggleEditModal = () => {
    this.setState({ modal: !this.state.modal });
  };

  toggleAndPut = () => {
    if (this.state.uploadurl === "") {
      axios({
        method: "PUT",
        url: `${URL}api/instructors/${this.props.data.id}/`,
        data: {
          name: this.state.name,
          license_number: this.state.license_number,
          ratings: this.state.ratings,
          contact_email: this.state.contact_email,
          contact_number: this.state.contact_number,
          description: this.state.description,
          photo: this.state.photo
        },
        headers: headers
      })
        .then(response => {
          // console.log("put response", response);
          window.location.reload();
        })
        .catch(error => {
          console.log("put error", error);
        });

    } else {
      
      axios({
        method: "PUT",
        url: `${URL}api/instructors/${this.props.data.id}/`,
        data: {
          name: this.state.name,
          license_number: this.state.license_number,
          ratings: this.state.ratings,
          contact_email: this.state.contact_email,
          contact_number: this.state.contact_number,
          description: this.state.description,
          photo: this.state.uploadurl
        },
        headers: headers
      })
        .then(response => {
          // console.log("put response", response);
          window.location.reload();
        })
        .catch(error => {
          console.log("put error", error);
        });
    }
  };


  upload = () => {
    window.cloudinary.openUploadWidget(
      { cloud_name: "dkzzjjjj9", upload_preset: "ggbmyqmo", cors: "no-cors" },

      (error, result) => {
        // console.log(error, result);
        if (this.state.uploadurl === "") {
          let imgurl;
          result
            ? (imgurl = result[0].url)
            : (imgurl = `http://res.cloudinary.com/dkzzjjjj9/image/upload/v1538078252/rurz4wt0ngzacnfz06io.jpg`);
          this.setState({ uploadurl: imgurl });
        } else if (this.state.uploadurl !== "") {
          let imgurl;
          imgurl = this.state.uploadurl;
          this.setState({ uploadurl: imgurl });
        }
        // this.setState({ uploadurl: imgurl });
        // console.log('===== stateurl: ', this.state.uploadurl);
      }
    ),
      false;
  };

  
  toggleDelete = () => {
    axios({
      method: "DELETE",
      url: `${URL}api/instructors/${this.props.data.id}/`,
      headers: headers
  }).then(response => {
    console.log(response)
    window.location.reload()
  }).catch( err => {
    console.log(err)
  })
  // this.setState({modal: !this.state.modal})
}

  componentDidMount() {
    const {
      name,
      license_number,
      description,
      photo,
      contact_number,
      contact_email, ratings
    } = this.props.data;
    this.setState({
      name: name,
      license_number: license_number,
      description: description,
      photo: photo,
      contact_number: contact_number,
      contact_email: contact_email,
      ratings: ratings,
    });
  }

  render() {
    console.log("INSTR CARD STATE: ", this.props.data);
    return (
      <div>
        <div className="Instructors-container">
          <div className="Instructor-card ">
          <Button style={{ width: '50px'}}onClick={this.toggleEditModal}>Edit</Button>
          <button onClick={this.toggleDelete} className="edit-button">
              Delete
            </button>
          <br />
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
                <div className="contact-email">
                  {this.props.data.contact_email}
                </div>
                <div className="contact-number">
                  {this.props.data.contact_number}
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* EDIT MODAL START */}
        <Modal isOpen={this.state.modal} toggle={this.toggleEditModal}>
          <div>
            <div className="Instructors-container">
              <div className="Instructor-card ">
                <input
                  className="card-name"
                  name="name"
                  onChange={this.handleChange}
                  placeholder="Instructor Name"
                  value={this.state.name}
                />
                <input
                  className="card-number"
                  name="license_number"
                  placeholder="License Number"
                  onChange={this.handleChange}
                  value={this.state.license_number}
                />
                <ModalBody className="nested-modal-body">
                {/* <div className="card-img">
                  <img src={this.state.photo} />
                </div> */}
                <CardMedia
                  component="img"
                  height="auto"
                  image={this.state.photo}
                  title="Instructor"
                />
                <button onClick={this.upload}>CLICK ME TO UPLOAD</button>
              </ModalBody>
                <div className="card-description">
                  <div className="description-title">Descriptions/Notes</div>
                  <input
                    name="description"
                    onChange={this.handleChange}
                    placeholder="Description"
                    className="description-content"
                    value={this.state.description}
                  />
                </div>
                <div className="card-rating">
                  <div className="rating-title">Ratings:</div>
                  <input
                    name="ratings"
                    onChange={this.handleChange}
                    placeholder="Ratings"
                    className="rating-details"
                    value={this.state.ratings}
                  />
                </div>
                <div className="card-contact">
                  <div className="contact-title">Contact</div>
                  <div className="contact-info">
                    <input
                      onChange={this.handleChange}
                      name="contact_email"
                      placeholder="Contact Email"
                      className="contact-email"
                      value={this.state.contact_email}
                    />
                    <input
                      onChange={this.handleChange}
                      name="contact_number"
                      placeholder="Contact Number"
                      className="contact-number"
                      value={this.state.contact_number}
                    />
                  </div>
                </div>
                <Button onClick={this.toggleAndPut}>Save</Button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default InstructorCard;
