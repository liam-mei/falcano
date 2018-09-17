import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './components/LandingPage.css';

import LandingPage from './components/LandingPage';
import { Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import Aircraft from './components/Aircraft';
import EditAircraftModal from './components/EditAircraftModal';
import EditFlightModal from './components/EditFlightModal';
import Billing from './components/Billing';
import Flights from './components/Flights';
import Settings from './components/Settings';
import TotalsModal from './components/TotalsModal';
import SignIn from './components/SignIn';
import Instructors from './components/Instructors';



// Stripe Stuff
import { Elements, StripeProvider } from 'react-stripe-elements';
import BillingForm from './billing/BillingForm';

class App extends Component {
  state = { authenticated: false };

  componentDidMount() {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token !== null) {
      this.setState({ authenticated: true });
    }
  }

  signOut = () => {
    localStorage.removeItem("token");
    this.setState({
      authenticated: true
    } );
    window.location.reload();
    console.log("Signout");
  };
  render() {
    return (
      <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
        <div className="App">
          <div className="Signout" onClick={this.signOut}>
            Sign Out
          </div>
          <Route exact path="/" component={LandingPage} />

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

export default App;
