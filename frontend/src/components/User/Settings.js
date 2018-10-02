import React, { Component } from 'react';
// import axios from 'axios';
import NavBar from '../NavBar';
import TopHeader from '../TopHeader';
import axios from 'axios';

import Auth from './../Authenication/Auth';
import './Settings.css';

const headers = {
  Authorization: "JWT " + localStorage.getItem("token")
};

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
			CurrentPassword: '',
			NewPassword: '',
			ConfirmPassword: '',
			errorMessage: '',
		};
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	changePassword = (e) => {
		
		if (this.state.NewPassword !== this.state.ConfirmPassword) {
			e.preventDefault();
			this.setState({ errorMessage: 'The passwords do not match' });
			
		}else {
			
			axios({
        method: "PUT",
        url: `${URL}api/passwordchange/`,
        data: {
          old_password: this.state.CurrentPassword,
          new_password: this.state.NewPassword
        },
        headers: headers
      })
        .then(res => {
          console.log("res", res);
        })
        .catch(err => {
          if (err) {
            alert("Old password is wrong!");
          }
          console.log("ERRRORRRRRRRR", err.status);
        });
		}
	}
		render() {
		return (
			<div className="Settings">
				{/*remove total hours from line 13*/}
				<TopHeader breadcrumb={[ 'settings' ]} />
				<NavBar />

				<div className="Settings-Form">
					<form>
						<div className="App">
							<div className="ChangePassword">
								<h1>Change password:</h1>
								<div className="CurrentPassword">
									<label className="CurrentPassword"><b>Current password:</b></label>
									<input name="CurrentPassword" type="password" onChange={this.handleChange}></input>
								</div>
								<div className="danger">{this.state.errorMessage ? this.state.errorMessage : ''}</div>
								<div className="NewPassword">
									<label className="NewPassword"><b>New password:</b></label>
									<input name="NewPassword" type="password" className="NewPassword" onChange={this.handleChange}></input>
								</div>
								<div className="ConfirmPassword">
									<label className="ConfirmPassword"><b>Confirm password:</b></label>
									<input className="ConfirmPassword" name="ConfirmPassword" type="password" onChange={this.handleChange}></input>
								</div>
								<div className="Save">
									<button className="savePass" onClick={this.changePassword}>Save changes</button>
								</div>

							</div>
						</div>
			
					</form>
				</div>
				</div>
			
		);
	}
}

export default Auth(Settings);
