import jwt from "jsonwebtoken";

export function verifyAccessToken(req, res, next){
	// jwt.verify(token, secretOrPublicKey, [options, callback])
	const {authorization} = req.headers;
	if(authorization){
		try{
			const token = authorization.split(" ")[1];
			const payload = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);
			req.user = payload;
			next();
		}
		catch(error){
			return res.status(403).json({error: error.message});
		}
	} 
	else{
		return res.status(401).json({"error": "You are not authenticated."});
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
