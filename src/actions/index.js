import axios from 'axios';

import { FETCH_USERS } from './types';

const API_URL = 'https://localhost:3000';

export function fetchNews() {
	return {
		type: FETCH_USERS,
		payload: axios.get(API_URL),
	};
}
