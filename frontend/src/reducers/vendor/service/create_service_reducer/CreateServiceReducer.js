import {CREATE_SERVICE_REDUCER_ACTIONS} from "./imports.js";

export default function CreateServiceReducer(state, action){
	if(action.type === CREATE_SERVICE_REDUCER_ACTIONS.update_servicename){
		return {
			...state,
			"service_name": action.payload,
		};
	}
	else if(action.type === CREATE_SERVICE_REDUCER_ACTIONS.update_time){
		return {
			...state,
			"time": action.payload,
		};
	}
	else if(action.type === CREATE_SERVICE_REDUCER_ACTIONS.update_price){
		return {
			...state,
			"price": action.payload,
		}
	}
	else if(action.type === CREATE_SERVICE_REDUCER_ACTIONS.update_day){
		return {
			...state,
			"day" : action.payload,
		}
	}
	else{
		return state;
	}
}
