import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignUp from "./SignUp";
import SignIn from "./SignIn"
class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      }
  }
  render() { 
    return ( 
      <div>
      <Link to={"/SignUp"}>Sign Up</Link>
      < br />
      <Link to={"/SignIn"}>Sign In</Link>
        <h1>Flight Plan</h1>
        <img src="https://t3.ftcdn.net/jpg/01/95/58/96/500_F_195589622_jSP9kxu6jUHndWRpPf62pVs24smSNZxx.jpg"></img>

        <p>
          Some interesting things
        </p>
        <p>
          Mission statement

        </p>
      </div>
     );
  }
}
 
export default LandingPage;