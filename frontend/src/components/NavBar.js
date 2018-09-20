import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
class NavBar extends Component {
	state = {};
	render() {
		return (
			<div className="NavBar">
				<Link className="NavBar-link" to={'/flights'}>
					Flights
				</Link>
				<br />
				<Link className="NavBar-link" to={'/aircrafts'}>
					Aircraft
				</Link>
				<br />
				<Link className="NavBar-link" to={'/instructors'}>
					Instructors
				</Link>
				<br />
				<Link className="NavBar-link" to={'/billing'}>
					Billing
				</Link>
				<br />
				<Link className="NavBar-link" to={'/settings'}>
					Settings
				</Link>
			</div>
		);
	}
}

export default NavBar;
