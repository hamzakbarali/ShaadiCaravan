import mongoose from "mongoose";
import {validateEmail, validatePassword} from "../../utils/validation/vendor.auth.modelvalidation.js";

const VendorSchema = mongoose.Schema({
	firstName: {
		type      : String,
		trim      : true,
		required  : [true, "|Please, enter your first name."],
		minLength : [2, "|First Name must be 2 characters long. Got '{VALUE}'."],
		maxLength : 25,
	},
	lastName: {
		type      : String,
		trim      : true,
		required  : [true, "|Please, enter your last name."],
		minLength : [2, "|Last Name must be 2 characters long. Got '{VALUE}'."],
		maxLength : 25,
	},
	email: {
		type      : String,
		trim      : true,
		required  : [true, "|Please, enter your email."],
		minLength : [8, "|Your email should be at least 8 characters long. Got '{VALUE}'"],
		maxLength : 65,
		unique    : true
	},
	password: {
		type      : String,
		trim      : true,
		required  : [true, "|Please, enter your password."],
		minLength : [8, "|Your password should be at least 8 characters long."],
		maxLength : 65
	},
	accountType: {
		type      : String,
		trim      : true,
		required  : [true , "|Please, choose a business type."],
		enum    : {
			values : ["vendor", "user", "admin"],
			message: "|{VALUE} is not valid."
		},
	},
	contactNumber: {
		type      : String,
		trim      : true,
		required  : [true, "|Please, enter your contact number."],
		minLength : [7, "|Your contact number should be at least 7 digits. Got `{VALUE}`"],
		maxLength : 65,
		unique    : true 
	},
	language: {
		type      : String,
		trim      : true,
		required  : [true, "|Please, choose a language for your account."],
		minLength : 2,
		maxLength : 40,
	},
	country: {
		type      : String,
		trim      : true,
		required  : [true, "|Please, enter your country."],
	},
	city: {
		type      : String,
		trim      : true,
		required  : [true, "|Please, enter your city"]
	},
	businessName: {
		type      : String,
		trim      : true,
		required  : [true, "|Please, enter your business's name."],
		minLength : [2, "|Your business's name should be at least 2 characters long. Got '{VALUE}'"],
		maxLength : [100],
		unique    : true
	},
	businessDescription: {
		type      : String,
		trim      : true,
		default   : "",
	},
	businessType: {
		type      : String,
		trim      : true,
		required  : [true, "|Please, choose a business type."],
		enum : {
			values : ["wedding-hall", "catering", "jewelry", "wedding-clothes", "wedding-hall-decoration", "furniture"],
			message: "{VALUE} is not valid"
		}
	},
	businessAddress: {
		type      : String,
		trim      : true,
		required  : [true, "|Please, enter your business address."],
		minLength : [10, "|Business Address must be at least 10 characters long. Got '{VALUE}'."],
		maxLength : 100,
		unique    : true
	},
	gotShopAlreadyWithUs: {
		type      : Boolean,
		required  : [true, "|Please, choose whether you already have a business listed on ShaadiCaravan."],
	},
	businessApproved : {
		type      : Boolean,
		default   : false 
	},
	profilePicture : {
		type      : String,
		trim      : true,
		default   : "",
	},
	averageRating: {
		type      : Number,
		default   : 0,
		min       : 0,
		max       : 5
	},
	isOnline: {
		type: Boolean,
		default: false
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

const Vendor = mongoose.model("Vendor", VendorSchema);

export default Vendor;

// restaurantId: {
// 	type: mongoose.Schema.Types.ObjectId, ref: "Restaurant",
// 	required: true
// }

// match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please, choose a valid email address"],
// validate: [validateEmail, 'Please, choose a valid email address']

// match: [/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Please, choose a password that is at least 8 characters long, has at least one uppercase letter, at least one lowercase letter, at least one digit, and at least one special character'],
// 		validate: [validatePassword, 'Please, choose a password that is at least 8 characters long, has at least one uppercase letter, at least one lowercase letter, at least one digit, and at least one special character']