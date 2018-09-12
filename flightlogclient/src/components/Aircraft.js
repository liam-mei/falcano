import axios from "axios";
import React, { Component } from "react";

class Aircraft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      content: "",
      data: [{name: "",
      content: "",}]
    };
  }
  componentDidMount() {
    let axiosconfig = {
          headers: {'Authorization': 'Token aba81343b1ea1a4f47acca8159244cb30d080d74'}
        }
    axios.get("http://127.0.0.1:8000/api/aircraft_info/", axiosconfig).then(response=>{
      this.setState({data: response.data})
    }).catch();
  }

  render() {
    return( 
    <div>
      <p>{this.state.data[0].name}</p>
    </div>
    )
  }
}

export default Aircraft;
