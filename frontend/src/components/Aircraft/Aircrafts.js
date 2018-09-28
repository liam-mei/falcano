import axios from 'axios';
import React, { Component } from 'react';
import AircraftCard from './AircraftCard';
import NavBar from '../NavBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ButtonDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';
import CardMedia from '@material-ui/core/CardMedia';
import './AircraftCard.css';
import Dropzone from 'react-dropzone';

import TopHeader from '../TopHeader';

import Auth from './../Authenication/Auth';

import './Aircrafts.css';

// change dev to false if you want axios to get request from heroku server
// set dev to true if you want to work on local machine
let dev = true;

let URL;
dev ? (URL = 'http://127.0.0.1:8000/api') : (URL = 'https://flightloggercs10.herokuapp.com/api');

class Aircrafts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			token: '',
			name: '',
			content: '',
			openModal: false,
			dropdownOpen: false,
			dropdownButtonTitle: 'Airplane SEL',
			tail_number_edit: '',
			man_type_edit: '',
			license_type_edit: 'Airplane SEL',
			uploadurl: 'http://res.cloudinary.com/dkzzjjjj9/image/upload/v1538078252/rurz4wt0ngzacnfz06io.jpg',
			data: [
				{
					id: '',
					man_type: '',
					tail_number: '',
					license_type: '',
					uploadurl: '',
				},
			],
		};
	}


  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    // console.log("statechange", this.state.license_type_edit);
  };

  toggleModal = e => {
    this.setState({ openModal: !this.state.openModal });
  };
  toggleAndPost = e => {
    // console.log("+++++++ this.state.uploadurl ++++++: ", this.state.uploadurl)
    // this.state.uploadurl ? this.setState({uploadurl: 'http://res.cloudinary.com/dkzzjjjj9/image/upload/v1538078252/rurz4wt0ngzacnfz06io.jpg'}) : undefined
    // console.log("+++++++ this.state.uploadurl2 ======== ", this.state.uploadurl)
    this.setState({
      openModal: !this.state.openModal
    });
    const headers = {
      Authorization: "JWT " + localStorage.getItem("token")
    };
    axios({
      method: "POST",
      url: `${URL}/aircraft/`,
      data: {
        man_type: this.state.man_type_edit,
        tail_number: this.state.tail_number_edit,
        license_type: this.state.license_type_edit,
        id: this.state.id,
        photo: this.state.uploadurl
      },
      headers: headers
    })
      .then(response => {
        // console.log("put response", response);
      })
      .catch(error => {
        console.log("put error", error);
      });
    window.location.reload();
  };


	handleDropDownButton = (e) => {
		this.setState({ dropdownButtonTitle: e.target.name, license_type_edit: e.target.name });
	};

	toggleDropdownButton = () => {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen,
		});
	};

  componentDidMount() {
    // console.log("URL", URL);
    const headers = {
      Authorization: "JWT " + localStorage.getItem("token")
    };
    axios({
      method: "GET",
      url: `${URL}/aircraft/`,
      headers: headers
    })
      .then(response => {
        // console.log("aircraft res", response.data);
        this.setState({
          data: response.data
        });
      })
      .catch(error => {
        console.log("error :", error);
        this.props.history.push("/");
      });
  }
  upload = () => {
    // this.setState({ uploadurl: 'http://res.cloudinary.com/dkzzjjjj9/image/upload/v1538078252/rurz4wt0ngzacnfz06io.jpg' })
    window.cloudinary.openUploadWidget(
      { cloud_name: "dkzzjjjj9", upload_preset: "ggbmyqmo" },

      (error, result) => {
        // console.log(error, result);
        let imgurl;
        (result ? imgurl = result[0].url : imgurl = `http://res.cloudinary.com/dkzzjjjj9/image/upload/v1538078252/rurz4wt0ngzacnfz06io.jpg` )
        this.setState({ uploadurl: imgurl });
        // console.log("===== stateurl: ", this.state.uploadurl);
      }
    ),
      false;
  };

  render() {
    // console.log("PROPS AIRCRAFT", this.props);
    return (
      <div className="Aircrafts">
        <TopHeader
          breadcrumb={["aircraft"]}
          rightLinks={[{ name: "#", value: "View Total Hours" }]}
        />
        <NavBar />
        <div className="AircraftList">
          {this.state.data.map(plane => {
            let id = plane.id;
            return <AircraftCard key={id} data={plane} props={this.props} />;
          })}
          <Card onClick={this.toggle} className="AircraftCard-Card">
            <Typography className="card-typography" onClick={this.toggle} />
            <CardContent>
              CLICK ME ---->>{" "}
              <button onClick={this.toggleModal}>NEW AIRCRAFT</button>
              <Modal isOpen={this.state.openModal} toggle={this.toggleModal}>
                <ModalHeader>
                  <input
                    className="new-aircraft-input-tn"
                    name="tail_number_edit"
                    onChange={this.handleChange}
                    placeholder="Tail Number"
                  />
                  {/* <input

                    className="new-aircraft-input-lt"
                    name="license_type_edit"
                    onChange={this.handleChange}
                    placeholder="License Type"
									/> */}
									<ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdownButton}>
										<DropdownToggle caret>{this.state.dropdownButtonTitle}</DropdownToggle>
										<DropdownMenu>
											<DropdownItem name="Airplane SEL" onClick={this.handleDropDownButton}>
												Airplane SEL
											</DropdownItem>
											<DropdownItem name="Airplane SES" onClick={this.handleDropDownButton}>
												Airplane SES
											</DropdownItem>
											<DropdownItem name="Airplane MEL" onClick={this.handleDropDownButton}>
												Airplane MEL
											</DropdownItem>
											<DropdownItem name="Airplane MES" onClick={this.handleDropDownButton}>
												Airplane MES
											</DropdownItem>
										</DropdownMenu>
									</ButtonDropdown>
									<input
										className="new-aircraft-input-mt"
										name="man_type_edit"
										onChange={this.handleChange}
										placeholder="Manufacturer Type"
									/>
								</ModalHeader>
								<ModalBody className="nested-modal-body">
									<button onClick={this.upload}>CLICK ME TO UPLOAD</button>
								</ModalBody>
								<ModalFooter>
									{/* CLOSE NESTED */}
									<button className="edit-button" onClick={this.toggleAndPost}>
										Save
									</button>
								</ModalFooter>
							</Modal>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}
}

export default Auth(Aircrafts);
