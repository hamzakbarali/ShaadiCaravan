import mongoose from "mongoose";
import Vendor   from "./../../models/vendor/Vendor.js";
import User     from "./../../models/user/User.js";
import Review   from "./../../models/review/Review.js";
import {ERRORS} from "./../../utils/errors/errors.js";

export async function getAllReviewsById(req, res, next){
	const {id} = req.query;
	if(id){
		try{
			const retrievedVendor = await Vendor.find({_id: id});
			const retrievedUser   = await User.find({_id: id});  

			// When id is of vendor
			if(retrievedVendor.length == 1){
				const retrievedReviews = await Review.find({vendorId: id});
				if(retrievedReviews){
					console.log("Vendor")
					return res.status(200).json({
						vendorId: id,
						reviews: retrievedReviews, 
						len: retrievedReviews.length,
					});
				}
			} 
			// When id is of user and user wants to see all his reviews
			else if(retrievedUser.length == 1){
				const retrievedReviews = await Review.find({userId: id});
				if(retrievedReviews){
					console.log("USER")
					return res.status(200).json({
						userId: id,
						reviews: retrievedReviews,
						len: retrievedReviews.length 
					});
				}  
			}
			// When given id in query param is wrong but we don't tell client this for security
			else{
				return res.status(400).json({
					errorCode: ERRORS.error_processing_request,
					errorMessage: "Please, try again."
				});
			}
		}
		catch(error){
			return res.status(502).json({
				error,
				errorCode: ERRORS.error_processing_request,
				errorMessage: "Please, try again."
			});
		}
	}
	else{
		return res.status(400).json({
			errorCode: ERRORS.request_data_not_given,
			errorMessage: "Invalid request."
		});
	}
}

export async function postReview(req, res, next){
	return res.json({message: "Yet to do"})
}