import axios from "axios";
import {API_ROUTE_URL, FRONTEND_PATH_URLS, Local_Storage_Strings} from "./../../../../utils/imports.js";
import {useNavigate} from "react-router-dom";
import {updateValidated, updateFirstNameError, updateLastNameError, 
updateEmailError, updatePasswordError, updateContactNumberError, 
updateCountryError, updateCityError, updateBusinessNameError, 
updateBusinessAddressError, updateGotShopAlreadyWithUsError} 
from "./../../../../reducers/common/auth/registration_reducer/imports.js";

export async function MakeSignUpAPIRequest(signupstate, dispatch, navigate){
	// console.log("HERE A", signupstate);
	let signup_res;
	try{
		if(signupstate.accountType.value === "user"){
			// console.log("HERE B");
			signup_res = await axios.post(API_ROUTE_URL.register, {
				firstName: 		signupstate.firstName.value, 
				lastName: 		signupstate.lastName.value,
				email: 			signupstate.email.value,
				password: 		signupstate.password.value,
				accountType: 	signupstate.accountType.value, 
				language: 		signupstate.language.value,
				contactNumber:  signupstate.contactNumber.value,
			});
		}
		else{
			// console.log("HERE C");
			signup_res = await axios.post(API_ROUTE_URL.register, {
				firstName: 				signupstate.firstName.value, 
				lastName: 				signupstate.lastName.value,
				email: 					signupstate.email.value,
				password: 				signupstate.password.value,
				accountType: 			signupstate.accountType.value, 
				language: 				signupstate.language.value,
				contactNumber: 			signupstate.contactNumber.value,
				businessName: 			signupstate.businessName.value,
				businessType: 			signupstate.businessType.value,
				businessAddress: 		signupstate.businessAddress.value,
				gotShopAlreadyWithUs: 	signupstate.gotShopAlreadyWithUs.value,
				country: 				signupstate.country.value,
				city: 					signupstate.city.value
			});
		}
		if(signup_res.status === 201){
			// console.log("HERE F", signup_res);
			localStorage.setItem(Local_Storage_Strings.accesstoken, signup_res.data.accessToken);
			localStorage.setItem(Local_Storage_Strings.refreshtoken, signup_res.data.refreshToken);
			localStorage.setItem(Local_Storage_Strings.accounttype, signup_res.data.accountType);
			localStorage.setItem(Local_Storage_Strings.userid, signup_res.data.userId);
			localStorage.setItem(Local_Storage_Strings.authenticated, true);
			navigate(FRONTEND_PATH_URLS.homepage);
		}
		// console.log("HERE D", signup_res);
	}
	catch(err){
		if(err.code === "ERR_BAD_REQUEST"){
			console.log("ERROR:", err.response.data.errorMessage);
		}
		else{
			console.log("ERROR:", err);	
		}
		// console.log("HERE E", err);
	}
}

export function CheckSignUpFormForErrors(signupstate) {
	for (let key in signupstate) {	
	  	if(key !== "validated"){
	    	if(signupstate[key]["error"].length !== 0){
	    		return false;
	    	}
	  	}
  	}
  	return true;
}

export function ValidateSignUpFields(signupstate, dispatch){
	updateValidated(dispatch, true);
	ValidateFirstName(signupstate, dispatch);
	ValidateLastName(signupstate, dispatch);
	ValidateContactNumber(signupstate, dispatch);
	ValidateEmail(signupstate, dispatch);
	ValidatePassword(signupstate, dispatch);
	if(signupstate.accountType.value === "vendor"){
		ValidateCountry(signupstate, dispatch);
		ValidateCity(signupstate, dispatch);
		ValidateBusinessName(signupstate, dispatch);
		ValidateBusinessAddress(signupstate, dispatch);
		ValidateGotShopAlreadyWithUs(signupstate, dispatch);
	}
	else{
		updateCountryError(dispatch, "");
		updateCityError(dispatch, "");	
		updateBusinessNameError(dispatch, "");
		updateBusinessAddressError(dispatch, "");
		updateGotShopAlreadyWithUsError(dispatch, "");	
	}
}

function ValidateFirstName(signupstate, dispatch){
	if(signupstate.firstName.value.length < 2){
		updateFirstNameError(dispatch, "Please, enter your first name");
	}
	else{
		updateFirstNameError(dispatch, "");
	}
}

function ValidateLastName(signupstate, dispatch){
	if(signupstate.lastName.value.length < 2){
		updateLastNameError(dispatch, "Please, enter your last name");
	}
	else{
		updateLastNameError(dispatch, "");
	}
}

function ValidateContactNumber(signupstate, dispatch){
	if(signupstate.contactNumber.value.length === 0){
		updateContactNumberError(dispatch, "Please, enter your contact number.");
	} 
	else if(!/^\d+$/.test(signupstate.contactNumber.value)){
		updateContactNumberError(dispatch, "Please, enter a correct contact number.");
	}
	else{
		updateContactNumberError(dispatch, "");
	}
}

function ValidateEmail(signupstate, dispatch){
	if(signupstate.email.value.length === 0){
		updateEmailError(dispatch, "Please, enter your email.");
	}
	else if(!signupstate.email.value.includes("@") || !signupstate.email.value.includes(".")){
		updateEmailError(dispatch, "Please, enter a correct email.");
	}
	else{
		updateEmailError(dispatch, "");
	}
}

function ValidatePassword(signupstate, dispatch){
	if(signupstate.password.value.length === 0){
		updatePasswordError(dispatch, "Please, enter a password.");
	}
	else if(signupstate.password.value.length < 6){
		updatePasswordError(dispatch, "Please, enter a password of at least 6 characters.");
	}
	else{
		updatePasswordError(dispatch, "");	
	}
}

function ValidateCountry(signupstate, dispatch){
	if(signupstate.country.value.length === 0){
		updateCountryError(dispatch, "Please, enter your country.");
	}
	else if(signupstate.country.value.length < 5){
		updateCountryError(dispatch, "Please, enter a proper country name.");
	}
	else{
		updateCountryError(dispatch, "");	
	}
}

function ValidateCity(signupstate, dispatch){
	if(signupstate.city.value.length === 0){
		updateCityError(dispatch, "Please, enter your city.");
	}
	else if(signupstate.city.value.length < 4){
		updateCityError(dispatch, "Please, enter a proper city name.");
	}
	else{
		updateCityError(dispatch, "");	
	}
}

function ValidateBusinessName(signupstate, dispatch){
	if(signupstate.businessName.value.length === 0){
		updateBusinessNameError(dispatch, "Please, enter your business's name.");
	}
	else{
		updateBusinessNameError(dispatch, "");	
	}
}

function ValidateBusinessAddress(signupstate, dispatch){
	if(signupstate.businessAddress.value.length === 0){
		updateBusinessAddressError(dispatch, "Please, enter your business address.");
	}
	else if(signupstate.businessAddress.value.length < 6){
		updateBusinessAddressError(dispatch, "Please, enter a proper business address.");
	}
	else{
		updateBusinessAddressError(dispatch, "");	
	}
}

function ValidateGotShopAlreadyWithUs(signupstate, dispatch){
	if(signupstate.gotShopAlreadyWithUs.value && signupstate.accountType.value === "user"){
		updateGotShopAlreadyWithUsError(dispatch, "A User account type cannot have a business on ShaadiCaravan.")
	}
	else{
		updateGotShopAlreadyWithUsError(dispatch, "");	
	}
}


