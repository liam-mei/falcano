import React, { Component } from 'react';
import axios from 'axios';
// import { isLoggedIn } from '../../utils/helper/helperFuncions';
const dev = process.env.REACT_APP_DEV;
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
          dev ? console.log('auth response ', response) : console.log();
          this.setState({ loggedIn: true, username: response.data.user.username });
        })
        .catch((err) => {
         dev ? console.log('eeeeeeeeerrrrrrrrrrrrrorrrrrrrrrr', err) : console.log();
        });
    }

    render() {
      return <Comp loggedIn={this.state.loggedIn} username={this.state.username} {...this.props} />;
    }
};

export default Auth;
