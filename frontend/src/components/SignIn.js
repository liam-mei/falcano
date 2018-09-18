import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import TopHeader from './TopHeader';

import { isLoggedIn } from '../utils/helper/helperFuncions';

import './SigninSignupCss.css';
class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			errorMessage: '',
		};
	}

	componentDidMount() {
		if (isLoggedIn()) {
			this.props.history.push('/');
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
			password: this.state.password,
		};
		axios
			.post('https://flightloggercs10.herokuapp.com/token-auth/', user)
			.then((response) => {
				// set the token to local storage
				localStorage.setItem('token', response.data.token);
				this.setState({
					username: '',
					password: '',
					errorMessage: '',
				});
				this.props.history.push('/');
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	render() {
		return (
			<div className="Container">
				<TopHeader />
				<div className="Card">
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
						<div style={{ color: 'red' }}>{this.state.errorMessage ? this.state.errorMessage : ''}</div>
					</form>
					<Link style={{ alignSelf: 'flex-end' }} to={'/SignUp'}>
						SignUp
					</Link>
				</div>
			</div>
		);
	}
}

SignIn.propTypes = {
	username: PropTypes.string,
	password: PropTypes.string,
};

export default SignIn;
