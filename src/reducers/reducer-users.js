import { FETCH_USERS, FETCH_ME } from '../actions/types';

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_USERS:
			return { ...state, list: action.payload.data };
		case FETCH_ME:
			return { ...state, me: action.payload.data };
		default:
			return state;
	}
}
