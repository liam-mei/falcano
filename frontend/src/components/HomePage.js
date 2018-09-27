import React, { Component } from 'react';

import NavBar from './NavBar';
import TopHeader from './TopHeader';

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
					<h1>Falcano Logo</h1>
					<h2>Fly with ease, take us on your next flight.</h2>
				</div>
			</div>
		);
	}
}

export default HomePage;
