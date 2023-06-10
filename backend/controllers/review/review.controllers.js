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
	const {vendorId, businessName, vendorProfilePicture, userId, userFirstName, userLastName, userProfilePicture, review, rating, verifiedPurchase} = req.body;
	if(userId && vendorId && businessName && review && rating){
		try{
			const newReview = new Review({
				vendorId : vendorId.trim(),
				businessName: businessName.trim(),
				vendorProfilePicture: vendorProfilePicture.trim(),
				userId: userId.trim(),
				userFirstName: userFirstName.trim(),
				userLastName: userLastName.trim(),
				userProfilePicture: userProfilePicture.trim(),
				review: review.trim(),
				rating: rating,
				verifiedPurchase: verifiedPurchase.trim()
			});
			const isNewReviewCreated = await newReview.save();
			if(isNewReviewCreated){
				return res.status(200).json({
					isNewReviewCreated
				});
			}
			else{
				// Server error in creating review
				return res.status(502).json({
					errorCode: ERRORS.error_creating_review,
					errorMessage: "Please, try creating the review again"
				});	
			}
		}
		catch(err){
			// If vendor has entered invalid service information
			if(err.name === "ValidationError"){
				return res.status(400).json({
					errorCode: ERRORS.invalid_information,
					errorMessage: err.message.split("|")[1]
				});
			}
			else{
				// Server error in creating review
				return res.status(502).json({
					errorCode: ERRORS.error_creating_review,
					errorMessage: "Please, try creating thereview again"
				});	
			}
		}
	}
	else{
		return res.status(400).json({
			errorCode: ERRORS.request_data_not_given,
			errorMessage: "Invalid request."
		});
	}
}
export async function getReviewByReviewId(req, res, next){
	const {reviewId} = req.params;
	if(reviewId){
		try{
			const reviewToFetch = await Review.find({_id: reviewId});
			if(reviewToFetch.length == 1){
				return res.status(200).json(reviewToFetch[0]);
			}
			else{
				return res.status(502).json({
					errorCode: ERRORS.error_processing_request,
					errorMessage: "Please, try again."
				});
			}
		}
		catch(err){
			return res.status(502).json({
				errorCode: ERRORS.error_processing_request,
				errorMessage: "Please, tryy again."
			});
		}
	}
	else{
		return res.status(400).json({
			errorCode: ERRORS.request_data_not_given, 
			errorMessage: "Invalid Request"
		});
	}
}
export async function updateReview(req, res, next){
	const {reviewId} = req.params;
	const {review, rating, verifiedPurchase, softDelete} = req.body;
	if(reviewId){
		try{
			if(review || rating || verifiedPurchase || softDelete)
			{
				const reviewtoUpdate = await Review.findOneAndUpdate(
					{
						_id: reviewId
					},
					{
						review: (review) ? review.trim() : review,
						rating: (rating) ? rating: rating,
						verifiedPurchase: verifiedPurchase,
						softDelete: softDelete
					},
					{
						new: true
					}
				);
				if(reviewtoUpdate){
					return res.status(200).json(reviewtoUpdate);
				}
				else{
					return res.status(502).json({
						errorCode: ERRORS.error_processing_request,
						errorMessage: "Please, try again."
					});	
				}
			}
			else{
				return res.status(400).json({
					errorCode: ERRORS.request_data_not_given, 
					errorMessage: "Invalid Request"
				});
			}
		}
		catch(err){
			return res.status(400).json({
				errorCode: ERRORS.request_data_not_given,
				errorMessage: "Invalid request."
			});
		}
	}
	else{
		// When required parameters are not passed from frontend
		return res.status(400).json({
			errorCode: ERRORS.request_data_not_given, 
			errorMessage: "Invalid Request"
		});
	}
}
export async function deleteReview(req, res, next)
{
	const {reviewId} = req.params;
	if(reviewId){
		try{
			const reviewToDelete = await Review.findOneAndUpdate(
				{
					_id: reviewId
				}, 
				{
					softDelete: true
				},
				{
					new: true
				});
			if(reviewToDelete){
				return res.status(200).json(reviewToDelete);
			}
			else{
				return res.status(502).json({
					errorCode: ERRORS.error_processing_request,
					errorMessage: "Please, try again."
				});
			}
		}
		catch(err){
			return res.status(502).json({
				errorCode: ERRORS.error_processing_request,
				errorMessage: "Please, try again."
			});
		}
	}
	else{
		return res.status(400).json({
			errorCode: ERRORS.request_data_not_given, 
			errorMessage: "Invalid Request"
		});
	}
}