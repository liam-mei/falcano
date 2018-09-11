import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import axios from 'axios';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      }
  }
  // componentDidMount(){
  //   let postData = {
  //     name: 'trying something crazy',
  //     content: 'trying content'
  //   }
  //   let axiosconfig = {
  //     headers: {'Authorization': 'Token aba81343b1ea1a4f47acca8159244cb30d080d74'}
  //   }
  //   axios.post('http://127.0.0.1:8000/api/flight_info/', postData, axiosconfig)
    
  // .then((response)=>{
  //   console.log('response successful', response)
  // }) 
  // .catch((error)=>{
  //   console.log('you messed up', error)
  // })
  // }
  render() { 
    return ( 
      <div>
      <Link to={"/SignUp"}>Sign Up</Link>
      < br />
      <Link to={"/SignIn"}>Sign In</Link>
        <h1>Flight Plan</h1>
        <img src="https://t3.ftcdn.net/jpg/01/95/58/96/500_F_195589622_jSP9kxu6jUHndWRpPf62pVs24smSNZxx.jpg"></img>

        <p>
          Some interesting things
        </p>
        <p>
          Mission statement

        </p>
      </div>
     );
  }
}
 
export default LandingPage;