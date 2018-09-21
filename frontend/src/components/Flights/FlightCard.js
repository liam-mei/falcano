import React, { Component } from 'react';
import './FlightCard.css';
import axios from 'axios';
// let URL = this.props.flight.aircraft
class FlightCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
            aircraft: [],
        };
    }
    
    componentDidMount() {
        const headers = {
            'Authorization': 'JWT ' + localStorage.getItem('token')
          }
          axios({
            method: 'get',
            url: `${this.props.flight.aircraft}`,
            headers: headers,
          }).then((response) => {
            console.log('flights ac response', response)
                  this.setState({ aircraft: response.data})
          }).catch((error) => {
            console.log("flights ac error", error)
              })
          };

	render() {
		return (
        <div className="FlightCard">
            <h3>{this.props.flight.name}</h3>
            <p>{this.props.flight.airports_visited}</p>
            <p>{this.state.aircraft.tail_number}</p>
            <img src={this.state.aircraft.photo} className="FlightCard-Image"/>
            <div className="FLightCard-Hours-Date">
                <span>{this.props.flight.fly_date}</span>
                <span>1.6 hrs</span>
            </div>
        </div>
		);
	}
}

export default FlightCard;