import {SIGN_UP_REDUCER_ACTIONS} from "./imports.js";

export default function SignUpReducer(state, action){
	if(action.type === SIGN_UP_REDUCER_ACTIONS.update_firstname){
		return {
			...state,
			"firstName": {
				...state.firstName,
				"value" : action.payload,
			}
		};
	}
	else if(action.type === SIGN_UP_REDUCER_ACTIONS.update_lastname){
		return {
			...state,
			"lastName": {
				...state.lastName,
				"value" : action.payload,
			}
		};
	}
	else if(action.type === SIGN_UP_REDUCER_ACTIONS.update_email){
		return {
			...state,
			"email": {
				...state.email,
				"value" : action.payload,
			}
		};
	}
	else if(action.type === SIGN_UP_REDUCER_ACTIONS.update_password){
		return {
			...state,
			"password": {
				...state.password,
				"value" : action.payload,
			}
		};
	}
	else if(action.type === SIGN_UP_REDUCER_ACTIONS.update_account_type){
		return {
			...state,
			"accountType": {
				...state.accountType,
				"value" : action.payload,
			}
		};
	}
	else if(action.type === SIGN_UP_REDUCER_ACTIONS.update_contact_number){
		return {
			...state,
			"contactNumber": {
				...state.contactNumber,
				"value" : action.payload,
			}
		};
	}
	else if(action.type === SIGN_UP_REDUCER_ACTIONS.update_language){
		return {
			...state,
			"language": {
				...state.language,
				"value" : action.payload,
			}
		};
	}
	else if(action.type === SIGN_UP_REDUCER_ACTIONS.update_country){
		return {
			...state,
			"country": {
				...state.country,
				"value" : action.payload,
			}
		};
	}
	else if(action.type === SIGN_UP_REDUCER_ACTIONS.update_city){
		return {
			...state,
			"city": {
				...state.city,
				"value" : action.payload,
			}
		};
	}
	else if(action.type === SIGN_UP_REDUCER_ACTIONS.update_business_type){
		return {
			...state,
			"businessType": {
				...state.businessType,
				"value" : action.payload,
			}
		};
	}
	else if(action.type === SIGN_UP_REDUCER_ACTIONS.update_business_name){
		return {
			...state,
			"businessName": {
				...state.businessName,
				"value" : action.payload,
			}
		};
	}
	else if(action.type === SIGN_UP_REDUCER_ACTIONS.update_business_address){
		return {
			...state,
			"businessAddress": {
				...state.businessAddress,
				"value" : action.payload,
			}
		};
	}
	else if(action.type === SIGN_UP_REDUCER_ACTIONS.update_got_shop_already_with_us){
		return {
			...state,
			"gotShopAlreadyWithUs": {
				...state.gotShopAlreadyWithUs,
				"value" : action.payload,
			}
		};
	}
	else if(action.type === SIGN_UP_REDUCER_ACTIONS.update_validated){
		return {
			...state,
			"validated": {
				"value" : action.payload,
			}
		};
	}
	else if(action.type === SIGN_UP_REDUCER_ACTIONS.update_firstname_error){
		return {
			...state,
			"firstName": {
				...state.firstName,
				"error" : action.payload 
			}
		};
	}
	else if(action.type === SIGN_UP_REDUCER_ACTIONS.update_lastname_error){
		return {
			...state,
			"lastName": {
				...state.lastName,
				"error" : action.payload
			}
		};
	}
	else if(action.type === SIGN_UP_REDUCER_ACTIONS.update_email_error){
		return {
			...state,
			"email": {
				...state.email,
				"error" : action.payload
			}
		};
	}
	else if(action.type === SIGN_UP_REDUCER_ACTIONS.update_password_error){
		return {
			...state,
			"password": {
				...state.password,
				"error" :  action.payload
			}
		};
	}
	else if(action.type === SIGN_UP_REDUCER_ACTIONS.update_account_type_error){
		return {
			...state,
			"accountType": {
				...state.accountType,
				"error" :  action.payload
			}
		};
	}
	else if(action.type === SIGN_UP_REDUCER_ACTIONS.update_contact_number_error){
		return {
			...state,
			"contactNumber": {
				...state.contactNumber,
				"error" : action.payload 
			}
		};
	}
	else if(action.type === SIGN_UP_REDUCER_ACTIONS.update_language_error){
		return {
			...state,
			"language": {
				...state.language,
				"error" :  action.payload
			}
		};
	}
	else if(action.type === SIGN_UP_REDUCER_ACTIONS.update_country_error){
		return {
			...state,
			"country": {
				...state.country,
				"error" :  action.payload
			}
		};
	}
	else if(action.type === SIGN_UP_REDUCER_ACTIONS.update_city_error){
		return {
			...state,
			"city": {
				...state.city,
				"error" :  action.payload
			}
		};
	}
	else if(action.type === SIGN_UP_REDUCER_ACTIONS.update_business_type_error){
		return {
			...state,
			"businessType": {
				...state.businessType,
				"error" :  action.payload
			}
		};
	}
	else if(action.type === SIGN_UP_REDUCER_ACTIONS.update_business_name_error){
		return {
			...state,
			"businessName": {
				...state.businessName,
				"error" :  action.payload
			}
		};
	}
	else if(action.type === SIGN_UP_REDUCER_ACTIONS.update_business_address_error){
		return {
			...state,
			"businessAddress": {
				...state.businessAddress,
				"error" :  action.payload
			}
		};
	}
	else if(action.type === SIGN_UP_REDUCER_ACTIONS.update_got_shop_already_with_us_error){
		return {
			...state,
			"gotShopAlreadyWithUs": {
				...state.gotShopAlreadyWithUs,
				"error" :  action.payload,
			}
		};
	}
	else{
		return state;
	}
}
