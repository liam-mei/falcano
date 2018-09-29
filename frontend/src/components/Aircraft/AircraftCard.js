import React from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import "./AircraftCard.css";
import axios from "axios";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Dropzone from "react-dropzone";
import { Helmet } from "react-helmet";
const headers = {
  Authorization: "JWT " + localStorage.getItem("token")
};

// change dev to false if you want axios to get request from heroku server
// set dev to true if you want to work on local machine
const dev = true;
let URL;
dev
  ? (URL = "http://127.0.0.1:8000/api")
  : (URL = "https://flightloggercs10.herokuapp.com/api");
class AircraftCardModal extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [],
      files: [],
      id: "",
      dropdownButtonTitle: "Airplane SEL",
      dropdownOpen: false,
      tail_number: "",
      man_type: "",
      tail_number_edit: "",
      man_type_edit: "",
      license_type_edit: "",
      license_type: "",
      photo: "",
      modal: false,
      nestedModal: false,
      closeAll: false,
      uploadurl: ""
    };
  }

  // toggles the modal and populates the data the specific aircraft.
  toggle = () => {
    this.setState({ modal: !this.state.modal });
    const headers = {
      Authorization: "JWT " + localStorage.getItem("token")
    };
    axios({
      method: "GET",
      url: `${URL}/filteredflights/${this.state.id}`,
      headers: headers
    })
      .then(response => {
        // console.log("MODAL RES", response.data.aircraft);
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.log("error :", error);
      });
    // console.log("STATE::", this.state.uploadurl)
  };

  toggleNested = () => {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false
    });
  };

  handleDropDownButton = e => {
    this.setState({
      dropdownButtonTitle: e.target.name,
      license_type: e.target.name
    });
  };

  toggleDropdownButton = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };
  // Handles the change in input
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    // console.log("statechange", this.state.license_type_edit);
  };

  // THIS WILL UPDATE THE INFORMATION OF THE AIRCRAFT VIA EDIT MODAL
  toggleNestedAndPut = e => {
    if (this.state.uploadurl === "") {
      axios({
        method: "PUT",
        url: `${URL}/aircraft/${this.state.id}/`,
        data: {
          man_type: this.state.man_type_edit,
          tail_number: this.state.tail_number_edit,
          license_type: this.state.license_type,
          id: this.state.id,
          photo: this.state.photo
        },
        headers: headers
      })
        .then(response => {
          // console.log("put response", response);
        })
        .catch(error => {
          console.log("put error", error);
        });
      this.setState({
        nestedModal: !this.state.nestedModal,
        closeAll: false,
        tail_number: this.state.tail_number_edit,
        man_type: this.state.man_type_edit,
        license_type: this.state.license_type,
      });
      window.location.reload();

    } else {
      
      axios({
        method: "PUT",
        url: `${URL}/aircraft/${this.state.id}/`,
        data: {
          man_type: this.state.man_type_edit,
          tail_number: this.state.tail_number_edit,
          license_type: this.state.license_type,
          id: this.state.id,
          photo: this.state.uploadurl
        },
        headers: headers
      })
        .then(response => {
          // console.log("put response", response);
        })
        .catch(error => {
          console.log("put error", error);
        });
      this.setState({
        nestedModal: !this.state.nestedModal,
        closeAll: false,
        tail_number: this.state.tail_number_edit,
        man_type: this.state.man_type_edit,
        license_type: this.state.license_type,
        photo: this.state.uploadurl
      });
      window.location.reload();
    }
  };

  toggleAll = () => {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true
    });
  };

  // DRAG AND DROP UPLOAD HANDLER
  handleOnDrop = (acceptedfiles, rejectedFiles) => {
    console.log(acceptedfiles);
    const headers = {
      Authorization: "JWT " + localStorage.getItem("token")
    };
  };

  upload = () => {
    window.cloudinary.openUploadWidget(
      { cloud_name: "dkzzjjjj9", upload_preset: "ggbmyqmo", cors: "no-cors" },

      (error, result) => {
        // console.log(error, result);
        if (this.state.uploadurl === "") {
          let imgurl;
          result
            ? (imgurl = result[0].url)
            : (imgurl = `http://res.cloudinary.com/dkzzjjjj9/image/upload/v1538078252/rurz4wt0ngzacnfz06io.jpg`);
          this.setState({ uploadurl: imgurl });
        } else if (this.state.uploadurl !== "") {
          let imgurl;
          imgurl = this.state.uploadurl;
          this.setState({ uploadurl: imgurl });
        }
        // this.setState({ uploadurl: imgurl });
        // console.log('===== stateurl: ', this.state.uploadurl);
      }
    ),
      false;
  };

  componentDidMount() {
    // console.log("URL", URL);
    this.setState({
      tail_number: this.props.data.tail_number,
      id: this.props.data.id,
      tail_number_edit: this.props.data.tail_number,
      license_type_edit: this.props.data.license_type,
      license_type: this.props.data.license_type,
      man_type_edit: this.props.data.man_type,
      photo: this.props.data.photo
    });
  }

  render() {
    // console.log("filesdata", this.state.data);
    let [
      pic_sum,
      no_ldg,
      day,
      night,
      cross_country,
      actual_instr,
      sim_instr,
      dualrec,
      no_instument_app,
      total_hours
    ] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < this.state.data.length; i++) {
      pic_sum += this.state.data[i].pic;
      no_ldg += this.state.data[i].no_ldg;
      day += this.state.data[i].day;
      night += this.state.data[i].night;
      cross_country += this.state.data[i].cross_country;
      actual_instr += this.state.data[i].actual_instr;
      sim_instr += this.state.data[i].sim_instr;
      dualrec += this.state.data[i].dual_rec;
      no_instument_app += this.state.data[i].no_instument_app;
      total_hours += this.state.data[i].total_hours;
    }

    return (
      <div className="AircraftCard">
        <Card onClick={this.toggle} className="AircraftCard-Card">
          <Typography className="card-typography" onClick={this.toggle}>
            <h4 className="card-typography-p">{this.state.tail_number}</h4>
          </Typography>
          <p className="card-typography-p">{this.props.data.man_type}</p>

          <CardMedia
            onClick={this.toggle}
            component="img"
            height="140"
            image={this.state.photo}
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
            <Modal
              isOpen={this.state.nestedModal}
              toggle={this.toggleNested}
              onClosed={this.state.closeAll ? this.toggle : undefined}
            >
              <ModalHeader>
                <input
                  className="edit-input-tn"
                  name="tail_number_edit"
                  onChange={this.handleChange}
                  placeholder={this.props.data.tail_number}
                />
                <ButtonDropdown
                  isOpen={this.state.dropdownOpen}
                  toggle={this.toggleDropdownButton}
                >
                  <DropdownToggle caret>
                    {this.state.license_type}
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      name="Airplane SEL"
                      onClick={this.handleDropDownButton}
                    >
                      Airplane SEL
                    </DropdownItem>
                    <DropdownItem
                      name="Airplane SES"
                      onClick={this.handleDropDownButton}
                    >
                      Airplane SES
                    </DropdownItem>
                    <DropdownItem
                      name="Airplane MEL"
                      onClick={this.handleDropDownButton}
                    >
                      Airplane MEL
                    </DropdownItem>
                    <DropdownItem
                      name="Airplane MES"
                      onClick={this.handleDropDownButton}
                    >
                      Airplane MES
                    </DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
                <input
                  className="edit-input-mt"
                  name="man_type_edit"
                  onChange={this.handleChange}
                  placeholder={this.props.data.man_type}
                />
              </ModalHeader>
              <ModalBody className="nested-modal-body">
                <button onClick={this.upload}>CLICK ME TO UPLOAD</button>
              </ModalBody>
              <ModalFooter>
                {/* CLOSE NESTED */}
                <button
                  className="edit-button"
                  onClick={this.toggleNestedAndPut}
                >
                  Save
                </button>
              </ModalFooter>
            </Modal>
          </ModalBody>
          <ModalFooter className="modal-footer">
            <ul className="ul-1">
              <li>{this.state.license_type}</li>
              <li>Cross Country {cross_country}</li>
              <li>
                No. Instr. App.
                {no_instument_app}
              </li>
              <li>No. Ldg: {no_ldg}</li>
            </ul>
            <ul className="ul-2">
              <li>Day: {day}</li>
              <li>Night {night}</li>
              <li>
                Actual Instr.
                {actual_instr}
              </li>
              <li>
                Sim. Instr.
                {sim_instr}
              </li>
            </ul>
            <ul className="ul-2">
              <li>Grnd Trainer</li>
              <li>PIC: {pic_sum}</li>
              <li>Dual Rec: {dualrec}</li>
              <li>Total Hours: {total_hours}</li>
            </ul>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AircraftCardModal;
