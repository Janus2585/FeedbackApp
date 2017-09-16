import axios from 'axios';
import { FETCH_USER } from './types';

//asynchronous action creator
export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');
		//we are only interested in res.data
		dispatch({ type: FETCH_USER, payload: res.data });
};

//asynchronous action creator
//sends token to the stripe API
export const handleToken = (token) => async dispatch => {
	const res = await axios.post('/api/stripe', token);

	//after the request is complete, we will dispatch an action
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
	const res = await axios.post('/api/surveys', values);

	history.push('/surveys');
	dispatch({ type: FETCH_USER, payload: res.data });
};