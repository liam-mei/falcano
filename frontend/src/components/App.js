import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
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
	/*
	state = {
		authenticated: false,
	};

	componentDidMount() {
		let token = localStorage.getItem('token')

			axios({
				method: 'POST',
				url: URL,
				data: {
					"token": token
				}
				}).then((response) => {
				console.log("auth response ", response)
					this.setState({ authenticated: true })
				}).catch(err => {
					console.log(err)
					// window.location.replace('http://localhost:3000/');
				})
	}
	*/
	render() {
		return (
			<div className="App">
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
