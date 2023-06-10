import express from "express";
import {register, 
		login,
		deleteAccount,
		verifyTokensAndCreateNewOnes} from "./../../controllers/auth/auth.controllers.js";
import {verifyAccessToken,
		verifyRefreshToken} from "./../../middleware/auth/auth.middleware.js";
		
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.patch("/delete_account/:accountType/:id", verifyAccessToken, deleteAccount);
authRouter.post("/create_access_token", verifyTokensAndCreateNewOnes);

export default authRouter;