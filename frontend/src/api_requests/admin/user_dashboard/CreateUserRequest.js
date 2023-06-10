import axios from "axios";
import { API_ROUTE_URL, Local_Storage_Strings } from "./../../../utils/imports.js";
export async function createUserRequest(signupstate, dispatch, navigate){
	let signup_res;
	try{
		if(signupstate.accountType === "user"){
			signup_res = await axios.post(API_ROUTE_URL.create_user, {
				firstName: 		signupstate.firstName, 
				lastName: 		signupstate.lastName,
				email: 			signupstate.email,
				password: 		signupstate.password,
				accountType: 	signupstate.accountType, 
				language: 		signupstate.language,
				contactNumber:  signupstate.contactNumber,
			});
		}
		if(signup_res.status === 201){
			console.log('User created successfully');
            return true;
		}
	}
	catch(err){
		if(err.code === "ERR_BAD_REQUEST"){
			console.log("ERROR:", err.response.data.errorMessage);
		}
		else{
			console.log("ERROR:", err);	
		}
	}
}