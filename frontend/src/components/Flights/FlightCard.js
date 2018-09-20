import React, { Component } from 'react';
import './FlightCard.css';

class FlightCard extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
        <div className="FlightCard">
            <h3>Crosscountry Solo</h3>
            <p>KGAI-KLNS-KGAI</p>
            <p>N911AT</p>
            <img src="//unsplash.it/250px/150px" className="FlightCard-Image"/>
            <div className="FLightCard-Hours-Date">
                <span>3-17-18</span>
                <span>1.6 hrs</span>
            </div>
        </div>
		);
	}
}

export default FlightCard;