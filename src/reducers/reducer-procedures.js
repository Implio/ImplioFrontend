import {
	FETCH_PROCEDURES,
	ADD_PROCEDURE,
	EDIT_PROCEDURE,
} from '../actions/types';

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_PROCEDURES:
			return { ...state, list: action.payload.data };
		case ADD_PROCEDURE:
			return { ...state, list: [action.payload.data, ...state.list] };
		case EDIT_PROCEDURE:
			return {
				...state,
				list: state.list.map(
					procedure =>
						procedure._id === action.payload.data._id
							? action.payload.data
							: procedure,
				),
			};
		default:
			return state;
	}
}
