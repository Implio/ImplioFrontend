import { combineReducers } from 'redux';

import authReducer from './reducer-auth';
import usersReducer from './reducer-users';
import patientsReducer from './reducer-patients';

const rootReducer = combineReducers({
	auth: authReducer,
	users: usersReducer,
	patients: patientsReducer,
});

export default rootReducer;
