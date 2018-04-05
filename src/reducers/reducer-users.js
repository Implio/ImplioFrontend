import { FETCH_USERS } from '../actions/types';

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_USERS:
			return { ...state, list: action.payload.data };
		default:
			return state;
	}
}
