import { FETCH_PATIENTS, ADD_PATIENT, EDIT_PATIENT } from '../actions/types';

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_PATIENTS:
			return { ...state, list: action.payload.data };
		case ADD_PATIENT:
			return { ...state, list: [...state.list, action.payload.data] };
		case EDIT_PATIENT:
			return {
				...state,
				list: state.list.map(
					patient =>
						patient._id === action.payload.data._id
							? action.payload.data
							: patient,
				),
			};
		default:
			return state;
	}
}
