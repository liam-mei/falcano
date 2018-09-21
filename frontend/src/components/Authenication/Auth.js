import React, { Component } from 'react';

import { isLoggedIn } from '../../utils/helper/helperFuncions';

const Auth = (Comp) =>
	class extends Component {
		state = {
			loggedIn: false,
		};

		componentDidMount() {
			if (isLoggedIn()) {
				this.setState({ loggedIn: true });
			} else {
				this.props.history.push('/');
				window.location.reload();
			}
		}
		render() {
			return <Comp loggedIn={this.state.loggedIn} />;
		}
	};

export default Auth;
