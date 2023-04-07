import express from "express";
import {verifyAccessToken, 
		verifyRefreshToken} from "./../../middleware/auth/auth.middleware.js";
import {updateProfile, 
		getProfile} from "./../../controllers/profile/profile.controllers.js";

const profileRouter = express.Router();

profileRouter.get("/get_profile/:accountType/:id", verifyAccessToken, getProfile);

profileRouter.put("/update_profile/:accountType/:id", verifyAccessToken, updateProfile);

export default profileRouter;