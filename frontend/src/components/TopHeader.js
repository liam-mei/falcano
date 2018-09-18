import React, { Component } from 'react';
import Flights from './Flights.js';
import './TopHeader.css';
import LandingPage from './LandingPage';
import { Link } from 'react-router-dom';

class TopHeader extends Component {
	state = {
		breadcrumb: [],
		rightLinks: [],
	};
	componentDidMount() {
		if (Array.isArray(this.props.breadcrumb)) {
			this.setState({ breadcrumb: this.props.breadcrumb });
		}

		if (Array.isArray(this.props.rightLinks)) {
			this.setState({ rightLinks: this.props.rightLinks });
		}
	}
	render() {
		return (
			<div className="TopNav">
				<div className="BreadCrumb">
					<Link className="link" to={'/'}>
						Home
					</Link>
					<span> </span>
					{this.state.breadcrumb.map((link, index) => {
						const linkTag = link.toLowerCase();
						const linkLabel = link.charAt(0).toUpperCase() + link.slice(1).toLowerCase();
						return (
							<Link key={index} className="link" to={`/${linkTag}`}>
								> {linkLabel}
							</Link>
						);
					})}
				</div>

				<div className="ViewTotal">
					{this.state.rightLinks.map((link, index) => {
						return (
							<Link key={index} className="link" to={`/${link.name}`}>
								{link.value}
							</Link>
						);
					})}
				</div>
			</div>
		);
	}
}

export default TopHeader;
