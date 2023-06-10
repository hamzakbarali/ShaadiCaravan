import express from "express";
import {verifyAccessToken, 
		verifyRefreshToken} from "./../../middleware/auth/auth.middleware.js";

import { getAllUsers, 
         getAllVendors,
         getAllServices,
         updateService,
         deleteService,
         deleteVendor,
         deleteUser,
         login,
         updateUser,
         registerUser} from "../../controllers/admin/admin.controllers.js";

const adminRouter = express.Router();

adminRouter.get("/get-all-users", verifyAccessToken, getAllUsers);
adminRouter.get("/get-all-vendors", verifyAccessToken, getAllVendors);
adminRouter.get("/get-all-services", verifyAccessToken, getAllServices);
adminRouter.put("/update-service", verifyAccessToken, updateService);
adminRouter.delete("/delete-service/:serviceId", verifyAccessToken, deleteService);
adminRouter.delete("/delete-vendor/:vendorId", verifyAccessToken, deleteVendor);
adminRouter.delete("/delete-user/:userId", verifyAccessToken, deleteUser);
adminRouter.post("/login", login);
adminRouter.put("/update-user/:userId", verifyAccessToken, updateUser);
adminRouter.post("/create-user", registerUser);


export default adminRouter;