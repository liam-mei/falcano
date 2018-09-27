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

const dev = true;
let URL;
dev
  ? (URL = "http://127.0.0.1:8000/api/passwordchange/")
  : (URL = "https://flightloggercs10.herokuapp.com/api/passwordchange/");

class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {
			oldPassword: '',
			newPassword: '',
			confirmnewpassword: '',
			errorMessage: '',
		};
	}

	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	changePassword = (e) => {
		
		if (this.state.newPassword !== this.state.confirmnewpassword) {
			e.preventDefault();
			this.setState({ errorMessage: 'The passwords do not match' });
			
		}else {
			
			axios({
				method: 'PUT',
				url: URL,
				data: {
					old_password: this.state.oldPassword,
					new_password: this.state.newPassword
				},
				headers: headers
			}).then(res => {
				console.log("res", res)
			}).catch(err => {
				if(err) {
					alert("Old password is wrong!")
				}
				console.log("ERRRORRRRRRRR", err.status)
			})
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
						<div className="OldPassWord">
							<label className="PasswordBox">Current Password</label>
							<input name="oldPassword" className="OldPasswordType" type="text" onChange={this.handleChange}/>
						</div>

					<div className="danger">{this.state.errorMessage ? this.state.errorMessage : ''}</div>
						<br />
						<div className="NewPassWord">
							<label className="NewPasswordBox">New Password</label>
							<input name="newPassword" className="NewPasswordType" type="text" onChange={this.handleChange}/>
						</div>
						<div className="NewPassWord">
							<label className="NewPasswordBox">Confirm New Password</label>
							<input name="confirmnewpassword" className="NewPasswordType" type="text" onChange={this.handleChange}/>
						</div>
						<div className="Save">
							<div className="SaveDiv" onClick={this.changePassword}>
								<button>save</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default Auth(Settings);
