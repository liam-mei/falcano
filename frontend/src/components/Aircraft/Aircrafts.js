import axios from 'axios';
import React, { Component } from 'react';
import AircraftCard from './AircraftCard';
import NavBar from '../NavBar';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CardMedia from "@material-ui/core/CardMedia";
import "./AircraftCard.css";
import Dropzone from 'react-dropzone';

import TopHeader from '../TopHeader';

import Auth from './../Auhenication/Auth';

import './Aircrafts.css';

// change dev to false if you want axios to get request from heroku server
// set dev to true if you want to work on local machine
let dev = true;
// let URL = (dev
//   ? "http://127.0.0.1:8000/api"
//   : "https://flightloggercs10.herokuapp.com/api" );
let URL = 'http://127.0.0.1:8000/api';

class Aircrafts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			token: '',
			name: '',
			content: '',
			openModal: false,
			data: [
				{
					id: '',
					man_type: '',
					tail_number: '',
					license_type: '',
				},
			],
		};
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
		console.log('statechange', this.state.license_type_edit);
	};

	toggleModal = (e) => {
		this.setState({ openModal: !this.state.openModal });
	};
	toggleAndPost = (e) => {
		this.setState({
			openModal: !this.state.openModal,
		});
		const headers = {
			Authorization: 'JWT ' + localStorage.getItem('token'),
		};
		axios({
			method: 'POST',
			url: `${URL}/aircraft/`,
			data: {
				man_type: this.state.man_type_edit,
				tail_number: this.state.tail_number_edit,
				license_type: this.state.license_type_edit,
				id: this.state.id,
			},
			headers: headers,
		})
			.then((response) => {
				console.log('put response', response);
			})
			.catch((error) => {
				console.log('put error', error);
			});
		window.location.reload();
	};

	componentDidMount() {
		const headers = {
			Authorization: 'JWT ' + localStorage.getItem('token'),
		};
		axios({
			method: 'GET',
			url: `${URL}/aircraft/`,
			headers: headers,
		})
			.then((response) => {
				console.log('aircraft res', response.data);
				this.setState({
					data: response.data,
				});
			})
			.catch((error) => {
				console.log('error :', error);
			});
	}

	render() {
		return (
			<div className="Aircrafts">
				<TopHeader breadcrumb={[ 'aircraft' ]} rightLinks={[ { name: '#', value: 'View Total Hours' } ]} />
				<NavBar />
				<div className="AircraftList">
					A list of aircrafts
					{this.state.data.map((plane) => {
						let id = plane.id;
						return <AircraftCard key={id} data={plane} props={this.props} />;
					})}
					<Card onClick={this.toggle} className="AircraftCard-Card">
						<Typography className="card-typography" onClick={this.toggle} />
						<CardContent>
							CLICK ME ---->> <button onClick={this.toggleModal}>NEW AIRCRAFT</button>
							<Modal isOpen={this.state.openModal} toggle={this.toggleModal}>
								<ModalHeader>
									<input
										className="new-aircraft-input-tn"
										name="tail_number_edit"
										onChange={this.handleChange}
										placeholder="Tail Number"
									/>
									<input
										className="new-aircraft-input-lt"
										name="license_type_edit"
										onChange={this.handleChange}
										placeholder="License Type"
									/>
									<input
										className="new-aircraft-input-mt"
										name="man_type_edit"
										onChange={this.handleChange}
										placeholder="Manufacturer Type"
									/>
								</ModalHeader>
								<ModalBody className="nested-modal-body">
									<Dropzone onDrop={this.handleOnDrop} multiple={false} accept="image/*">
										<div>Try dropping some files here, or click to select files to upload.</div>
									</Dropzone>
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
