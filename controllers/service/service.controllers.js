import {verifyAccessToken, 
		verifyRefreshToken} from "./../../middleware/auth/auth.middleware.js";
import Service from "./../../models/service/Service.js";

export async function createService(req, res, next){
	const newService = new Service({
		serviceName: "Taanda Hall",
		serviceType: "wedding-hall",
		vendorId: req.body.vendorId
	});

	const isServiceCreated = await newService.save();
	return res.json(isServiceCreated);
	// return res.json(req.body.vendorId);
}
