import React, { Component } from 'react';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      email: "",
      password: "",
    }
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
 
export default SignUp;