import React, { Component } from 'react';
import NavBar from '../NavBar';
import TopHeader from '../TopHeader';

import './Instructors.css';
class Instructors extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className="Instructors">
				{/*remove total hours from line 13*/}
				<TopHeader breadcrumb={[ 'instructors' ]} />
				<NavBar />
			</div>
		);
	}
}

export default Instructors;
