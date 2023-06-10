import mongoose from "mongoose";

const BookingSchema = mongoose.Schema({
	vendorId: {
		type: mongoose.Schema.Types.ObjectId, ref: "Vendor",
		required: true
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId, ref: "User",
		required: true
	},
	serviceId: {
		type: mongoose.Schema.Types.ObjectId, ref: "Service",
		required: true
	},
	softDelete : {
		type: Boolean,
		default: false,
	},
	deletionApproved:{
		type: Boolean,
		default: false
	},
	deleteRequest: {
		type: Boolean,
		default: false
	}
},
{
	timestamps: true
});

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;