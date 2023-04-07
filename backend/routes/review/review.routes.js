import express from "express";
import {verifyAccessToken, 
		verifyRefreshToken} from "./../../middleware/auth/auth.middleware.js";
import {getAllReviewsById,
		postReview} from "./../../controllers/review/review.controllers.js";
 
const reviewRouter = express.Router();

reviewRouter.get("/get_reviews", verifyAccessToken, getAllReviewsById);

reviewRouter.post("/post_review", verifyAccessToken, postReview);

export default reviewRouter;