import React, { Component } from 'react';
import axios from 'axios';
// import { isLoggedIn } from '../../utils/helper/helperFuncions';

// const dev = process.env.REACT_APP_DEV === "true" ? true : false;
// 	let URL
// 	(dev ? URL = "http://127.0.0.1:8000/api-token-verify/"
// 		: URL = "https://flightloggercs10.herokuapp.com/api-token-verify/");

const URL = process.env.REACT_APP_URL;

const Auth = Comp => class extends Component {
    state = {
      loggedIn: false,
      username: '',
    };

    componentDidMount() {
      const token = localStorage.getItem('token');

      axios({
        method: 'POST',
        url: `${URL}api-token-verify/`,
        data: {
          token,
        },
      })
        .then((response) => {
          console.log('auth response ', response);
          this.setState({ loggedIn: true, username: response.data.user.username });
        })
        .catch((err) => {
          console.log('eeeeeeeeerrrrrrrrrrrrrorrrrrrrrrr', err);
        });
    }

    render() {
      return <Comp loggedIn={this.state.loggedIn} username={this.state.username} {...this.props} />;
    }
};

export default Auth;
