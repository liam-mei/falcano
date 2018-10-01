import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { isLoggedIn } from '../../utils/helper/helperFuncions';
import './SignIn.css';

import '../../utils/Images/logIn.svg';

const dev = true;
let URL;
dev
  ? (URL = 'http://127.0.0.1:8000')
  : (URL = 'https://flightloggercs10.herokuapp.com');
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: ''
    };
  }

  componentDidMount() {
    if (isLoggedIn()) {
      
        /*changed endpoint from '/' to '/home'*/
      
      this.props.history.push('/home');
      window.location.reload();
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, errorMessage: '' });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    //check the username are not empty
    if (!this.state.username) {
      this.setState({ errorMessage: 'Please enter a username' });
      return;
    }

    //check the password field is not empty
    if (!this.state.password) {
      this.setState({ errorMessage: 'Please enter a password' });
      return;
    }
    // ready to sign in
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    axios
      .post(`${URL}/token-auth/`, user)
      .then((response) => {
        // set the token to local storage
        localStorage.setItem('token', response.data.token);
        this.setState({
          username: '',
          password: '',
          errorMessage: ''
        });
        
          /*changed.push('/') to .push('/flights')*/
        
        this.props.history.push('/home');
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        this.setState({errorMessage: "Username or Password is Incorrect"})
      });
  };

  render() {
    return (
      <div className="SignIn">
        <div className="SignIn-Text">
          <p>Let's get ready to fly.</p>
        </div>
        <div className="SignIn-card">
          <div className="SignIn-CardText">Welcome back!</div>
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
              placeholder="Password"
            />

            <button>Sign In</button>
            <div className="danger">
              {this.state.errorMessage ? this.state.errorMessage : ''}
            </div>
          </form>
          <Link className="SignIn-right" to={'/SignUp'}>
            SignUp
          </Link>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  username: PropTypes.string,
  password: PropTypes.string
};

export default SignIn;
