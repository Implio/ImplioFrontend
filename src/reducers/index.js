import { combineReducers } from 'redux';

import usersReducer from './reducer-users';

const rootReducer = combineReducers({
	users: usersReducer,
});

export default rootReducer;
