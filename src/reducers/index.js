import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './reducer-auth';
import usersReducer from './reducer-users';
import patientsReducer from './reducer-patients';
import proceduresReducer from './reducer-procedures';

const rootReducer = combineReducers({
	form: formReducer,
	auth: authReducer,
	users: usersReducer,
	patients: patientsReducer,
	procedures: proceduresReducer,
});

export default rootReducer;
