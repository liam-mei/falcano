import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import "./AircraftCard.css";
import axios from "axios";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Dropzone from 'react-dropzone';

// change dev to false if you want axios to get request from heroku server
// set dev to true if you want to work on local machine
const dev = true;
let URL
(dev ? URL = "http://127.0.0.1:8000/api"
  : URL = "https://flightloggercs10.herokuapp.com/api");
  class AircraftCardModal extends React.Component {
    constructor() {
      super();
      
      this.state = {
        data: [],
        files: [],
        id: '',
        tail_number: '',
        tail_number_edit: '',
        man_type: '',
        man_type_edit: '',
        license_type: '',
        license_type_edit: '',
        photo: '',
        modal: false,
        nestedModal: false,
        closeAll: false
      };
    }
    
    // toggles the modal and populates the data the specific aircraft.
    toggle = () => {
      this.setState({ modal: !this.state.modal });
      const headers = {
        'Authorization': 'JWT ' + localStorage.getItem('token')
      }
      axios({
        method: 'GET',
        url: `${URL}/filteredflights/${this.state.id}`,
        headers: headers,
      }).then((response) => {
        console.log("MODAL RES", response.data.aircraft)
        this.setState({ data: response.data });
      }).catch((error) => {
        console.log("error :", error)
      });
    };
    
    toggleNested = () => {
      this.setState({
        nestedModal: !this.state.nestedModal,
        closeAll: false
      });
    };
    
    // Handles the change in input
    handleChange = (e) => {
      this.setState({ [e.target.name]: e.target.value })
      console.log("statechange", this.state.license_type_edit)
    } 
    
    // THIS WILL UPDATE THE INFORMATION OF THE AIRCRAFT VIA EDIT MODAL
    toggleNestedAndPut = (e) => {
      this.setState({
        nestedModal: !this.state.nestedModal,
        closeAll: false,
        
      });
      const headers = {
        'Authorization': 'JWT ' + localStorage.getItem('token')
      }
      axios({
        method: 'PUT',
        url: `${URL}/aircraft/${this.state.id}/`,
        data: {
          man_type: this.state.man_type_edit,
          tail_number: this.state.tail_number_edit,
          license_type: this.state.license_type_edit,
          id: this.state.id
        },
        headers: headers,
      }).then((response) => {
        console.log('put response', response)
      }).catch((error) => {
        console.log("put error", error)
      })
      this.setState({ 
        tail_number: this.state.tail_number_edit,
        man_type: this.state.man_type_edit,
        license_type: this.state.license_type_edit
      });
    }
    
    toggleAll = () => {
      this.setState({
        nestedModal: !this.state.nestedModal,
        closeAll: true
      });
    };
    
    // DRAG AND DROP UPLOAD HANDLER
    handleOnDrop = (acceptedfiles, rejectedFiles) => {
      console.log(acceptedfiles)
      const headers = {
        'Authorization': 'JWT ' + localStorage.getItem('token')
      }
      axios({
        method: 'PUT',
        url: `${URL}/aircraft/${this.state.id}/`,
        data: {
          man_type: this.state.man_type_edit,
          tail_number: this.state.tail_number_edit,
          license_type: this.state.license_type_edit,
          id: this.state.id,
          photo: acceptedfiles
        },
        headers: headers,
      }).then(res => {
        console.log("Dropzone res: ", res)
      }).catch(err => {
        console.log("Dropzone err: ", err)
      })
    }
    
    componentDidMount() {
      console.log("URL", URL)
      this.setState({ 
        tail_number: this.props.data.tail_number, 
        id: this.props.data.id,
        tail_number_edit: this.props.data.tail_number,
        license_type_edit: this.props.data.license_type,
        man_type_edit: this.props.data.man_type, 
        photo: this.props.data.photo
      }) 
    }
    
    render() {
      console.log("filestate", this.props.data)
      let [ pic_sum, no_ldg, day, night, cross_country, actual_instr,
        sim_instr, dual_rec] = [0,0,0,0,0,0,0];
        for(let i=0; i<this.state.data.length; i++) {
      pic_sum += this.state.data[i].pic
      no_ldg += this.state.data[i].no_ldg
      day += this.state.data[i].day
      night += this.state.data[i].night
      cross_country += this.state.data[i].cross_country
      actual_instr += this.state.data[i].actual_instr
      sim_instr += this.state.data[i].sim_instr
      dual_rec += this.state.data[i].dual_rec
  }  
    console.log("picSUM", pic_sum);
    return <div className="AircraftCard">
        <Card onClick={this.toggle} className="AircraftCard-Card">
          <Typography className="card-typography" onClick={this.toggle}>
            <p className="card-typography-p">
              {this.state.tail_number}
            </p>
            <p className="card-typography-p">{this.props.data.man_type}</p>
          </Typography>
          <CardMedia onClick={this.toggle} component="img" height="140" image={this.state.photo} title="Airplane" />
        </Card>
        {/* CARD END */}

        {/* MODAL START */}
        <Modal className="modal-content" isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader className="modal-title">
            <p className="modal-header-p">{this.state.tail_number}</p>
            <p className="modal-header-p">{this.props.data.man_type}</p>

            <button onClick={this.toggleNested} className="edit-button">
              Edit
            </button>
          </ModalHeader>
          <ModalBody className="modal-body">
            <br />
            <img className="modal-body-img" src={this.state.photo} />
            {/* NESTED MODAL */}
            <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
              <ModalHeader>
                <input className="edit-input-tn" name="tail_number_edit" onChange={this.handleChange} placeholder={this.props.data.tail_number} />
                <input className="edit-input-lt" name="license_type_edit" onChange={this.handleChange} placeholder={this.props.data.license_type} />
                <input className="edit-input-mt" name="man_type_edit" onChange={this.handleChange} placeholder={this.props.data.man_type} />
              </ModalHeader>
              <ModalBody className="nested-modal-body">
                <Dropzone onDrop={this.handleOnDrop} multiple={false} accept='image/*'>
                  <div>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>
              </ModalBody>
              <ModalFooter>
                {/* CLOSE NESTED */}
                <button className="edit-button" onClick={this.toggleNestedAndPut}>
                  Save
                </button>
              </ModalFooter>
            </Modal>
          </ModalBody>
          <ModalFooter className="modal-footer">
            <ul className="ul-1">
              <li>Airplane SEL</li>
              <li>Cross Country {cross_country}</li>
              <li>No. Instr. App.</li>
              <li>No. Ldg: {no_ldg}</li>
            </ul>
            <ul className="ul-2">
              <li>Day: {day}</li>
              <li>Night {night}</li>
              <li>Actual Instr.{actual_instr}</li>
              <li>Sim. Instr.{sim_instr}</li>
            </ul>
            <ul className="ul-2">
              <li>Grnd Trainer</li>
              <li>PIC: {pic_sum}</li>
              <li>Dual Rec.{dual_rec}</li>
              <li>Total</li>
            </ul>
          </ModalFooter>
        </Modal>
      </div>;
  }
}

export default AircraftCardModal;
