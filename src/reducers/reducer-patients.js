import { FETCH_PATIENTS, ADD_PATIENT } from '../actions/types';

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_PATIENTS:
			return { ...state, list: action.payload.data };
		case ADD_PATIENT:
			return { ...state, list: [...state.list, action.payload.data] };
		default:
			return state;
	}
}
