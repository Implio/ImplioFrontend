import { FETCH_MESSAGES, ADD_MESSAGE } from '../actions/types';

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_MESSAGES:
			return { ...state, list: action.payload.data };
		case ADD_MESSAGE:
			return { ...state, list: [...state.list, action.payload.data] };
		default:
			return state;
	}
}
