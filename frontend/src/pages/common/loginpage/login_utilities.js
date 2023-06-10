export function validateLoginInfo(email, password){
	if(email.length === 0 || password.length === 0){
		return {result: false, message: "Please, enter an email and password"};
	}
	else if(!email.includes("@") || !email.includes(".")){
		return {result: false, message: "Please, enter a correct email."};
	}
	return {result: true};
}
