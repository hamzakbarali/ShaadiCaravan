import express from "express";
import {verifyAccessToken, 
		verifyRefreshToken} from "./../../middleware/auth/auth.middleware.js";
import {createForm,
		getFormById,
		updateForm,
		deleteForm} from "./../../controllers/form/form.controllers.js";

const formRouter = express.Router();

formRouter.post("/create-form", verifyAccessToken, createForm);

formRouter.get("/get-form", verifyAccessToken, getFormById);

formRouter.put("/update-form/:serviceId", verifyAccessToken, updateForm);

formRouter.put("/delete-form/:serviceId", verifyAccessToken, deleteForm);

export default formRouter;