import React, { Component } from 'react';

import { isLoggedIn } from '../../utils/helper/helperFuncions';

const Auth = (App) =>
	class extends Component {
		state = {
			loggedIn: false,
		};

		componentDidMount() {
			if (isLoggedIn()) {
				this.setState({ loggedIn: true });
			} else {
				this.setState({ loggedIn: false });
			}
		}
		render() {
			if (this.state.loggedIn) return <App loggedIn={true} />;
			return <App loggedIn={false} />;
		}
	};

export default Auth;
