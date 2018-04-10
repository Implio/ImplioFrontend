import { FETCH_PATIENTS } from '../actions/types';

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_PATIENTS:
			return { ...state, list: action.payload.data };
		default:
			return state;
	}
}
