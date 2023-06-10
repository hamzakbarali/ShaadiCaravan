import {LOGIN_REDUCER_ACTIONS} from "./imports.js";

export function updateEmail(dispatch, email){
	dispatch({type: LOGIN_REDUCER_ACTIONS.update_email, payload: email});
}

export function updatePassword(dispatch, password){
	dispatch({type: LOGIN_REDUCER_ACTIONS.update_password, payload: password});
}

export function updateAuthenticated(dispatch, authenticated){
	dispatch({type: LOGIN_REDUCER_ACTIONS.update_authenticated, payload: authenticated});
}

export function updateErrorSpecific(dispatch, email, password){
	if(email.length === 0 || password.length === 0){
		dispatch({
			type: LOGIN_REDUCER_ACTIONS.update_error, 
			payload:{
				value: "Please, enter an email and password",
				validated: false
			} 
		});
	}
	else if(!email.includes("@") || !email.includes(".")){
		dispatch({
			type: LOGIN_REDUCER_ACTIONS.update_error, 
			payload: {
				value: "Please, enter a correct email.",
				validated: false
			} 
		});
	}
	else{
		dispatch({
			type: LOGIN_REDUCER_ACTIONS.update_error, 
			payload: {
				value: "",
				validated: true
			}
		});
	}
}

export function updateErrorGeneral(dispatch, message){
	dispatch({
		type: LOGIN_REDUCER_ACTIONS.update_error, 
		payload:{
			value: message,
			validated: false
		} 
	});
}