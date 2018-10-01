import React, { Component } from 'react';
import Flights from './Flights/Flights';
import './TopHeader.css';
import LandingPage from './LandingPage';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ButtonDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';
import axios from 'axios';

/*
const Total = (props) => {
  return <Modal toggle={this.toggleModal} isOpen={this.state.openModal}>
    Airplane SEL Hours:
						{this.state.sel}
    <br />
    Airplane MEL Hours :{this.state.mel}
    <br />
    Airplane SES Hours :{this.state.ses}
    <br />
    Airplane MES Hours :{this.state.mes}
    <br />
    Cross Country: {this.state.cross_country}
    <br />
    No. Instr. App. : {this.state.no_instument_app}
    <br />
    No. Ldg. : {this.state.no_ldg}
    <br />
    day: {this.state.day}
    <br />
    night: {this.state.night}
    <br />
    actual: {this.state.actual_instr}
    <br />
    sim: {this.state.sim_instr}
    <br />
    pic: {this.state.pic}
    <br />
    dual rec: {this.state.dual_rec}
    <br />
    Total Hours: {this.state.total}
  </Modal>
} 
*/

// Decide whether to use local or production urls for both front and back end
// const [ FRONT_URL_DEV, BACK_URL_DEV ] = [ true, true ];
let dev = process.env.DEV;
let URL;
dev ? (URL = 'http://127.0.0.1:8000/api') : (URL = 'https://flightloggercs10.herokuapp.com/api');

const headers = {
	Authorization: 'JWT ' + localStorage.getItem('token'),
};

// logic for totals modal
// get ALL flights for user
// sort against license type
// add day and night and set state for total per license type
// loop through

class TopHeader extends Component {
	state = {
		authenticated: false,
		displayTotal: false,
		breadcrumb: [],
		rightLinks: [],
		flightList: [],
		openModal: false,
		sel: 0,
		mel: 0,
		ses: 0,
		mes: 0,
		SELTotals: 0,
		MELTotals: 0,
		SESTotals: 0,
		MESTotals: 0,
		cross_country: 0,
		no_instument_app: 0,
		no_ldg: 0,
		day: 0,
		night: 0,
		actual_instr: 0,
		sim_instr: 0,
		pic: 0,
		dual_rec: 0,
		total: 0,
	};
	toggleModal = () => {
		let [
			SELtotal,
			MELtotal,
			SEStotal,
			MEStotal,
			cross_country_total,
			no_instrument_app_total,
			no_ldg_total,
			dayTotal,
			nightTotal,
			actualTotal,
			simTotal,
			picTotal,
			totalhrs,
			recTotal,
		] = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
		let agg = true;
		while (agg === true) {
			// console.log("====== pp======: ", this.state.flightList)
			for (let i = 0; i < this.state.flightList.length; i++) {
				console.log('====== ith license type======: ', this.state.flightList[i].license_type);
				if (this.state.flightList[i].license_type === 'Airplane SEL') {
					SELtotal += this.state.flightList[i].total_hours;
					this.setState({ sel: SELtotal });
				} else if (this.state.flightList[i].license_type === 'Airplane MEL') {
					MELtotal += this.state.flightList[i].total_hours;
					this.setState({ mel: MELtotal });
				} else if (this.state.flightList[i].license_type === 'Airplane SES') {
					SEStotal += this.state.flightList[i].total_hours;
					this.setState({ ses: SEStotal });
				} else if (this.state.flightList[i].license_type === 'Airplane MES') {
					MEStotal += this.state.flightList[i].total_hours;
					this.setState({ mes: MEStotal });
				}
				// console.log("************ STATE SES***************", this.state.ses)
				// console.log("======SESESES====", SEStotal)
				cross_country_total += this.state.flightList[i].cross_country;
				no_instrument_app_total += this.state.flightList[i].no_instument_app;
				no_ldg_total += this.state.flightList[i].no_ldg;
				dayTotal += this.state.flightList[i].day;
				nightTotal += this.state.flightList[i].night;
				actualTotal += this.state.flightList[i].actual_instr;
				simTotal += this.state.flightList[i].sim_instr;
				picTotal += this.state.flightList[i].pic;
				recTotal += this.state.flightList[i].dual_rec;
				totalhrs += this.state.flightList[i].total_hours;
			}
			this.setState({
				day: Math.round(dayTotal * 10) / 10,
				night: Math.round(nightTotal * 10) / 10,
				actual_instr: Math.round(actualTotal * 10) / 10,
				sim_instr: Math.round(simTotal * 10) / 10,
				pic: Math.round(picTotal * 10) / 10,
				dual_rec: Math.round(recTotal * 10) / 10,
				total: Math.round(totalhrs * 10) / 10,
				cross_country: Math.round(cross_country_total * 10) / 10,
				no_instument_app: Math.round(no_instrument_app_total * 10) / 10,
				no_ldg: Math.round(no_ldg_total * 10) / 10,
			});
			agg = false;
		}
		if (agg === false) {
			this.setState({ openModal: !this.state.openModal });
		}
	};

	componentDidMount() {
		axios({
			method: 'GET',
			url: `${URL}/flights/`,
			headers: headers,
		})
			.then((response) => {
				this.setState({ flightList: response.data });
			})
			.catch((err) => {
				console.log(err);
			});
		if (Array.isArray(this.props.breadcrumb)) {
			this.setState({ breadcrumb: this.props.breadcrumb });
		}

		if (this.props.displayTotal) {
			this.setState({ displayTotal: true });
		}
	}

	signOut = () => {
		localStorage.removeItem('token');
		window.location.replace('/');
	};
	render() {
    console.log("TOP HEADER PROPS", this.props)
		return (
			<div className="Topheader">
				<Modal toggle={this.toggleModal} isOpen={this.state.openModal}>
					Airplane SEL Hours:
					{this.state.sel}
					<br />
					Airplane MEL Hours :{this.state.mel}
					<br />
					Airplane SES Hours :{this.state.ses}
					<br />
					Airplane MES Hours :{this.state.mes}
					<br />
					Cross Country: {this.state.cross_country}
					<br />
					No. Instr. App. : {this.state.no_instument_app}
					<br />
					No. Ldg. : {this.state.no_ldg}
					<br />
					day: {this.state.day}
					<br />
					night: {this.state.night}
					<br />
					actual: {this.state.actual_instr}
					<br />
					sim: {this.state.sim_instr}
					<br />
					pic: {this.state.pic}
					<br />
					dual rec: {this.state.dual_rec}
					<br />
					Total Hours: {this.state.total}
				</Modal>
				<div className="BreadCrumb">
					<Link className="BreadCrumb-link" to={'/home'}>
						Home
					</Link>
					{this.state.breadcrumb.map((link, index) => {
						const linkTag = link.toLowerCase();
						const linkLabel = link.charAt(0).toUpperCase() + link.slice(1).toLowerCase();
						return (
							<Link key={index} className="BreadCrumb-link" to={`/${linkTag}`}>
								{linkLabel}
							</Link>
						);
					})}
				</div>
				<div className="Right">
					{this.state.displayTotal ? (
						<button className="ToTal" onClick={this.toggleModal}>
							TOTAL
						</button>
					) : (
						''
					)}

					<span className="SignOut" onClick={this.signOut}>
						Signout
					</span>
          <span>
            {this.props.username}
          </span>
				</div>
			</div>
		);
	}
}

export default TopHeader;
