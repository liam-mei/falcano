import React, { Component } from 'react';
import './FlightCard.css';
import axios from "axios";
import Parser from 'html-react-parser';
import {Helmet} from 'react-helmet';
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// let URL = this.props.flight.aircraft
const dev = true;
	let URL
	(dev ? URL = "http://127.0.0.1:8000/api/"
        : URL = "https://flightloggercs10.herokuapp.com/api");

const headers = {
    'Authorization': 'JWT ' + localStorage.getItem('token')
}

class FlightCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
            aircraft: [],
            flight: [],
            openModal: false,
        };
    }
    modalToggle = () => {
        // axios({
        //     method: 'GET',
        //     url: URL,
        //     headers: headers
        // }).then
        this.setState({ openModal: !this.state.openModal })
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
              this.setState({ flight: this.props.flight })
          };

          handleToggle = () => {
              this.setState({ openModal: !this.state.openModal })
          }

	render() {
        console.log("this.props.flight CARD:", this.state.flight)
		return (
        <div className="FlightCard" onClick={this.modalToggle}>
            <h3>{this.props.flight.name}</h3>
            <p>{this.props.flight.airports_visited}</p>
            <p>{this.state.aircraft.tail_number}</p>
            {Parser(this.props.flight.sv_html)}
            <Helmet>
                {Parser(this.props.flight.sv_script)}
            </Helmet>
            <div className="FLightCard-Hours-Date">
                <span>{this.props.flight.fly_date}</span>
                <span>{this.props.flight.total_hours}</span>
            </div>
            <Modal props={this.props.flight} isOpen={this.state.openModal} toggle={this.modalToggle}>
                <ModalHeader>
                    <h4>
                    {this.props.flight.name}
                    {this.props.flight.fly_date}
                    </h4>   
                    <h4>
                    {this.props.flight.airports_visited}
                    </h4>
                </ModalHeader>
                <ModalBody>
                </ModalBody>

            </Modal>
                
        </div>
		);
	}
}

export default FlightCard;