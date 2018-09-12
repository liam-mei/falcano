import React, { Component } from 'react';
import axios from "axios";
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div>
        <form> 
          <input placeholder="email">
          </input>
          <input placeholder="password">
          </input>
        </form>
      </div>
     );
  }
}
 
export default SignIn;