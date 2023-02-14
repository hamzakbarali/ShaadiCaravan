import express from "express";
import {registerUser, 
		loginUser, 
		verifyPassword, 
		resetPassword, 
		removeUser,
		refreshAccessToken} from "../../controllers/auth/auth.controller.js";
		
import {verifyAccessToken,
		verifyRefreshToken} from "../../middleware/auth/auth.middleware.js";

const authRouter = express.Router();

// For registering user //
authRouter.post("/register", registerUser);

// For logging in user //
authRouter.post("/login", loginUser);

// For verifying user's password before the password is reset
// authRouter.post("/password_reset", verifyPassword);

// For updating password
authRouter.patch("/password_reset", verifyAccessToken, resetPassword);

// For deleting user
authRouter.delete("/remove_user", verifyAccessToken, removeUser);

// For refreshing the access token after it has expired
authRouter.post("/refresh_token", verifyRefreshToken, refreshAccessToken);

export default authRouter;