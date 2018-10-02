import React, { Component } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Glyphicon
} from "reactstrap";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import "./InstructorCard.css";

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
      deleteModal: false
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
    this.setState({ deleteModal: !this.state.deleteModal });

    // this.setState({modal: !this.state.modal})
  };

  confirmDelete = () => {
    axios({
      method: "DELETE",
      url: `${URL}api/instructors/${this.props.data.id}/`,
      headers: headers
    })
      .then(response => {
        console.log(response);
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    const {
      name,
      license_number,
      description,
      photo,
      contact_number,
      contact_email,
      ratings
    } = this.props.data;
    this.setState({
      name: name,
      license_number: license_number,
      description: description,
      photo: photo,
      contact_number: contact_number,
      contact_email: contact_email,
      ratings: ratings
    });
  }

  render() {
    console.log("INSTR CARD STATE: ", this.props.data);
    return (
      <div className={""}>
        <Card className={""}>
          <CardContent>
            <Typography className={"Instructors-card-name"}>
              {this.props.data.name}
            </Typography>
            <Typography className={"Instructors-card-license-number"}>
              {this.props.data.license_number}
            </Typography>
          </CardContent>
          <CardMedia
            className="Instructors-card-img"
            onClick={this.toggle}
            component="img"
            height="250"
            image={this.props.data.photo}
            style={{ marginLeft: "auto", marginRight: "auto", width: "400px", height: '225px' }}
          />
          <CardContent>
            Description:
            <Typography className={"Instructors-card-description"}>
              {this.props.data.description}
            </Typography>
            <br />
            Ratings:
            <Typography className={"Instructors-card-ratings"}>
              {this.props.data.ratings}
            </Typography>
          </CardContent>
          <div className="Instructors-card-footer">
            <CardContent>
              Contact Info
              <Typography>{this.props.data.contact_email}</Typography>
              <Typography>{this.props.data.contact_number}</Typography>
            </CardContent>
            <div className={"button-container"}>
              <i
                class="fa fa-pencil-square-o fa-lg edit-card-button"
                aria-hidden="true"
                onClick={this.toggleEditModal}
              />
              <i
                class="fa fa-trash fa-lg delete-button"
                onClick={this.toggleDelete}
                aria-hidden="true"
              />
            </div>
          </div>
        </Card>
        {/* CONFIRM DELETE MODAL START */}
        <Modal
          className="confirm-instructor-delete"
          size="sm"
          style={{
            display: "flex",
            padding: "10px",
            height: "100px",
            width: "200px",
            textAlign: "center",
            marginTop: "20%",
            marginLeft: "50%"
          }}
          isOpen={this.state.deleteModal}
          toggle={this.toggleDelete}
        >
          <div className="confirm-delete-content">
            Confirm Delete?
            <br />
            <br />
            <Button
              color="danger"
              onClick={this.confirmDelete}
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                color: "#FFFFFF",
                width: "89px",
                borderRadius: "0"
              }}
            >
              {" "}
              Delete{" "}
            </Button>
            <Button
              onClick={this.toggleDelete}
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                color: "#FFFFFF",
                width: "89px",
                borderRadius: "0"
              }}
            >
              Cancel
            </Button>
          </div>
        </Modal>
        {/* EDIT MODAL START */}
        <Modal
          className="Instructor-edit-card-modal"
          isOpen={this.state.modal}
          toggle={this.toggleEditModal}
        >
          <div className="Instructor-edit-card">
          <h4> Edit Instructor </h4>
            <input
              className="Instructor-edit-card-name"
              name="name"
              onChange={this.handleChange}
              placeholder="Instructor Name"
              value={this.state.name}
            />
            <br />

            <input
              className="card-number"
              name="license_number"
              placeholder="License Number"
              onChange={this.handleChange}
              value={this.state.license_number}
            />
            <ModalBody className="nested-modal-instructor-edit-body">
              <br />
              <i
                class="fa fa-cloud-upload fa-lg"
                onClick={this.upload}
                aria-hidden="true"
              >
                Upload Image
              </i>
              {/* <button onClick={this.upload}>CLICK ME TO UPLOAD</button> */}
            </ModalBody>
            <br />
            <div className="card-description">
              <textarea
                name="description"
                onChange={this.handleChange}
                placeholder="Description"
                className="description-content"
                value={this.state.description}
                cols="35" 
                wrap="soft"
              />
            </div>
            <div className="card-rating">
              <input
                name="ratings"
                onChange={this.handleChange}
                placeholder="Ratings"
                className="rating-details"
                value={this.state.ratings}
              />
            </div>
            <div className="card-contact">
            <br />
                <div className="contact-info">
                <input
                  onChange={this.handleChange}
                  name="contact_email"
                  placeholder="Contact Email"
                  className="contact-email"
                  value={this.state.contact_email}
                />
                <br />
    
                <input
                  onChange={this.handleChange}
                  name="contact_number"
                  placeholder="Contact Number"
                  className="contact-number"
                  value={this.state.contact_number}
                />
              </div>
            </div>
            <Button
              className="edit-instructor-save"
              onClick={this.toggleAndPut}
            >
              Save
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default InstructorCard;
