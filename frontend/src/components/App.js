import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// Stripe Stuff
//import { Elements, StripeProvider } from 'react-stripe-elements';

import Auth from './Auhenication/Auth';
import LandingPage from './LandingPage';
import HomePage from './HomePage';
import Aircrafts from './Aircraft/Aircrafts';
import Flights from './Flights/Flights';
import Settings from './User/Settings';
import SignIn from './User/SignIn';
import SignUp from './User/SignUp';
import Instructors from './User/Instructors';
import BillingForm from './Billing/BillingForm';

import './App.css';
class App extends Component {
	signOut = () => {
		localStorage.removeItem('token');
		// Todo: make redirect to landingpage
		// this.props.history.push('/');
		window.location.reload();
	};
	render() {
		console.log(this.props);
		return (
			//{/*<StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">*/}
			<div className="App">
				{this.props.loggedIn ? (
					<div className="TopBar">
						<span className="SignOut" onClick={this.signOut}>
							Signout
						</span>
					</div>
				) : (
					''
				)}
				<div className="Content">
					<Route exact path="/" render={(props) => <LandingPage {...props} authenticated={this.props.loggedIn} />} />
					<Route
						exact
						path="/home"
						render={(props) => <LandingPage {...props} authenticated={this.props.loggedIn} />}
					/>
					<Route path="/signUp" component={SignUp} />
					<Route path="/signIn" component={SignIn} />
					<Route path="/aircrafts" component={Aircrafts} />
					<Route path="/billing" component={BillingForm} />
					<Route path="/flights" component={Flights} />
					<Route path="/settings" component={Settings} />
					<Route path="/instructors" component={Instructors} />
				</div>
			</div>
			//{/* </StripeProvider > */}
		);
	}
}

export default Auth(App);
