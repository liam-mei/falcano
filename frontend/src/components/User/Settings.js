import React, { Component } from 'react';
import axios from 'axios';
import NavBar from '../NavBar';
import TopHeader from '../TopHeader';

import Auth from './../Auhenication/Auth';

import './Settings.css';
class Settings extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className="Settings">
				{/*remove total hours from line 13*/}
				<TopHeader breadcrumb={[ 'settings' ]} />
				<NavBar />

				<div className="Settings-Form">
					<form>
						<div className="NameText">
							<label className="NameBox"> Name</label>
							<input className="NameType" type="text" />
						</div>

						<div className="OldPassWord">
							<label className="PasswordBox">Old Password</label>
							<input className="OldPasswordType" type="text" />
						</div>

						<div className="NewPassWord">
							<label className="NewPasswordBox">New Password</label>
							<input className="NewPasswordType" type="text" />
						</div>

						<div className="Save">
							<div className="SaveDiv">
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
