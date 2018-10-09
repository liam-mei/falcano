import React, { Component } from 'react';
import axios from 'axios';
// import { isLoggedIn } from '../../utils/helper/helperFuncions';

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
