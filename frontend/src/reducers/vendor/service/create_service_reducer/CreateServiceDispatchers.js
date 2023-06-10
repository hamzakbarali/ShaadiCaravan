import {CREATE_SERVICE_REDUCER_ACTIONS} from "./imports.js";

export function updateServiceName(dispatch, payload){
	dispatch({type: CREATE_SERVICE_REDUCER_ACTIONS.update_servicename, payload: payload});
}

export function updateTime(dispatch, payload){
	dispatch({type: CREATE_SERVICE_REDUCER_ACTIONS.update_time, payload: payload});
}

export function updatePrice(dispatch, payload){
	dispatch({type: CREATE_SERVICE_REDUCER_ACTIONS.update_price, payload: payload});
}

export function updateDay(dispatch, payload){
	dispatch({type: CREATE_SERVICE_REDUCER_ACTIONS.update_day, payload: payload});
}