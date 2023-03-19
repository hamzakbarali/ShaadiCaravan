import mongoose from "mongoose";

const ReviewSchema = mongoose.Schema({
	vendorId: {
		type: mongoose.Schema.Types.ObjectId, ref: "Vendor",
		required: true
	},
	businessName: {
		type: String,
		trim: true,
		required: true
	},
	vendorProfilePicture: {
		type: String,
		required: true,
		trim: true,
		default:"vendor.png"
	},
	userId : {
		type: mongoose.Schema.Types.ObjectId, ref: "User",
		required: true
	},
	userFirstName : {
		type: String,
		trim: true,
		required: true
	},
	userLastName : {
		type: String,
		trim: true,
		required: true
	},
	userProfilePicture: {
		type: String,
		trim: true,
		required: true,
		default: "user.png",
	},
	review : {
		type: String,
		trim: true,
		required: [true, "|Please, enter a review."],
		minLength: [3, "|Review should be at least 3 characters long. Got '{VALUE}'"]
	},
	rating : {
		type: Number,
		required: true,
		min: [0, "|Rating should be at least 0."],
		max: [5, "|Rating cannot be more than 5"]
	},
	verifiedPurchase : {
		type: Boolean,
		required: true,
		default: false
	},
	softDelete: {
		type: Boolean,
		default: false
	}
},
{
	timestamps: true
});

const Review = mongoose.model("Review", ReviewSchema);

export default Review;