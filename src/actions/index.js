import axios from 'axios';

import * as types from './types';

const API_URL = 'https://localhost:3000';

export function login(username, password) {
	return dispatch => {
		axios
			.post(`${API_URL}/login`, { username, password })
			.then(res => {
				if (res.data.err) {
					return dispatch({
						type: types.LOGIN_ERROR,
						payload: res.data.err,
					});
				}

				dispatch(fetchAll(res.data.token));
			})
			.catch(err => {
				console.log(`Error: ${err}`);
			});
	};
}

export function logout() {
	localStorage.removeItem('x-auth');

	return {
		type: types.AUTH_LOGOUT,
		payload: axios.delete(`${API_URL}/logout`),
	};
}

export function fetchAll(token) {
	localStorage.setItem('x-auth', token);

	axios.defaults.headers['x-auth'] = token;

	return dispatch => {
		dispatch({ type: types.AUTH_LOGIN });

		//axios.all([]).then(axios.spread(() => {}));
	};
}
