import React, { Component } from 'react';
import axios from 'axios';
import NavBar from '../NavBar';
import TopHeader from '../TopHeader';
import Auth from './../Authenication/Auth';
import './Settings.css';

let headers;

let URL = process.env.REACT_APP_URL;

class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currPassword: '',
			newestPassword: '',
			confirmedPassword: '',
			errorMessage: '',
		};
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value, errorMessage: ''  })
	}

	changePassword = (e) => {
		e.preventDefault();
		if( this.state.newestPassword.length < 8){
			this.setState({ errorMessage: "Enter a password containing at least 8 characters"})
			return;
		} else if (this.state.newestPassword !== this.state.confirmedPassword) {
			this.setState({ errorMessage: 'The passwords do not match' });
			return;
		}else {
			axios({
        method: "PUT",
        url: `${URL}api/passwordchange/`,
        data: {
          old_password: this.state.currPassword,
          new_password: this.state.confirmedPassword
        },
        headers: headers
      })
        .then(res => {
					this.props.history.push('/')
        })
        .catch(err => {
          if (err.response.status === 400) {
						this.setState({ errorMessage: "Password could not be changed!"})
						return;
          } else if (err.response.status === 422) {
						this.setState({ errorMessage: "Incorrect password"})
						return;
					}
        });
		}
	}
		render() {
			headers = {
				Authorization: "JWT " + localStorage.getItem("token")
			};
		return (
			<div className="Settings">
				<TopHeader breadcrumb={[ 'settings' ]} />
				<NavBar />
				<div className="Settings-content">
					<div className="Settings-card">
						<div className="SignUp-CardText">
						Change Password
						</div>
						<form onSubmit={this.changePassword}>
							<input placeholder="Current password" name="currPassword" className="form-control" type="password" onChange={this.handleChange}></input>
							<input placeholder="New password" name="newestPassword" type="password" className="form-control" onChange={this.handleChange}></input>
							<input  placeholder="Confirm password" name="confirmedPassword" className="form-control" type="password" onChange={this.handleChange}></input>
							<button className="savePass" onClick={this.changePassword}>Save changes</button>
							<div className="danger">{this.state.errorMessage ? this.state.errorMessage : ''}</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default Auth(Settings);
