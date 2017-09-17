// watch for actions with type FETCH_SURVEYS, return the list of surveys 
import { FETCH_SURVEYS } from '../actions/types';

export default function(state = [], action) {
	switch (action.type) {
		//when the action type is FETCH_SURVEYS
		case FETCH_SURVEYS:
			//returns false if action.payload=''.
			return action.payload;
		default: 
			return state;
	}
}