import React, { Component } from 'react';
import NavBar from '../NavBar';
import TopHeader from '../TopHeader';
import Auth from './../Auhenication/Auth';

import './Flights.css';
class Flights extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className="Flights">
				<TopHeader breadcrumb={[ 'flights' ]} rightLinks={[ { name: '#', value: 'View Total Hours' } ]} />
				<NavBar />
				<div className="FlightList">
					this will have the flight list this will have the flight list this will have the flight list this will have
					the flight list
				</div>
			</div>
		);
	}
}

export default Auth(Flights);
