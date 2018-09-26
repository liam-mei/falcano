import React, { Component } from 'react';
import './FlightCard.css';
import axios from 'axios';
import Parser from 'html-react-parser';
import { Helmet } from 'react-helmet';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './FlightCard.css';
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

// let URL = this.props.flight.aircraft
const dev = true;
let URL;
dev
  ? (URL = 'http://127.0.0.1:8000/api/')
  : (URL = 'https://flightloggercs10.herokuapp.com/api');

const headers = {
  Authorization: 'JWT ' + localStorage.getItem('token')
};

class FlightCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aircraft_whatever: [],
      flight: [],
      openModal: false,

      nestedModal: false,
      closeAll: false,

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

      aircraftChoice: [],
      dropdownOpen: false,
      dropdownButtonTitle: ''
    };
  }
  modalToggle = () => {
    // axios({
    //     method: 'GET',
    //     url: URL,
    //     headers: headers
    // }).then
    this.setState({ openModal: !this.state.openModal });
  };

  nestedModalToggle = () => {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false
    });
  };

  //TOGGLES DROPDOWN BUTTON FOR SELECTING AIRCRAFT WHEN ADDING NEW FLIGHT
  toggleDropdownButton = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  //CHANGES TITLE OF DROPDOWN BUTTON WHEN USER SELECTS THE AIRCRAFT USED WHEN CREATING NEW FLIGHT
  handleDropDownButton = (e) => {
    this.setState({ dropdownButtonTitle: e.target.name });
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    const headers = {
      Authorization: 'JWT ' + localStorage.getItem('token')
    };
    axios({
      method: 'get',
      url: `${this.props.flight.aircraft}`,
      headers: headers
    })
      .then((response) => {
        // console.log('flights ac response', response);
        this.setState({ aircraft_whatever: response.data, 
            dropdownButtonTitle: response.data.tail_number
        });
      })
      .catch((error) => {
        console.log('flights ac error', error);
      });
    this.setState({

      aircraftChoice: this.props.aircraftChoice,
      name: this.props.flight.name,
      remarks: this.props.flight.remarks,
      no_instument_app: this.props.flight.no_instument_app,
      no_ldg: this.props.flight.no_ldg,
      cross_country: this.props.flight.cross_country,
      pic: this.props.flight.pic,
      dual_rec: this.props.flight.dual_rec,
      actual_instr: this.props.flight.actual_instr,
      sim_instr: this.props.flight.sim_instr,
      day: this.props.flight.day,
      night: this.props.flight.night,
      airports_visited: this.props.flight.airports_visited,
      fly_date: this.props.flight.fly_date,
      snippet: this.props.flight.snippet,
      aircraft: this.props.flight.aircraft,
      id: this.props.flight.id,
      license_type: this.props.flight.license_type,
      total_hours: this.props.flight.total_hours,
      sv_html: this.props.flight.sv_html,
      sv_script: this.props.flight.sv_script,

    });
  }

  handleToggle = () => {
    this.setState({ openModal: !this.state.openModal });
  };

  handleSnippet = (e) => {
    let html = e.target.value;
    html = html.split('200px; height: 200px;').join('300px; height: 300px;');
    let arr = html.split('</div>');
    let sv_html = arr[0] + '</div>';
    let sv_script = arr[1];

    console.log('SV HTML ', sv_html);
    this.setState({ sv_html: sv_html, sv_script: sv_script });
  };

  // ADD NEW FLIGHT
  toggleAndPost = (e) => {
    // console.log('dropdowntitlestate', this.dropdownButtonTitle);
    let aircraftURL = `${URL}aircraft/`;
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
      method: 'PUT',
      url: `${URL}flights/${this.state.id}/`,
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
        airports_visited: this.state.airports_visited,
        fly_date: this.state.fly_date,
        snippet: this.state.snippet,
        aircraft: aircraftURL,
        license_type: this.state.flightLicense,
        total_hours: this.state.total_hours,
        sv_html: this.state.sv_html,
        sv_script: this.state.sv_script
      },
      headers: headers
    })
      .then((response) => {
        console.log('??????????', response);
      })
      .catch((error) => {
        console.log('put error', error);
      });
    this.setState({
      openModal: !this.state.openModal
    });
    window.location.reload();
  };

  render() {
    console.log(
      '====== aircraft BIG ============D:',
      this.props
    );
    return (
      <div className="FlightCard" onClick={this.modalToggle}>
        <h3>{this.props.flight.name}</h3>
        <p>{this.props.flight.airports_visited}</p>
        <p>{this.state.aircraft_whatever.tail_number}</p>
        {Parser(this.props.flight.sv_html)}
        <Helmet>{Parser(this.props.flight.sv_script)}</Helmet>
        <div className="FLightCard-Hours-Date">
          <span>{this.props.flight.fly_date}</span>
          <span>{this.props.flight.total_hours}</span>
        </div>
        <Modal
          onClick={this.nestedModalToggle}
          props={this.props.flight}
          isOpen={this.state.openModal}
          toggle={this.modalToggle}
        >
          <ModalHeader>
            <h4>
              {this.props.flight.name}
              {this.props.flight.fly_date}
            </h4>
            <h4>{this.props.flight.airports_visited}</h4>
          </ModalHeader>
          <ModalBody />
        </Modal>
        <Modal
          isOpen={this.state.nestedModal}
          toggle={this.nestedModalToggle}
          onClosed={this.state.closeAll ? this.toggle : undefined}
        >
          <ModalHeader>
            <input
              className="new-flight-input-name"
              name="name"
              onChange={this.handleInputChange}
              placeholder="Flight Name"
              value={this.state.name}
            />
            <input
              className="new-flight-input-av"
              name="airports_visited"
              onChange={this.handleInputChange}
              placeholder="Airports Visited"
              value={this.state.airports_visited}
            />
            <input
              className="new-flight-input-av"
              name="fly_date"
              onChange={this.handleInputChange}
              type="date"
              value={this.state.fly_date}
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
              value={this.state.remarks}
            />
          </ModalBody>
          <ModalFooter>
            <div>
              
              <div>
                Cross Country
                <input
                  className="new-flight-pic-input"
                  name="cross_country"
                  onChange={this.handleInputChange}
                  value={this.state.cross_country}
                />
              </div>
              <div>
                No Instr app.
                <input
                  className="new-flight-pic-input"
                  name="no_instument_app"
                  onChange={this.handleInputChange}
                  value={this.state.no_instument_app}
                />
              </div>
              <div>
                No. Ldg.
                <input
                  className="new-flight-pic-input"
                  name="no_ldg"
                  onChange={this.handleInputChange}
                  value={this.state.no_ldg}
                />
              </div>
              <div>
                Day
                <input
                  className="new-flight-pic-input"
                  name="day"
                  onChange={this.handleInputChange}
                  value={this.state.day}
                />
              </div>
              <div>
                Night
                <input
                  className="new-flight-pic-input"
                  name="night"
                  onChange={this.handleInputChange}
                  value={this.state.night}
                />
              </div>
              <div>
                Actual Instr.
                <input
                  className="new-flight-pic-input"
                  name="actual_instr"
                  onChange={this.handleInputChange}
                  value={this.state.actual_instr}
                />
              </div>
              <div>
                Sim. Instr.
                <input
                  className="new-flight-pic-input"
                  name="sim_instr"
                  onChange={this.handleInputChange}
                  value={this.state.sim_instr}
                />
              </div>
              <div>
                PIC
                <input
                  className="new-flight-pic-input"
                  name="pic"
                  onChange={this.handleInputChange}
                  value={this.state.pic}
                />
              </div>
              <div>
                Dual Rec.
                <input
                  className="new-flight-pic-input"
                  name="dual_rec"
                  onChange={this.handleInputChange}
                  value={this.state.dual_rec}
                />
              </div>
              <div>
                Total
                <input
                  className="new-flight-pic-input"
                  name="total_hours"
                  onChange={this.handleInputChange}
                  value={this.state.total_hours}
                />
                <button className="edit-button" onClick={this.toggleAndPost}>
                  Save
                </button>
              </div>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default FlightCard;
