import axios from 'axios';
import React, { Component } from 'react';
import AircraftCard from './AircraftCard';
import NavBar from '../NavBar';

import TopHeader from '../TopHeader';

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
				</div>
			</div>
		);
	}
}

export default Aircrafts;
