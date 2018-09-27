import React, { Component } from 'react';
import axios from 'axios';
import { isLoggedIn } from '../../utils/helper/helperFuncions';
const dev = true;
	let URL
	(dev ? URL = "http://127.0.0.1:8000/api-token-verify/"
		: URL = "https://flightloggercs10.herokuapp.com/api-token-verify/");


const Auth = (Comp) =>
	class extends Component {
		state = {
			loggedIn: false,
		};

		componentDidMount() {
			let token = localStorage.getItem('token')

			axios({
				method: 'POST',
				url: URL,
				data: {
					"token": token
				}
				}).then((response) => {
				console.log("auth response ", response)
					this.setState({ loggedIn: true })
				}).catch(err => {
					console.log(err)
				})
			}
			render() {
						return <Comp loggedIn={this.state.loggedIn} {...this.props} />;
					}
				};

export default Auth;
