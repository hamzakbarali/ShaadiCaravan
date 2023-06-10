import mongoose from "mongoose";

const ServiceSchema = mongoose.Schema({
	"serviceName": {
		type: String,
		required: [true, "|Please, enter a name for your service."],
		minLength: [5, "|Service Name must be at least 5 characters long. Got '{VALUE}'"],
		trim: true,
		unique: true
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
	businessName: {
		type      : String,
		trim      : true,
		required  : [true, "|Please, enter the business name."],
		minLength : [2, "|The business name should be at least 2 characters long. Got '{VALUE}'"],
		maxLength : [100],
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
	accountType: {
		type      : String,
		trim      : true,
		default   : "vendor",
	},
	serviceDetails: {
		type: Array,
		required: [true, "|Please, enter service details"]
	},
	servicePictures: {
		type: Array,
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

const Service = mongoose.model("Service", ServiceSchema);

export default Service;