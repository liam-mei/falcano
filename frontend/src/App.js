import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// Stripe Stuff
import { Elements, StripeProvider } from 'react-stripe-elements';

import Auth from './components/Auhenication/Auth';
import LandingPage from './components/LandingPage';
import Aircraft from './components/Aircraft';
// import EditAircraftModal from "./components/EditAircraftModal";
// import EditFlightModal from "./components/EditFlightModal";
// import Billing from "./components/Billing";
import Flights from './components/Flights';
import Settings from './components/Settings';
//import TotalsModal from "./components/TotalsModal";
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Instructors from './components/Instructors';
import BillingForm from './billing/BillingForm';

import './App.css';
class App extends Component {
	signOut = () => {
		localStorage.removeItem('token');
		window.location.reload();
	};
	render() {
		console.log(this.props);
		return (
			<StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
				<div className="App">
					{this.props.loggedIn ? (
						<div className="Signout" onClick={this.signOut}>
							Sign Out
						</div>
					) : (
						''
					)}
					<Route exact path="/" render={(props) => <LandingPage {...props} authenticated={this.props.loggedIn} />} />
					<Route path="/signUp" component={SignUp} />
					<Route path="/signIn" component={SignIn} />
					<Route path="/aircraft" component={Aircraft} />
					<Route path="/billing" component={BillingForm} />
					<Route path="/flights" component={Flights} />
					<Route path="/settings" component={Settings} />
					<Route path="/instructors" component={Instructors} />
				</div>
			</StripeProvider>
		);
	}
}

export default Auth(App);
