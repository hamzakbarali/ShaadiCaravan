import {ERRORS} from "./../../utils/errors/errors.js";
import {ACCOUNT_TYPE} from "./../../utils/constants/constants.js";
import Booking from "./../../models/booking/Booking.js";

export async function createBooking(req, res, next){
	const {userId, vendorId, serviceId} = req.body;
	if(userId && vendorId && serviceId){
		try{
			const bookingToCreate = new Booking({
				userId: userId.trim(),
				vendorId: vendorId.trim(),
				serviceId: serviceId.trim()
			});
			const newBookingCreated = await bookingToCreate.save();
			if(newBookingCreated){
				return res.status(200).json({
					booking: newBookingCreated,
					success: true
				});
			}
			else{
				return res.status(400).json({
					errorCode: ERRORS.error_creating_booking,
					errorMessage: "Please, try creating the booking again.",
					success: false
				});	
			}
		}
		catch(err){
			// If vendor has entered invalid booking information
			if(err.name === "ValidationError"){
				return res.status(400).json({
					errorCode: ERRORS.invalid_information,
					errorMessage: err.message.split("|")[1],
					success: false
				});
			}
			// Server error in creating booking
			else{
				return res.status(502).json({
					errorCode: ERRORS.error_creating_booking,
					errorMessage: "Please, try creating the booking again.",
					success: false
				});	
			}
		}
	}
	else{
		// When required parameters are not passed from frontend
		return res.status(400).json({
			errorCode: ERRORS.request_data_not_given, 
			errorMessage: "Invalid Request",
			success: false
		});
	}
}	

export async function getBookingsByVendor(req, res, next){
	const {vendorId} = req.params;
	try{
		
		const bookings = await Booking.find({vendorId: vendorId});
		if(bookings){
			return res.status(200).json({
				booking: bookings.length,
				success: true
			});
		}
		else{
			return res.status(400).json({
				booking: 0,
				success: false
			});
		}
	}
	catch(error){
		return res.status(502).json({
			errorCode: ERRORS.error_processing_request,
			errorMessage: "Please, try again.",
			success: false
		});
	}
}