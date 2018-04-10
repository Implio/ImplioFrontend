import axios from 'axios';

import * as types from './types';

const API_URL = 'http://localhost:3000';

export function login(social, password) {
	return dispatch => {
		dispatch({
			type: types.LOGIN_ERROR,
			payload: null,
		});

		axios
			.post(`${API_URL}/login`, { social, password })
			.then(res => {
				if (res.data.error) {
					return dispatch({
						type: types.LOGIN_ERROR,
						payload: res.data.error,
					});
				}

				dispatch(fetchAll(res.data.token));
			})
			.catch(err => {
				console.log(err);
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

		axios
			.all([
				axios.get(`${API_URL}/users`),
				axios.get(`${API_URL}/patients`),
			])
			.then(
				axios.spread((users, patients) => {
					dispatch({ type: types.FETCH_USERS, payload: users });
					dispatch({ type: types.FETCH_PATIENTS, payload: patients });
				}),
			);
	};
}
