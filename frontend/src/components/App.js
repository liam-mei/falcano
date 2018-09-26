import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import LandingPage from './LandingPage';
import HomePage from './HomePage';
import Aircrafts from './Aircraft/Aircrafts';
import Flights from './Flights/Flights';
import Settings from './User/Settings';
import SignIn from './User/SignIn';
import SignUp from './User/SignUp';
import Instructors from './User/Instructors';
import Billing from './Billing/Billing';

import { isLoggedIn } from '../utils/helper/helperFuncions';

import './App.css';
class App extends Component {
	state = {
		authenticated: false,
	};

	componentDidMount() {
		if (isLoggedIn()) {
			this.setState({ authenticated: true });
		} else {
			this.setState({ authenticated: false });
		}
	}
	signOut = () => {
		localStorage.removeItem('token');
		window.location.reload();
	};
	render() {
		return (
			<div className="App">
				{this.state.authenticated ? (
					<div className="TopBar">
						<span className="SignOut" onClick={this.signOut}>
							Signout
						</span>
					</div>
				) : (
					''
				)}

					<Route exact path="/" component={LandingPage} />
					<Route exact path="/home" component={HomePage} />
					<Route path="/signUp" component={SignUp} />
					<Route path="/signIn" component={SignIn} />
					<Route path="/aircrafts" component={Aircrafts} />
					<Route path="/billing" component={Billing} />
					<Route path="/flights" component={Flights} />
					<Route path="/settings" component={Settings} />
					<Route path="/instructors" component={Instructors} />
			</div>
		);
	}
}

export default App;
