import {LOGIN_REDUCER_ACTIONS} from "./imports.js";

export default function LoginReducer(state, action){
	if(action.type === LOGIN_REDUCER_ACTIONS.update_email){
		return {
			...state,
			"email": {
				"value" : action.payload,
			}
		}
	}
	else if(action.type === LOGIN_REDUCER_ACTIONS.update_password){
		return {
			...state,
			"password": {
				"value" : action.payload,
			}
		}
	}
	else if(action.type === LOGIN_REDUCER_ACTIONS.update_authenticated){
		return {
			...state,
			"authenticated": {
				"value" : action.payload,
			}
		}
	}
	else if(action.type === LOGIN_REDUCER_ACTIONS.update_error){
		return {
			...state,
			"error" : {
				"value": action.payload.value,
				"validated": action.payload.validated
			}
		}
	}
	else{
		return state;
	}
}
