import React, { Component } from 'react';

import NavBar from './NavBar';
import TopHeader from './TopHeader';

import logo from '../utils/Images/Logo.svg';
import './HomePage.css';

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className="HomePage">
				<NavBar />
				<TopHeader />
				<div className="HomePage-info">
				{/*<img src={logo } className="Falcano-Logo" alt="logo"/>*/}
					<h2>Fly with ease, take us on your next flight.</h2>
					<p>Whether you're off to the bahamas or off to a simulated flight - we've got you covered.  Track your flights with us.</p>
				</div>
			</div>
		);
	}
}

export default HomePage;
