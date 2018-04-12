import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './reducer-auth';
import usersReducer from './reducer-users';
import patientsReducer from './reducer-patients';

const rootReducer = combineReducers({
	form: formReducer,
	auth: authReducer,
	users: usersReducer,
	patients: patientsReducer,
});

export default rootReducer;
