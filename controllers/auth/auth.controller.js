import User from "../../models/user/user.js";
import bcrypt from "bcrypt";
import {createAccessToken, 
		createRefreshToken} from "./auth.controller.utils.js";

export async function loginUser(req, res, next){
	const {email, password} = req.body;
	if(email && password){
		try{
			const user = await User.find({email});
			if(user.length == 1){
				const retrievedUser = user[0];
				if(retrievedUser !== null){
					const isPasswordCorrect = await bcrypt.compare(password, retrievedUser.password);
					if(isPasswordCorrect){
						const accessToken = await createAccessToken(retrievedUser._id, retrievedUser.firstName, retrievedUser.lastName, retrievedUser.email);
						const refreshToken = await createRefreshToken(retrievedUser._id, retrievedUser.firstName, retrievedUser.lastName, retrievedUser.email);
						res.status(200).json({accessToken, refreshToken, retrievedUser});
					}
					else{
						res.status(400).json({error: "Incorrect password."});
					}
				}
				else{
					res.status(400).json({error: "Invalid email or password."});
				}
			}
			else if(user.length > 1){
				res.status(400).json({error: "An account with your email already exists. Please, create a new account"});
			}
			else{
				res.status(400).json({error: "Invalid email or password."});
			}
			
		}
		catch(error){
			res.status(400).json({error: error.message});
		}
	}
	else{
		res.status(400).json({error: "Please, enter all the required information."})
	}
}

export async function registerUser(req, res, next){
	const {firstName, 
		   lastName, 
		   email, 
		   password, 
		   userRole} = req.body;

	if(firstName && lastName && email && password && userRole) {
		try{
			const user = await User.findOne({email});
			if(user === null){
				const salt = await bcrypt.genSalt();
				const hashedPassword = await bcrypt.hash(password, salt);
				const newUser = new User({firstName: firstName, lastName: lastName, email: email, password: hashedPassword, userRole: userRole});
				const userCreationResult = await newUser.save();
				if(userCreationResult){
				   	const accessToken = await createAccessToken(userCreationResult._id, userCreationResult.firstName, userCreationResult.lastName, userCreationResult.email);
				   	const refreshToken = await createRefreshToken(userCreationResult._id, userCreationResult.firstName, userCreationResult.lastName, userCreationResult.email);
					res.status(200).json({accessToken, refreshToken, userCreationResult});
				} else{
					res.status(400).json({error: "Error occured. Please, try again later."});
				}
			}
			else{
				res.status(400).json({error: "An account with this email already exists. Please, choose another email."});
			}
		}
		catch(error){
			res.status(400).json({error: error.message});
		}
	}
	else{
		res.status(400).json({error: "Please, enter all the required information."});
	}
}

export async function resetPassword(req, res, next){
	const {email, password} = req.body;
	if(email && password){
		try{
			const salt = await bcrypt.genSalt();
			const hashedPassword = await bcrypt.hash(password, salt);
			const user = await User.findOneAndUpdate({email: email}, {password: hashedPassword});
			if(user !== null){
				res.status(200).json({user});
			}
			else{
				res.status(400).json({error: "Invalid email or password"});
			}	
		}
		catch(error){
			res.status(400).json({error: error.message});
		}
	}
	else{
		res.status(400).json({error: "Please, enter your email and password"});
	}
}

export async function removeUser(req, res, next){
	const {email, password} = req.body;
	if(email && password){
		try{
			const userToDelete = await User.deleteOne({email: email});
			if(userToDelete.deletedCount == 1){
				res.status(200).json(userToDelete); 
			}
			else{
				res.status(400).json({error: "Invalid email or password"});
			}
			
		}
		catch(error){
			res.status(400).json({error: error.message});
		}
	} 
	else{
		res.status(400).json({error: "Please, enter your email and password"});
	}
}

export async function verifyPassword(req, res, next){}

export async function refreshAccessToken(req, res, next){
	const {authorization} = req.body;
	
	if(authorization){
		try{
			const payload = req.user;
			const accessToken = await createAccessToken(payload.id, payload.firstName, payload.lastName, payload.email);
			const refreshToken = await createRefreshToken(payload.id, payload.firstName, payload.lastName, payload.email);
			return res.status(200).json({accessToken, refreshToken});
		}
		catch(error){
			return res.status(400).json({error: error.message});
		}
	}
	else{
		return res.status(401).json({error: "You are not authenticated"});
	}
}