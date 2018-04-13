import { FETCH_USERS, FETCH_ME, ADD_USER, EDIT_USER } from '../actions/types';

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_USERS:
			return {
				...state,
				list: action.payload.data,
				managers: action.payload.data.filter(user => user.isAdmin),
			};
		case FETCH_ME:
			return { ...state, me: action.payload.data };
		case ADD_USER:
			return { ...state, list: [...state.list, action.payload.data] };
		case EDIT_USER:
			return {
				...state,
				list: state.list.map(
					user =>
						user._id === action.payload.data._id
							? action.payload.data
							: user,
				),
			};
		default:
			return state;
	}
}
