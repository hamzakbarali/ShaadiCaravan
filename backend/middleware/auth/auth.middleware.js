import jwt from "jsonwebtoken";
import {ERRORS} from "./../../utils/errors/errors.js";

export function verifyAccessToken(req, res, next){
	// jwt.verify(token, secretOrPublicKey, [options, callback])
	// console.log("Middleware: HERE A", req.headers);
	const {authorization} = req.headers;
	if(authorization){
		//console.log("Middleware: HERE B", authorization)
		try{
			//console.log("Middleware: HERE C")
			const token = authorization.split(" ")[1];
			const payload = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);
			req.user = payload;
			// console.log("Middleware: HERE B");
			next();
		}
		catch(error){
			//console.log("Middleware: HERE D", error)
			return res.status(403).json({
				errorCode: ERRORS.expired_access_token, 
				errorMessage: error.message
			});
		}
	} 
	else{
		return res.status(403).json({"error": "You are not authenticated."});
	}
}

export function verifyRefreshToken(req, res, next){
	// jwt.verify(token, secretOrPublicKey, [options, callback])
	const {authorization} = req.body;
	if(authorization){
		try{
			const token = authorization.split(" ")[1];
			const payload = jwt.verify(token, process.env.REFRESH_TOKEN_PRIVATE_KEY);
			req.user = payload;
			next();
		}
		catch(error){
			return res.status(403).json({error: error.message});
		}
	} 
	else{
		res.status(401).json({error: "You are not authenticated"});
	}
}
