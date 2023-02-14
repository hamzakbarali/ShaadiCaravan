import mongoose from "mongoose";
import {validateEmail, validatePassword} from "./user.models.utils.js";

const UserSchema = new mongoose.Schema(
{
	firstName: {
		type: String,
		required: true,
		min: 2,
		max: 50,
	},
	lastName: {
		type: String,
		required: true,
		min: 2,
		max: 50,
	},
	email: {
		type: String,
		required: true,
		min: 8,
		max: 65,
		unique: true,
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please, choose a valid email address"],
		validate: [validateEmail, 'Please, choose a valid email address']
	},
	password: {
		type: String,
		required: true,
		min: 8,
		max: 65,
		match: [/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Please, choose a password that is at least 8 characters long, has at least one uppercase letter, at least one lowercase letter, at least one digit, and at least one special character'],
		validate: [validatePassword, 'Please, choose a password that is at least 8 characters long, has at least one uppercase letter, at least one lowercase letter, at least one digit, and at least one special character']
	},
	userRole: {
		type: String,
		required: true,
	}
}, 
{
	timestamps: true,
});

const User = mongoose.model("User", UserSchema);

export default User;