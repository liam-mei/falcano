import axios from 'axios';

const dev = true;
	let URL
	(dev ? URL = "http://127.0.0.1:8000/api-token-verify/"
		: URL = "https://flightloggercs10.herokuapp.com/api-token-verify/");

export const isLoggedIn = () => {

	const token = localStorage.getItem('token');

	if(token === null) {
		return false;
	}

	axios({
		method: 'POST',
		url: URL,
		data: {
			"token": token
		}
		}).then((response) => {
			return true;
		}).catch(err => {
			localStorage.removeItem('token');
			return false;
		})
};

export const signout = () => {
	localStorage.removeItem('token');
}


