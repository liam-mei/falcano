import axios from "axios";
import React, { Component } from "react";
import Billing from "./Billing";
import NavBar from "./NavBar";
import TopHeader from './TopHeader';

class Flights extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div>
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