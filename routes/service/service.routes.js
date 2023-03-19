import express from "express";
import {verifyAccessToken, 
		verifyRefreshToken} from "./../../middleware/auth/auth.middleware.js";
import {createService} from "./../../controllers/service/service.controllers.js";

const serviceRouter = express.Router();

serviceRouter.post("/create-service", verifyAccessToken, createService);

serviceRouter.get("/get-service/:serviceId", verifyAccessToken);

export default serviceRouter;