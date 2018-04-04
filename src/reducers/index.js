import { combineReducers } from 'redux';

import authReducer from './reducer-auth';
import usersReducer from './reducer-users';

const rootReducer = combineReducers({
	auth: authReducer,
	users: usersReducer,
});

export default rootReducer;
