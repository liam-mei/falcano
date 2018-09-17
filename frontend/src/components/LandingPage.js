import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import axios from 'axios';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      }
  }
  componentDidMount(){
    const token = localStorage.getItem("token");
    console.log(token);
    if (token !== null) {
      this.setState({authenticated: true})
    }
  }
      render() {
        return (
            <div className="Wrapper">
            {this.state.authenticated?('welcome to Falcano'):(<div className="Card">
            <h1 className="Logo">FALCANO</h1>
            <h3 className="Slogan">Time flies</h3>
            <p className="MissionStatement">Mission statement Demand to be let outside at once, and expect owner to wait for me as i think about it human is washing you why halp oh the horror flee scratch hiss bite cry louder at reflection so swat at dog, but i can haz, so meow meow toilet paper attack claws fluff everywhere meow miao french ciao litterbox.</p>
            <Link className="LogInLink"to={"/SignIn"}>LogIn</Link>
            <Link className="SignUpLink"to={"/SignUp"}>SignUp</Link>
          </div>)}
              
            </div>
        );
      }
}

export default LandingPage;