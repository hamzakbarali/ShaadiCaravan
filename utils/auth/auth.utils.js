import jwt from "jsonwebtoken";

export async function createAccessToken(id, firstName, lastName, email){
	// jwt.sign(payload, secretOrPrivateKey, [options, callback])
	if(id && firstName && lastName && email){
		try{
			const payload = {
				id: id,
				firstName: firstName,
				lastName: lastName,
				email: email
			};
			const secretOrPrivateKey = process.env.ACCESS_TOKEN_PRIVATE_KEY;
			const options = {
				"expiresIn" : "1h", // Change this back to 1h
				"issuer" : "ShaadiCaravan",
				"audience" : id.toString()
			};
			const accessToken = await jwt.sign(payload, secretOrPrivateKey, options);
			return accessToken;
		}
		catch(error){
			return error.message;
		}
	}
	else{
		return "No payload";
	}
}

export async function createRefreshToken(id, firstName, lastName, email){
	// jwt.sign(payload, secretOrPrivateKey, [options, callback])
	if(id && firstName && lastName && email){
		try{
			const payload = {
				lastName: lastName,
				email: email,
				firstName: firstName,
				id: id
			};
			const secretOrPrivateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;
			const options = {
				"expiresIn" : "1y",
				"issuer" : "ShaadiCaravan",
				"audience" : id.toString()
			};
			const refreshToken = await jwt.sign(payload, secretOrPrivateKey, options);
			return refreshToken;
		}
		catch(error){
			return error.message;
		}
	}
	else{
		return "No payload";
	}
}