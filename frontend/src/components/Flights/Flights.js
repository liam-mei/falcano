import React, { Component } from 'react';
import NavBar from '../NavBar';
import TopHeader from '../TopHeader';
import axios from 'axios';
import Auth from './../Authenication/Auth';
import './Flights.css';
import FlightCard from './FlightCard';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PlusIcon from '../../utils/Images/PlusIcon.png';
import Typography from '@material-ui/core/Typography';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { CardMedia } from '@material-ui/core';
// const dev = process.env.REACT_APP_DEV === "true" ? true : false;
// let URL;
// dev ? (URL = 'http://127.0.0.1:8000/api') : (URL = 'https://flightloggercs10.herokuapp.com/api');

let URL = process.env.REACT_APP_URL;

const headers = {
  Authorization: 'JWT ' + localStorage.getItem('token')
};
class Flights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownButtonTitle: 'Aircraft Choice',
      aircraftChoice: [],
      dropdownOpen: false,
      flightData: [],
      openModal: false,
      name: '',
      remarks: '',
      no_instument_app: null,
      no_ldg: null,
      cross_country: null,
      pic: null,
      dual_rec: null,
      actual_instr: null,
      sim_instr: null,
      day: null,
      night: null,
      airports_visited: '',
      fly_date: null,
      snippet: '',
      aircraft: null,
      id: null,
      license_type: '',
      total_hours: null,
      sv_html: '',
      sv_script: '',
      errorMessage: false,
      openModalAlert: false
    };
  }
  toggleModal = () => {
    if (this.state.aircraftChoice.length <= 0) {
      this.setState({
        errorMessage: !this.state.errorMessage,
        openModalAlert: !this.state.openModalAlert
      });
    } else {
      this.setState({ openModal: !this.state.openModal });
    }
  };
  //TOGGLES DROPDOWN BUTTON FOR SELECTING AIRCRAFT WHEN ADDING NEW FLIGHT
  toggleDropdownButton = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };
  handleSnippet = (e) => {
    let html = e.target.value;
    html = html.split('200px; height: 200px;').join('100%; height: 165px;');
    let arr = html.split('</div>');
    let sv_html = arr[0] + '</div>';
    let sv_script = arr[1];
    // console.log('SV HTML ', sv_html);
    this.setState({ sv_html: sv_html, sv_script: sv_script });
  };
  //CHANGES TITLE OF DROPDOWN BUTTON WHEN USER SELECTS THE AIRCRAFT USED WHEN CREATING NEW FLIGHT
  handleDropDownButton = (e) => {
    this.setState({ dropdownButtonTitle: e.target.name });
  };
  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    // console.log('namechange', this.state.name);
  };
  // ADD NEW FLIGHT
  toggleAndPost = (e) => {
    // console.log('dropdowntitlestate', this.dropdownButtonTitle);
    if (this.state.dropdownButtonTitle === 'Aircraft Choice') {
      alert('Please Select The Aircraft You Flew With');
      return;
    }
    let aircraftURL = `${URL}api/aircraft/`;
    let licensetype;
    for (let i = 0; i < this.state.aircraftChoice.length; i++) {
      if (
        this.state.aircraftChoice[i].tail_number ===
        this.state.dropdownButtonTitle
      ) {
        aircraftURL += this.state.aircraftChoice[i].id + '/';
        licensetype = this.state.aircraftChoice[i].license_type;
        // console.log('flightlic', this.state.aircraftChoice[i].license_type);
      }
      this.setState({ license_type: licensetype });
      //   console.log('flightlicstate', this.state.license_type);
    }
    axios({
      method: 'POST',
      url: `${URL}api/flights/`,
      data: {
        name: this.state.name,
        remarks: this.state.remarks,
        no_instument_app: this.state.no_instument_app,
        no_ldg: this.state.no_ldg,
        cross_country: this.state.cross_country,
        pic: this.state.pic,
        dual_rec: this.state.dual_rec,
        actual_instr: this.state.actual_instr,
        sim_instr: this.state.sim_instr,
        day: this.state.day,
        night: this.state.night,
        airports_visited: this.state.airports_visited,
        fly_date: this.state.fly_date,
        snippet: this.state.snippet,
        aircraft: aircraftURL,
        license_type: licensetype,
        total_hours: this.state.total_hours,
        sv_html: this.state.sv_html,
        sv_script: this.state.sv_script
      },
      headers: headers
    })
      .then((response) => {
        // console.log('??????????', response);
      })
      .catch((error) => {
        console.log('put error', error);
      });
    this.setState({
      openModal: !this.state.openModal
    });
    window.location.reload();
  };
  componentDidMount() {
    const headers = {
      Authorization: 'JWT ' + localStorage.getItem('token')
    };
    axios({
      method: 'GET',
      url: `${URL}api/aircraft/`,
      headers: headers
    })
      .then((response) => {
        this.setState({ aircraftChoice: response.data });
        // console.log('ac state', this.state.aircraftChoice);
      })
      .catch((err) => {
        this.props.history.push('/');
        console.log(err);
      });
    axios({
      method: 'get',
      url: `${URL}api/flights/`,
      headers: headers
    })
      .then((response) => {
        // console.log('====D flights get response', response.data);
        this.setState({ flightData: response.data });
      })
      .catch((error) => {
        console.log('flights get error', error);
      });
  }
  render() {
    // console.log('FLIGHTS PROPS', this.props);
    // console.log('E TARGET VALUE ', this.state.sv_html);
    return (
      <div className="Flights">
        <TopHeader
          breadcrumb={['flights']}
          data={this.state.flightData}
          displayTotal={true}
        />
        <NavBar />
        <div className="FlightList">
          <Card
            onClick={this.toggleModal}
            className="Flights-NewCard"
            style={{
              boxShadow: this.state.openModal ? 'inset 1px 1px 1px gray' : '',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '370px'
            }}
          >
            <Modal toggle={this.toggleModal} isOpen={this.state.openModalAlert}>
              <ModalHeader>
                {this.state.errorMessage
                  ? 'Please create an aircraft first'
                  : ''}
              </ModalHeader>
            </Modal>
            <CardContent>
              {/* CLICK ME ---->> <button onClick={this.toggleModal}>NEW FLIGHT</button> */}
              <CardMedia
                onClick={this.toggleModal}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <i
                  class="fa fa-plus-circle Plus-sign"
                  onClick={this.toggleModal}
                />
              </CardMedia>
            </CardContent>
          </Card>
          {this.state.flightData.map((flight) => {
            return (
              <FlightCard
                aircraftChoice={this.state.aircraftChoice}
                flight={flight}
                key={flight.created_at}
              />
            );
          })}
          <Modal isOpen={this.state.openModal} toggle={this.toggleModal}>
            <Card onClick={this.toggle} className="NewFlightsCard-Card">
              <Typography className="card-typography" onClick={this.toggle} />
              <ModalHeader>
                <input
                  className="new-flight-input-name"
                  name="name"
                  onChange={this.handleInputChange}
                  placeholder="Flight Name"
                />
                <input
                  className="new-flight-input-av"
                  name="airports_visited"
                  onChange={this.handleInputChange}
                  placeholder="Airports Visited"
                />
                <input
                  className="new-flight-input-av"
                  name="fly_date"
                  onChange={this.handleInputChange}
                  type="date"
                />
              </ModalHeader>
              <ModalBody className="new-flight-snippet">
                <textarea
                  rows="4"
                  cols="50"
                  name="html-snippet"
                  form="usrform"
                  onChange={this.handleSnippet}
                  placeholder="Paste your HTML Snippet Here"
                />
              </ModalBody>
              {/* DROP DOWN FOR SELECTING AIRCRAFT */}
              <ButtonDropdown
                isOpen={this.state.dropdownOpen}
                toggle={this.toggleDropdownButton}
              >
                <DropdownToggle caret>
                  {this.state.dropdownButtonTitle}
                </DropdownToggle>
                <DropdownMenu>
                  {this.state.aircraftChoice.map((aircraft) => {
                    return (
                      <DropdownItem
                        onClick={this.handleDropDownButton}
                        name={aircraft.tail_number}
                        key={aircraft.id}
                      >
                        {aircraft.tail_number}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </ButtonDropdown>
              {/* END DROP DOWN FOR SELECTING AIRCRAFT */}
              <ModalBody>
                <textarea
                  placeholder="Remarks, Procedures, Maneuvers"
                  name="remarks"
                  onChange={this.handleInputChange}
                  rows="4"
                  cols="50"
                />
              </ModalBody>
              <ModalFooter>
                <div>
                  <div>
                    Pic
                    <input
                      className="new-flight-pic-input"
                      name="pic"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div>
                    Cross Country
                    <input
                      className="new-flight-pic-input"
                      name="cross_country"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div>
                    No Instr app.
                    <input
                      className="new-flight-pic-input"
                      name="no_instument_app"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div>
                    No. Ldg.
                    <input
                      className="new-flight-pic-input"
                      name="no_ldg"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div>
                    Day
                    <input
                      className="new-flight-pic-input"
                      name="day"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div>
                    Night
                    <input
                      className="new-flight-pic-input"
                      name="night"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div>
                    Actual Instr.
                    <input
                      className="new-flight-pic-input"
                      name="actual_instr"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div>
                    Sim. Instr.
                    <input
                      className="new-flight-pic-input"
                      name="sim_instr"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div>
                    Dual Rec.
                    <input
                      className="new-flight-pic-input"
                      name="dual_rec"
                      onChange={this.handleInputChange}
                    />
                  </div>
                  <div>
                    Total
                    <input
                      className="new-flight-pic-input"
                      name="total_hours"
                      onChange={this.handleInputChange}
                    />
                    <button
                      className="edit-button"
                      onClick={this.toggleAndPost}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </ModalFooter>
            </Card>
          </Modal>
        </div>
      </div>
    );
  }
}
export default Auth(Flights);
