import React, { Component } from 'react';
// import axios from 'axios';
import NavBar from '../NavBar';
import TopHeader from '../TopHeader';
import axios from 'axios';
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Auth from './../Authenication/Auth';
import './Settings.css';

let headers;
// const regEx = new RegExp(`^[A-Za-z]\w{6,14}$`);

// const dev = process.env.REACT_APP_DEV === "true" ? true : false;
// let URL;
// dev
//   ? (URL = "http://127.0.0.1:8000/api/passwordchange/")
//   : (URL = "https://flightloggercs10.herokuapp.com/api/passwordchange/");

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
		this.setState({ [e.target.name]: e.target.value })
	}

	changePassword = (e) => {
		// console.log("test", regEx.test(this.state.confirmedPassword))
		e.preventDefault();
		if( this.state.newestPassword.length < 6){
			e.preventDefault();
			this.setState({ errorMessage: "Enter a password containing at least 6 characters"})
	} else 
	if (this.state.newestPassword !== this.state.confirmedPassword) {
			e.preventDefault();
			this.setState({ errorMessage: 'The passwords do not match' });
			
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
					console.log("res", res);
					localStorage.removeItem('token')
					this.props.history.push('/')
        })
        .catch(err => {
          if (err.response.status === 400) {
            this.setState({ errorMessage: "Password should contain at least 6 letters"})
          } else if (err.response.status === 422) {
						this.setState({ errorMessage: "Incorrect password"})
					}
          console.log("ERRRORRRRRRRR", err);
        });
		}
	}
		render() {
			headers = {
				Authorization: "JWT " + localStorage.getItem("token")
			};
		return (
			<div className="Settings">
				{/*remove total hours from line 13*/}
				<TopHeader breadcrumb={[ 'settings' ]} />
				<NavBar />

				<Card className="Settings-Form">
					<form onSubmit={this.changePassword}>
						<CardContent className="settings-cardcontent">
							<div className="changePassword-title">
								<h1>Change password</h1>
								<div className="currentPassword">
									<label className="currentPassword-label"><b>Current password:</b></label>
									<input name="currPassword" className="currentPassword-input" type="password" onChange={this.handleChange}></input>
								</div>
								<div className="danger">{this.state.errorMessage ? this.state.errorMessage : ''}</div>
								<div className="newPassword">
									<label className="newPassword-label"><b>New password:</b></label>
									<input name="newestPassword" type="password" className="newPassword-input" onChange={this.handleChange}></input>
								</div>
								<div className="confirmPassword">
									<label className="confirmPassword-label"><b>Confirm password:</b></label>
									<input  name="confirmedPassword" className="confirmPassword-input" type="password" onChange={this.handleChange}></input>
								</div>
								<div className="Save">
									<button className="savePass" onClick={this.changePassword}>Save changes</button>
								</div>
							</div>

						</CardContent>
			
					</form>
				</Card>
				</div>
			
		);
	}
}

export default Auth(Settings);
