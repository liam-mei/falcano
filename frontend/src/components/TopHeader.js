import React, { Component } from 'react';
import Flights from './Flights/Flights';
import './TopHeader.css';
import LandingPage from './LandingPage';
import { Link } from 'react-router-dom';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography";
import { Modal, ModalHeader, ModalBody, ModalFooter,
	ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem  } from "reactstrap";
import axios from 'axios';


const headers = {
	'Authorization': 'JWT ' + localStorage.getItem('token')
}

	const dev = true;
	let URL
	(dev ? URL = "http://127.0.0.1:8000/api"
		: URL = "https://flightloggercs10.herokuapp.com/api");

		// logic for totals modal
		// get ALL flights for user
		// sort against license type
		// add day and night and set state for total per license type
		// loop through

class TopHeader extends Component {
	state = {
		breadcrumb: [],
		rightLinks: [],
		flightList: [],
		openModal: false,
		sel: 0,
		mel: null,
		ses: null,
		mes: null,
		SELTotals: 0,
		MELTotals: 0,
		SESTotals: 0,
		MESTotals: 0,
		totals: {
			day: 0,
			night: 0,
			actual_instr: 0,
			sim_instr: 0,
			pic: 0,
			dual_rec: 0,
			total: 0,
		}
	};
	toggleModal = () => {
		let SELdayNight = 0;
		let MELdayNight = 0;
		let SESdayNight = 0;
		let MESdayNight = 0;
		let agg = true;
		while(agg === true) {
			axios({
				method: 'GET',
				url: `${URL}/flights/`,
				headers: headers
			}).then(response => {
				this.setState({ flightList: response.data })
				console.log("ac state", this.state.flightList)
			}).catch(err => {
				console.log(err)
			})
			for(let i = 0; i < this.state.flightList.length; i++) {
				console.log("ASDASDADDASADADASDAD")
				if(this.state.flightList[i].license_type === "Airplane SEL") {
					console.log("SELDA")
					let SELday = this.state.flightList[i].day;
					let SELnight = this.state.flightList[i].night;
					SELdayNight += (SELday + SELnight)
					this.setState({ sel: SELdayNight })
				} else if(this.state.flightList[i].license_type === "Airplane MEL") {
					let MELday = this.state.flightList[i].day;
					let MELnight = this.state.flightList[i].night;
					MELdayNight += (MELday + MELnight)
					this.setState({ mel: MELdayNight });
				}	else if(this.state.flightList[i].license_type === "Airplane SES") {
					let SESday = this.state.flightList[i].day;
					let SESnight = this.state.flightList[i].night;
					SESdayNight += (SESday + SESnight)
					this.setState({ SES: SESdayNight });
				} else if(this.state.flightList[i].license_type === "Airplane MES") {
					let MESday = this.state.flightList[i].day;
					let MESnight = this.state.flightList[i].night;
					MESdayNight += (MESday + MESnight)
					this.setState({ SES: MESdayNight });
				}
			}
			agg = false
		}
		if(agg === false){
			this.setState({ openModal: !this.state.openModal })
		}
	}
		
	componentDidMount() {
		if (Array.isArray(this.props.breadcrumb)) {
			this.setState({ breadcrumb: this.props.breadcrumb });
		}
		
		// if (Array.isArray(this.props.rightLinks)) {
		// 	this.setState({ rightLinks: this.props.rightLinks });
		// }
	}
	render() {

		return (
			<div className="Topheader">
				<div className="BreadCrumb">
					<Link className="BreadCrumb-link" to={'/home'}>
						Home
					</Link>
					<span> </span>
					{this.state.breadcrumb.map((link, index) => {
						const linkTag = link.toLowerCase();
						const linkLabel = link.charAt(0).toUpperCase() + link.slice(1).toLowerCase();
						return (
							<Link key={index} className="BreadCrumb-link" to={`/${linkTag}`}>
								> {linkLabel}
							</Link>
						);
					})}
				</div>
				<div className="Right">
					{/* {this.state.rightLinks.map((link, index) => {
						return (
							<Link key={index} className="Right-link" to={`/${link.name}`}>
								{link.value}
							</Link>
						);
					})} */}

					<button onClick={this.toggleModal}>
						TOTAL
					</button>
					<Modal toggle={this.toggleModal} isOpen={this.state.openModal}>
						{this.state.sel}
					</Modal>
				</div>
			</div>
		);
	}
}

export default TopHeader;
