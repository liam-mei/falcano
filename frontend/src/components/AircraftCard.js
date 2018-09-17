import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import "./AircraftCardCSS.css";
import axios from "axios";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

// change dev to false if you want axios to get request from heroku server
// set dev to true if you want to work on local machine
const dev = true;
let URL = (dev
  ? "http://127.0.0.1:8000/api"
  : "https://flightloggercs10.herokuapp.com/api");

class AircraftCardModal extends React.Component {
  constructor() {
    super();

    this.state = {
      modal: false,
      nestedModal: false,
      closeAll: false
    };
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  toggleNested = () => {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false
    });
  };

  toggleAll = () => {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true
    });
  };

  edit;

  componentDidMount() {
    let axiosconfig = {};
    axios
      .get(`${URL}/aircraft/`, axiosconfig)
      .then(response => {
        this.setState({ data: response.data });
        console.log("res", response);
      })
      .catch();
  }

  render() {
    console.log("modal", this.props);
    return (
      <div>
        <Card onClick={this.toggle} className="air-card">
          <Typography className="card-typography" onClick={this.toggle}>
            <p className="card-typography-p">{this.props.data.tail_number}</p>
            <p className="card-typography-p">{this.props.data.man_type}</p>
          </Typography>
          <CardMedia
            onClick={this.toggle}
            component="img"
            height="140"
            image="https://qph.fs.quoracdn.net/main-qimg-721f8fad881515f2e901f6a68151cd55-c"
            title="Airplane"
          />
        </Card>
        {/* CARD END */}

        {/* MODAL START */}
        <Modal
          className="modal-content"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader className="modal-title">
            <p className="modal-header-p">{this.props.data.tail_number}</p>
            <p className="modal-header-p">{this.props.data.man_type}</p>

            <button onClick={this.toggleNested} className="edit-button">
              Edit
            </button>
          </ModalHeader>
          <ModalBody className="modal-body">
            <br />
            <img
              className="modal-body-img"
              src="https://qph.fs.quoracdn.net/main-qimg-721f8fad881515f2e901f6a68151cd55-c"
            />
            {/* NESTED MODAL */}
            <Modal
              isOpen={this.state.nestedModal}
              toggle={this.toggleNested}
              onClosed={this.state.closeAll ? this.toggle : undefined}
            >
              <ModalHeader>
                <input
                  className="edit-input-tn"
                  placeholder={this.props.data.tail_number}
                />
                <input
                  className="edit-input-lt"
                  placeholder={this.props.data.license_type}
                />
              </ModalHeader>
              <ModalBody className="nested-modal-body">
                Drag and Drop Image
              </ModalBody>
              <ModalFooter>
                {/* CLOSE NESTED */}
                <button className="edit-button" onClick={this.toggleNested}>
                  Save
                </button>
              </ModalFooter>
            </Modal>
          </ModalBody>
          <ModalFooter className="modal-footer">
            <ul className="ul-1">
              <li>Airplane SEL</li>
              <li>Cross Country</li>
              <li>No. Instr. App.</li>
              <li>No. Ldg.</li>
            </ul>
            <ul className="ul-2">
              <li>Day</li>
              <li>Night</li>
              <li>Actual Instr.</li>
              <li>Sim. Instr.</li>
            </ul>
            <ul className="ul-2">
              <li>Grnd Trainer</li>
              <li>PIC</li>
              <li>Dual Rec.</li>
              <li>Total</li>
            </ul>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AircraftCardModal;
