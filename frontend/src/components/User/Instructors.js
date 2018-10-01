import React from "react";
import ReactDOM from "react-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";
import NavBar from "../NavBar";
import TopHeader from "../TopHeader";
import "./Instructors.css";
import InstructorCard from "./InstructorCard";
import CardMedia from "@material-ui/core/CardMedia";

const dev = true;
let URL;
dev
  ? (URL = "http://127.0.0.1:8000/api")
  : (URL = "https://flightloggercs10.herokuapp.com/api");
const headers = {
  Authorization: "JWT " + localStorage.getItem("token")
};

class Instructors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instructors: [],
      name: "",
      license_number: "",
      photo: "",
      ratings: "",
      contact_number: "",
      contact_email: "",
      description: "",
      modal: false,
      closeAll: false,
      uploadurl: ""
    };

    
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
  togglePost = () => {
    if (this.state.uploadurl === "") {
      axios({
        method: "POST",
        url: `${URL}/instructors/`,
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
        method: "POST",
        url: `${URL}/instructors/`,
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
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
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


  componentDidMount() {
    axios({
      method: "GET",
      url: `${URL}/instructors/`,
      headers: headers
    })
      .then(res => {
        this.setState({ instructors: res.data });
      })
      .catch(err => {
        console.log("ERROR :", err);
      });
  }

  render() {
    console.log("INSTR STATE", this.state.instructors);
    return (
      <div className="Instructors">
        <TopHeader breadcrumb={["settings"]} />
        <NavBar />
        {/* <div className="Instructors-container">
				<div className="Instructor-card ">
					<div className="card-name">Charles Martinez</div>
					<div className="card-number">141423523537</div>
					<div className="card-img">
						<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFVt2jtKbzaWOVWCNUPGs_Uwy0UccqHala9MU19ygYBeSmpeuk" />
					</div>
					<div className="card-description">
						<div className="description-title">Descriptions/Notes</div>
						<div className="description-content">
							Charles is one of newest memeber of Falcano Flight Services
              Instuctors Staff. He holds the following.
            </div>
					</div>
					<div className="card-ratings">
						<div className="ratings-title">Ratings:</div>
						<div className="ratings-details">CFI,CFII,MEI</div>
					</div>
					<div className="card-contact">
						<div className="contact-title">Contact</div>
						<div className="contact-info">
							<div className="contact-email">charlesM@yahoo.com</div>
							<div className="contact-number">301-123-4567</div>
						</div>
					</div>
				</div>
				<div className="Instructor-card ">
					<div className="card-name">Mary Finn</div>
					<div className="card-number">1414235235323</div>
					<div className="card-img">
						<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbTteGkDxbUM_3CuLDlWVrBAMlKxIqt0FGg86BR6fMLP4zoaW2pQ" />
					</div>
					<div className="card-description">
						<div className="description-title">Descriptions/Notes</div>
						<div className="description-content">
							Mary is one of the memebers of Falcano Flight Services Instuctors
              Staff. He holds the following.
            </div>
					</div>
					<div className="card-ratings">
						<div className="ratings-title">Ratings:</div>
						<div className="ratings-details">CFI,CFII,MEI</div>
					</div>
					<div className="card-contact">
						<div className="contact-title">Contact</div>
						<div className="contact-info">
							<div className="contact-email">MaryF@yahoo.com</div>
							<div className="contact-number">501-123-4567</div>
						</div>
					</div>
				</div> */}
        <div>
          {this.state.instructors.map(instr => {
            return (
              <InstructorCard key={instr.id} data={instr}>
                name: {instr.name}
                asas
              </InstructorCard>
            );
          })}
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
                <ModalBody className="nested-modal-body">
                
               <CardMedia
                 component="img"
                 height="auto"
                 image={this.state.photo}
                 title="Instructor"
               />
               <button onClick={this.upload}>CLICK ME TO UPLOAD</button>
             </ModalBody>
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
                <div className="card-ratings">
                  <div className="ratings-title">Ratings:</div>
                  <input name="ratings" onChange={this.handleChange} placeholder="Ratings" className="ratings-details"></input>
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
								<Button onClick={this.togglePost}>
								Save
								</Button>
              </div>
            </div>
          </div>
        </Modal>
        <div className="Instructor-card">
          <span className="Button" onClick={this.toggle}>
            +
          </span>
          {/* </div> */}
        </div>
      </div>
    );
  }
}
export default Instructors;
