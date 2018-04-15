import axios from 'axios';

import * as types from './types';

import routes from '../../config/routes';

export function login(social, password) {
	return dispatch => {
		dispatch({
			type: types.LOGIN_ERROR,
			payload: null,
		});

		axios
			.post(`${routes.apiRoot}/login`, { social, password })
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
		payload: axios.delete(`${routes.apiRoot}/logout`),
	};
}

export function fetchAll(token) {
	localStorage.setItem('x-auth', token);

	axios.defaults.headers['x-auth'] = token;

	return dispatch => {
		dispatch({ type: types.AUTH_LOGIN });

		axios
			.all([
				axios.get(`${routes.apiRoot}/users`),
				axios.get(`${routes.apiRoot}/patients`),
				axios.get(`${routes.apiRoot}/messages`),
				axios.get(`${routes.apiRoot}/procedures`),
				axios.get(`${routes.apiRoot}/me`),
			])
			.then(
				axios.spread((users, patients, procedures, messages, me) => {
					dispatch({ type: types.FETCH_USERS, payload: users });
					dispatch({ type: types.FETCH_PATIENTS, payload: patients });
					dispatch({
						type: types.FETCH_PROCEDURES,
						payload: procedures,
					});
					dispatch({ type: types.FETCH_MESSAGES, payload: messages });
					dispatch({ type: types.FETCH_ME, payload: me });
				}),
			);
	};
}

export function uploadFile(formData) {
	return {
		type: types.UPLOAD_FILE,
		payload: axios.post(`${routes.apiRoot}/files`, formData),
	};
}

export function addPatient(patient) {
	return {
		type: types.ADD_PATIENT,
		payload: axios.post(`${routes.apiRoot}/patients`, patient),
	};
}

export function editPatient(patient) {
	return {
		type: types.EDIT_PATIENT,
		payload: axios.patch(
			`${routes.apiRoot}/patients/${patient._id}`,
			patient,
		),
	};
}

export function addMessage(message) {
	return {
		type: types.ADD_MESSAGE,
		payload: axios.post(`${routes.apiRoot}/messages`, message),
	};
}

export function addEmployee(employee) {
	return {
		type: types.ADD_USER,
		payload: axios.post(`${routes.apiRoot}/users`, employee),
	};
}

export function editEmployee(employee) {
	return {
		type: types.EDIT_USER,
		payload: axios.patch(
			`${routes.apiRoot}/users/${employee._id}`,
			employee,
		),
	};
}

export function addProcedure(procedure) {
	return {
		type: types.ADD_PROCEDURE,
		payload: axios.post(`${routes.apiRoot}/procedures`, procedure),
	};
}

export function editProcedure(procedure) {
	return {
		type: types.EDIT_PROCEDURE,
		payload: axios.patch(
			`${routes.apiRoot}/procedures/${procedure._id}`,
			procedure,
		),
	};
}
