import axios from "axios";
import React, { Component } from "react";

const URL = "https://flightloggercs10.herokuapp.com/api";

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
          headers: {'Authorization': 'Token 155aa0ef77bafed25f791161ff5345b02ee1da3b'}
        }
    axios.get(`${URL}/aircraft`, axiosconfig).then(response=>{
      this.setState({data: response.data})
    }).catch();
  }

  render() {
    return( 
    <div>
      <p>{this.state.data[0].man_type}</p>
    </div>
    )
  }
}

export default Aircraft;
