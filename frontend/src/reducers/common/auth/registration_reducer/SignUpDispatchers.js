import {SIGN_UP_REDUCER_ACTIONS} from "./imports.js";

export function updateFirstName(dispatch, firstname){
	dispatch({
		type: SIGN_UP_REDUCER_ACTIONS.update_firstname, 
		payload: firstname
	});
}

export function updateLastName(dispatch, lastname){
	dispatch({
		type: SIGN_UP_REDUCER_ACTIONS.update_lastname, 
		payload: lastname
	});
}

export function updateEmail(dispatch, email){
	dispatch({
		type: SIGN_UP_REDUCER_ACTIONS.update_email, 
		payload: email
	});
}

export function updatePassword(dispatch, password){
	dispatch({
		type: SIGN_UP_REDUCER_ACTIONS.update_password, 
		payload: password
	});
}

export function updateAccountType(dispatch, account_type){
	dispatch({
		type: SIGN_UP_REDUCER_ACTIONS.update_account_type, 
		payload: account_type
	});
}

export function updateContactNumber(dispatch, contact_num){
	dispatch({
		type: SIGN_UP_REDUCER_ACTIONS.update_contact_number, 
		payload: contact_num
	});
}

export function updateLanguage(dispatch, language){
	dispatch({
		type: SIGN_UP_REDUCER_ACTIONS.update_language, 
		payload: language
	});
}

export function updateCountry(dispatch, country){
	dispatch({
		type: SIGN_UP_REDUCER_ACTIONS.update_country, 
		payload: country
	});
}

export function updateCity(dispatch, city){
	dispatch({
		type: SIGN_UP_REDUCER_ACTIONS.update_city, 
		payload: city
	});
}

export function updateBusinessType(dispatch, business_type){
	dispatch({
		type: SIGN_UP_REDUCER_ACTIONS.update_business_type, 
		payload: business_type
	});
}

export function updateBusinessName(dispatch, business_name){
	dispatch({
		type: SIGN_UP_REDUCER_ACTIONS.update_business_name, 
		payload: business_name
	});
}

export function updateBusinessAddress(dispatch, business_address){
	dispatch({
		type: SIGN_UP_REDUCER_ACTIONS.update_business_address, 
		payload: business_address
	});
}

export function updateGotShopAlreadyWithUs(dispatch, got_shop_already_with_us){
	dispatch({
		type: SIGN_UP_REDUCER_ACTIONS.update_got_shop_already_with_us, 
		payload: got_shop_already_with_us
	});
}

export function updateValidated(dispatch, validated){
	dispatch({
		type: SIGN_UP_REDUCER_ACTIONS.update_validated, 
		payload: validated
	});
}

export function updateFirstNameError(dispatch, error){
	dispatch({
		type: SIGN_UP_REDUCER_ACTIONS.update_firstname_error, 
		payload: error
	});
}

export function updateLastNameError(dispatch, error){
	dispatch({
		type: SIGN_UP_REDUCER_ACTIONS.update_lastname_error, 
		payload: error
	});
}

export function updateEmailError(dispatch, error){
	dispatch({
		type: SIGN_UP_REDUCER_ACTIONS.update_email_error, 
		payload: error
	});
}

export function updatePasswordError(dispatch, error){
	dispatch({
		type: SIGN_UP_REDUCER_ACTIONS.update_password_error, 
		payload: error
	});
}

export function updateAccountTypeError(dispatch, error){
	dispatch({
		type: SIGN_UP_REDUCER_ACTIONS.update_account_type_error, 
		payload: error
	});
}

export function updateContactNumberError(dispatch, error){
	dispatch({
		type: SIGN_UP_REDUCER_ACTIONS.update_contact_number_error, 
		payload: error
	});
}

export function updateLanguageError(dispatch, error){
	dispatch({
		type: SIGN_UP_REDUCER_ACTIONS.update_language_error, 
		payload: error
	});
}

export function updateCountryError(dispatch, error){
	dispatch({
		type: SIGN_UP_REDUCER_ACTIONS.update_country_error, 
		payload: error
	});
}

export function updateCityError(dispatch, error){
	dispatch({
		type: SIGN_UP_REDUCER_ACTIONS.update_city_error, 
		payload: error
	});
}

export function updateBusinessTypeError(dispatch, error){
	dispatch({
		type: SIGN_UP_REDUCER_ACTIONS.update_business_type_error, 
		payload: error
	});
}

export function updateBusinessNameError(dispatch, error){
	dispatch({
		type: SIGN_UP_REDUCER_ACTIONS.update_business_name_error, 
		payload: error
	});
}

export function updateBusinessAddressError(dispatch, error){
	dispatch({
		type: SIGN_UP_REDUCER_ACTIONS.update_business_address_error, 
		payload: error
	});
}

export function updateGotShopAlreadyWithUsError(dispatch, error){
	dispatch({
		type: SIGN_UP_REDUCER_ACTIONS.update_got_shop_already_with_us_error, 
		payload: error
	});
}


// updateFirstName, updateLastName, updateEmail, updatePassword, updateAccountType,
//  updateContactNumber, updateLanguage, updateCountry, updateCity, updateBusinessType,
//  updateBusinessName, updateBusinessAddress, updateGotShopAlreadyWithUs, updateValidated, 
//  updateFirstNameError, updateLastNameError, updateEmailError, updatePasswordError,
//  updateAccountTypeError, updateContactNumberError, updateLanguageError, updateCountryError,
//  updateCityError, updateBusinessTypeError, updateBusinessNameError, updatebusinessaddressError,
//   updateGotShopAlreadyWithUsError