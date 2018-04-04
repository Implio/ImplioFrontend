import { AUTH_LOGIN, AUTH_LOGOUT } from '../actions/types';

export default function(state = [], action) {
	switch (action.type) {
		case AUTH_LOGIN:
			return { ...state, isLoggedIn: true };
		case AUTH_LOGOUT:
			return { ...state, isLoggedIn: false };
		default:
			return state;
	}
}
