import express from "express";
import {verifyAccessToken, 
		verifyRefreshToken} from "./../../middleware/auth/auth.middleware.js";
import {createService,
		getServiceByServiceId,
		deleteService,
		getAllVendorServices,
		updateService} from "./../../controllers/service/service.controllers.js";

const serviceRouter = express.Router();

serviceRouter.post("/create-service", verifyAccessToken, createService);

serviceRouter.get("/get-service/:serviceId", verifyAccessToken, getServiceByServiceId);

serviceRouter.put("/delete-service/:serviceId", verifyAccessToken, deleteService);

serviceRouter.get("/get-all-services/:businessName", verifyAccessToken, getAllVendorServices);

serviceRouter.put("/update-service/:serviceId", verifyAccessToken, updateService);

export default serviceRouter;