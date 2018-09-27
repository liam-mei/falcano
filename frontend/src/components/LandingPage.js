import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import NavBar from './NavBar';
import TopHeader from './TopHeader';
import HomePage from './HomePage';

import './LandingPage.css';
import '../utils/Images/landingPage.svg';
import logo from '../utils/Images/Logo.svg';

class LandingPage extends Component {
	render() {
		return (
			<div className="LandingPage">
				<div className="LandingPage-card">
					<img src={logo } className="Falcano-Logo" alt="logo"/>
					<h3 className="card-slogan">Time flies</h3>
					<p className="card-mission-statement">
						Mission statement Demand to be let outside at once, and expect owner to wait for me as i think about it
						human is washing you why halp oh the horror flee scratch hiss bite cry louder at reflection so swat at dog,
						but i can haz, so meow meow toilet paper attack claws fluff everywhere meow miao french ciao litterbox.
					</p>
					<div className="card-registration">
						<Link className="registration-signin" to={'/SignIn'}>
							LogIn
						</Link>
						<Link className="registration-signup" to={'/SignUp'}>
							SignUp
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default LandingPage;
