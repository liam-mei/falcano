import React, { Component } from 'react';
import NavBar from '../NavBar';
import TopHeader from '../TopHeader';
import axios from 'axios';
import Auth from './../Authenication/Auth';
import './Flights.css';
import FlightCard from './FlightCard';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography";
import { Modal, ModalHeader, ModalBody, ModalFooter,
	ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem  } from "reactstrap";

const URL = 'http://127.0.0.1:8000/api/'
const headers = {
	'Authorization': 'JWT ' + localStorage.getItem('token')
}
class Flights extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dropdownButtonTitle: 'Aircraft Choice',
			aircraftChoice: [],
			dropdownOpen: false,
			flightData: [],
			openModal: false,
			name: "",
			remarks: "",
			no_instument_app: false,
			no_ldg: null,
			cross_country: null,
			pic: null,
			dual_rec: null,
			actual_instr: null,
			sim_instr: null,
			day: null,
			night: null,
			airports_visited: "",
			fly_date: null,
			snippet: "",
			aircraft: null,
			id: null,
		};
	}

	
	toggleModal = () => {
		this.setState({ openModal: !this.state.openModal })
		axios({
			method: 'GET',
			url: `${URL}aircraft/`,
			headers: headers
		}).then(response => {
			this.setState({ aircraftChoice: response.data })
			console.log("ac state", this.state.aircraftChoice)
		}).catch(err => {
			console.log(err)
		})
	}

		//TOGGLES DROPDOWN BUTTON FOR SELECTING AIRCRAFT WHEN ADDING NEW FLIGHT
		toggleDropdownButton = () => {
			this.setState({
				dropdownOpen: !this.state.dropdownOpen
			});
		}

		setID = (id) => {
			this.setState({ id: id})
			console.log("id", id)
		}

		//CHANGES TITLE OF DROPDOWN BUTTON WHEN USER SELECTS THE AIRCRAFT USED WHEN CREATING NEW FLIGHT
		handleDropDownButton = (e) => {
			this.setState({ dropdownButtonTitle: e.target.name })
		}
		
		handleInputChange = (e) => {
			this.setState({ [e.target.name]: e.target.value })
			console.log('namechange', this.state.name)
		}

	// ADD NEW FLIGHT
		toggleAndPost = (e) => {
			console.log("dropdowntitlestate", this.dropdownButtonTitle)
			let aircraftURL = "http://127.0.0.1:8000/api/aircraft/"
			for(let i=0; i<this.state.aircraftChoice.length; i++) {
				if (this.state.aircraftChoice[i].tail_number === this.state.dropdownButtonTitle) {
					aircraftURL += this.state.aircraftChoice[i].id + "/"
					console.log("id Loop", this.state.aircraftChoice[i].id )
				}
			}
			console.log('aircraftURL', aircraftURL)
			axios({
				method: 'POST',
				url: `${URL}flights/`,
				data: {
					name: this.state.name,
					remarks: this.state.remarks,
					no_instument_app: this.state.no_inst,
					no_ldg: this.state.no_ldg,
					cross_country: this.state.cc,
					pic: this.state.pic,
					dual_rec: this.state.dual_rec,
					actual_instr: this.state.actual_instr,
					sim_instr: this.state.sim_instr,
					day: this.state.day,
					night: this.state.night,
					airports_visited: this.state.airports,
					fly_date: this.state.fly_date,
					snippet: this.state.snippet,
					aircraft: aircraftURL
				},
				headers: headers,
			}).then((response) => {
				console.log('??????????', response)
			}).catch((error) => {
				console.log("put error", error)
			})
			this.setState({
				openModal: !this.state.openModal,
			});
		window.location.reload();
	};

	componentDidMount() {
		const headers = {
      'Authorization': 'JWT ' + localStorage.getItem('token')
    }
    axios({
      method: 'get',
      url: `${URL}flights/`,
      headers: headers,
    }).then((response) => {
      console.log('flights get response', response.data)
			this.setState({ flightData: response.data})
    }).catch((error) => {
      console.log("flights get error", error)
		})
	};
	render() {
		console.log("pic state", this.state.id)
		return (
			<div className="Flights">
				<TopHeader breadcrumb={[ 'flights' ]} rightLinks={[ { name: '#', value: 'View Total Hours' } ]} />
				<NavBar />
				<div className="FlightList">
				{this.state.flightData.map((flight) => {
					return <FlightCard flight={flight} key={flight.created_at}/>
				})}
				<Card onClick={this.toggle} className="NewFlightsCard-Card">
          <Typography className="card-typography" onClick={this.toggle}>
          </Typography>
          <CardContent>
						CLICK ME ---->> <button onClick={this.toggleModal}>NEW FLIGHT</button>
						<Modal isOpen={this.state.openModal} toggle={this.toggleModal}>
              <ModalHeader>
                <input className="new-flight-input-name" name="name" onChange={this.handleInputChange} placeholder="Flight Name" />
                <input className="new-flight-input-av" name="airports_visited" onChange={this.handleChange} placeholder="Airports Visited" />
              </ModalHeader>
              <ModalBody className="new-flight-snippet">
							Snippet Here
              </ModalBody>
							{/* DROP DOWN FOR SELECTING AIRCRAFT */}
							<ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdownButton}>
								<DropdownToggle caret>
									{this.state.dropdownButtonTitle}
								</DropdownToggle>
								<DropdownMenu>
									{this.state.aircraftChoice.map((aircraft) => {
										return <DropdownItem onClick={this.handleDropDownButton} name={aircraft.tail_number}>
										{aircraft.tail_number}
										</DropdownItem>	
									})}	
								</DropdownMenu>
							</ButtonDropdown>
							{/* END DROP DOWN FOR SELECTING AIRCRAFT */}
							<ModalBody>
								Remarks
							</ModalBody>
              <ModalFooter>
								Pic:<input className="new-flight-pic-input" name="pic" onChange={this.handleInputChange}></input>
                <button className="edit-button" onClick={this.toggleAndPost}>
                  Save
                </button>
              </ModalFooter>
            </Modal>
					</CardContent>
        </Card>
				</div>
			</div>
		);
	}
}

export default Auth(Flights);
