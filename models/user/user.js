import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		minLength: [2, "|First Name must be at least 2 characters. Got '{VALUE}'"],
		trim: true
	},
	lastName : {
		type: String,
		trim: true,
		required: true,
		minLength: [2, "|Last Name must be at least 2 characters. Got '{VALUE}'"],
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
		required  : true,
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
		maxLength : 4,
	},
	profilePicture: {
		type: String,
		trim: true,
		default: ""
	},
	softDelete: {
		type: Boolean,
		default: false
	},
	deletionApproved: {
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

const User = mongoose.model("User", UserSchema);

export default User;	