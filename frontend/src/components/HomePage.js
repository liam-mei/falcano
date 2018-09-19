import React, { Component } from 'react';
import NavBar from './NavBar';
import axios from 'axios';
import TopHeader from './TopHeader';
class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className="HomePage">
				<TopHeader breadcrumb={[ ]} />
                <NavBar />
                <h1>Welcom to Falcano!</h1>
                <h2>Take us on your next flight</h2>
                <h3>Whether your off to the Bahamas or off to a simulated flight; you'll never struggle to keep track of your flights again. </h3>
			</div>
		);
	}
}

export default HomePage;