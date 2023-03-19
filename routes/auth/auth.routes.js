import express from "express";
import {register, 
		login,
		deleteAccount} from "./../../controllers/auth/auth.controllers.js";
import {verifyAccessToken,
		verifyRefreshToken} from "./../../middleware/auth/auth.middleware.js";
		
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.patch("/delete-account/:accountType/:id", verifyAccessToken, deleteAccount);

export default authRouter;