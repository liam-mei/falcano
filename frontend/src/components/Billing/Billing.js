import axios from 'axios';
import React, { Component } from 'react';
import BillingForm from './BillingForm';
import NavBar from '../NavBar';
import TopHeader from '../TopHeader';

import Auth from './../Auhenication/Auth';

import './Billing.css';
class Billing extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className="Billing">
				<TopHeader breadcrumb={[ 'billing' ]} />
				<NavBar />
				<div className="Billing-card">
					<BillingForm />
				</div>
			</div>
		);
	}
}

export default Auth(Billing);
