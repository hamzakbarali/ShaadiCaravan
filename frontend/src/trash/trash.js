// 2-6-2023 - Code from LoginRequest.js file
import {LoginState} from "./../../../../state/common/imports.js";

function validateLoginInfo(email, password){
	if(email.length === 0 || password.length === 0){
		return {result: false, message: "Please, enter an email and password"};
	}
	else if(!email.includes("@") || !email.includes(".")){
		return {result: false, message: "Please, enter a correct email."};
	}
	return {result: true};
}

export async function MakeLoginAPIRequest(route ){
	try{
		let validation = validateLoginInfo(email, password);
		if(validation.result){
			const loginRes = await axios.post(API_ROUTE_URL.login, {
			email   : email,
			password: password
			});
			if(loginRes.status === 200){
				localStorage.setItem(Local_Storage_Strings.accesstoken, loginRes.data.accessToken);
				localStorage.setItem(Local_Storage_Strings.refreshtoken, loginRes.data.refreshToken);
				localStorage.setItem(Local_Storage_Strings.accounttype, loginRes.data.accountType);
				localStorage.setItem(Local_Storage_Strings.userid, loginRes.data.userId);
				setAuthenticated(true);
				localStorage.setItem(Local_Storage_Strings.authenticated, true);
				setEmail("");
				setPassword("");
				navigate(FRONTEND_PATH_URLS.homepage);
			}
		}
		else{
			setErrorMessage(validation.message);
		}

	}
	catch(err){
		setErrorMessage(err.response.data.errorMessage);
		setAuthenticated(false);
		localStorage.setItem(Local_Storage_Strings.authenticated, false);
	}
}

// 5-6-2023 - Code from SignUpRequest.js file

export function ValidateSignUpForm(signupstate) {
	for (let key in signupstate) {	
	  	if(key !== "validated"){
	    	if(signupstate.hasOwnProperty(key)) {
	    		if (typeof signupstate[key] === 'object' && signupstate[key] !== null) {
		        	ValidateSignUpForm(signupstate[key]); // Recursively iterate nested object
		      	} 
		      	else {
		      		if(key === "error"){
		      			if(signupstate[key].length !== 0)
		      			{
		      				return false;
		      			}
		      		}
		      	}
	    	}
	  	}
  	}
  	return true;
}

// 5-6-2023 - Code from SignUpPage.jsx file

console.log("HERE A", signupstate);
console.log("HERE B", "CheckSignUpFormForErrors(signupstate)", CheckSignUpFormForErrors(signupstate));
console.log("HERE C", "signupstate.validated", signupstate.validated);
console.log("HERE D", "isFormCorrect", isFormCorrect);
console.log("\n");

// 6-6-2023 - Code from Services.jsx file in the components folder

// <ServiceCard businessName="Taanda Halls" img={DefaultImg} location="Karachi" rating="3.7/5" reviews="(43)"/>
// <ServiceCard businessName="Beachview Halls" img={Couple} location="Islamabad" rating="4/5" reviews="(43)"/>
// <ServiceCard businessName="Sloth Halls" img={Peacock} location="Lahore" rating="2/5" reviews="(43)"/>
// <ServiceCard businessName="National Sailing Club Halls" img={Doli} location="Karachi" rating="1/5" reviews="(43)"/>

// <ServiceCard businessName="Taanda Halls" img={DoliIcon} location="Karachi" rating="2.4/5" reviews="(43)"/>
// <ServiceCard businessName="Beachview Halls" img={Couple} location="Islamabad" rating="3.2/5" reviews="(43)"/>
// <ServiceCard businessName="Sloth Halls" img={Peacock} location="Lahore" rating="4.5/5" reviews="(43)"/>
// <ServiceCard businessName="National Sailing Club Halls" img={Doli} location="Karachi" rating="5/5" reviews="(43)"/>

// <ServiceCard businessName="Taanda Halls" img={DefaultImg} location="Karachi" rating="3.7/5" reviews="(43)"/>
// <ServiceCard businessName="Beachview Halls" img={Couple} location="Lahore" rating="3.7/5" reviews="(43)"/>
// <ServiceCard businessName="Sloth Halls" img={Peacock} location="Islamabad" rating="3.7/5" reviews="(43)"/>
// <ServiceCard businessName="National Sailing Club Halls" img={Doli} location="Karachi" rating="3.7/5" reviews="(43)"/>

// <ServiceCard businessName="Taanda Halls" img={DefaultImg} location="Lahore" rating="3.7/5" reviews="(43)"/>
// <ServiceCard businessName="Beachview Halls" img={Couple} location="Karachi" rating="3.7/5" reviews="(43)"/>
// <ServiceCard businessName="Sloth Halls" img={Peacock} location="Karachi" rating="3.7/5" reviews="(43)"/>
// <ServiceCard businessName="National Sailing Club Halls" img={Doli} location="Islamabad" rating="3.7/5" reviews="(43)"/>

