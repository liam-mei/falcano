import axios from 'axios';
import React, { Component } from 'react';
import Billing from './Billing';
import NavBar from './NavBar';
import TopHeader from './TopHeader';

import './Billing.css';
class Flights extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className="Billings">
				{/*remove total hours from line 13*/}
				<TopHeader breadcrumb={[ 'billing' ]} />
				<NavBar />
			</div>
		);
	}
}

export default Billing;

// import React, { Component } from 'react';

// class Billing extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       cardNumber: '',

//      }
//   }
//   render() {
//     return (
//       <div>

//       </div>
//      );
//   }
// }

// export default Billing;

// import React, { Component } from 'react';

// class Billing extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       cardNumber: '',
//       month: '',
//       day: '',
//       year: '',
//       cvv: ''
//      };
//   }
//   render() {
//     return (

//     )
//   }
// }

// export default Billing;
