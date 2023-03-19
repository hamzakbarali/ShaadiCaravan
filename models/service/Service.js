import mongoose from "mongoose";

const ServiceSchema = mongoose.Schema({
	"serviceName": {
		type: String,
		required: [true, "|Please, enter a name for your service."],
		minLength: [5, "|Service Name must be at least 5 characters long. Got '{VALUE}'"],
		trim: true
	},
	serviceType: {
		type: String,
		required: [true, "|Please, choose a service type."],
		enum: {
			values : ["wedding-hall", "catering", "jewelry", "clothes", "decoration", "furniture"],
			message: "|{VALUE} is not valid."
		},
		trim: true
	},
	vendorId: {
		type: mongoose.Schema.Types.ObjectId, ref: "Vendor",
		required: true
	},
	businessType:{
		type      : String,
		trim      : true,
		required  : [true, "|Please, choose a business type."],
		enum : {
			values : ["wedding-hall", "catering", "jewelry", "clothes", "decoration", "furniture"],
			message: "{VALUE} is not valid"
		}
	},
	serviceDetails: {
		type: Array
	}
},
{
	timestamps: true
});

const Service = mongoose.model("Service", ServiceSchema);

export default Service;