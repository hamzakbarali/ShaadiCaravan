import express from "express";
import {verifyAccessToken, 
		verifyRefreshToken} from "./../../middleware/auth/auth.middleware.js";
import {createBooking, 
		getBookingsByVendor} from "./../../controllers/booking/booking.controllers.js";


const bookingRouter = express.Router();

bookingRouter.post("/create-booking", verifyAccessToken, createBooking);
bookingRouter.get("/get-bookings/:vendorId", verifyAccessToken, getBookingsByVendor);

export default bookingRouter;