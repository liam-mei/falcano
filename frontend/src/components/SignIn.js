import React, { Component } from "react";
import axios from "axios";
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage:"",
    };
  }

  handleChange = e => {

    this.setState({ [e.target.name]: e.target.value, errorMessage: "" });
  };

  handleSubmit = e =>
  {
    
    e.preventDefault();
    //check the username are not empty
    if ( !this.state.username )
    {
      this.setState({ errorMessage: "Please enter a username" });
      return
    }

    //check the password field is not empty
    if ( !this.state.password )
    {
      this.setState({ errorMessage: "Please enter a password" });
      return 
    }
      // ready to sign in
      const user={
        username: this.state.username,
        password: this.state.password
      }
      axios.post("https://flightloggercs10.herokuapp.com/api-token-auth/", user).then(response =>{
        console.log(response.data);
        //ToDo: add to local storage
      }).catch(err => {
        console.log(err);
      })
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.handleChange}
            value={this.state.username}
            name="username"
            type="text"
            className="form-control"
            placeholder="Username"
          />

          <input
            onChange={this.handleChange}
            value={this.state.password}
            name="password"
            type="password"
            className="form-control"
            placeholder="password"
          />

          <button>Sign In</button>
          <div style={{color: "red"}}>
            {(this.state.errorMessage) ? this.state.errorMessage:""}
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;