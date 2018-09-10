import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LandingPage from "./components/LandingPage"
import { Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Aircraft from "./components/Aircraft";
import EditAircraftModal from "./components/EditAircraftModal";
import EditFlightModal from "./components/EditFlightModal";
import Billing from "./components/Billing";
import Flights from "./components/Flights";
import Settings from "./components/Settings";
import TotalsModal from './components/TotalsModal';
import SignIn from "./components/SignIn";
import Instructors from "./components/Instructors"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={LandingPage} />
          
        <Route path="/SignUp" component={SignUp} />
        <Route path="/SignIn" component={SignIn} />
        <Route path="/Aircraft" component={Aircraft} />
        <Route path="/Billing" component={Billing} />
        <Route path="/Flights" component={Flights} />
        <Route path="/Settings" component={Settings} />
        <Route path="/Instructors" component={Instructors} />
      </div>
    );
  }
}

export default App;
