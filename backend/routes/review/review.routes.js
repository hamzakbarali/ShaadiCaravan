import express from "express";
import {verifyAccessToken, 
		verifyRefreshToken} from "./../../middleware/auth/auth.middleware.js";
import {getAllReviewsById,
		getReviewByReviewId,
		postReview,
		updateReview,
		deleteReview} from "./../../controllers/review/review.controllers.js";
 
const reviewRouter = express.Router();

reviewRouter.get("/get_reviews", verifyAccessToken, getAllReviewsById);

reviewRouter.post("/post_review", verifyAccessToken, postReview);

reviewRouter.put("/update_review/:reviewId", verifyAccessToken, updateReview);

reviewRouter.get("/get_review/:reviewId", verifyAccessToken, getReviewByReviewId);

reviewRouter.put("/delete_review/:reviewId", verifyAccessToken, deleteReview);

export default reviewRouter;