import {ACCOUNT_TYPE} from "../../utils/constants/constants.js";
import {ERRORS}    from "../../utils/errors/errors.js";
import bcrypt      from "bcrypt";
import Vendor      from "../../models/vendor/Vendor.js";
import User        from "../../models/user/User.js";
import Admin 	   from "../../models/admin/Admin.js";
import {createAccessToken,
		createRefreshToken} from "../../utils/auth/auth.utils.js";
import jwt from "jsonwebtoken";

export async function register(req, res, next){
	const {firstName, 
			lastName,
			email,
			password,
			accountType, 
			language} = req.body;
	console.log("API: HERE A", req.body);
	// Checks if basic information has been sent by client
	if(firstName && lastName && email && password && accountType && language){
		console.log("API: HERE B");
		// Checks if client wants to register as vendor
		if(accountType.trim().toLowerCase() === ACCOUNT_TYPE.vendor){
			console.log("API: HERE D", req.body);
			const {contactNumber,
					businessName,
					businessType,
					businessAddress,
					gotShopAlreadyWithUs,
					country,
					city} = req.body;
			// if(contactNumber)
			// 	console.log("API: contactNumber", contactNumber);
			// if(businessName)
			// 	console.log("API: businessName", businessName);
			// if(businessType)
			// 	console.log("API: businessType", businessType);
			// if(businessAddress)
			// 	console.log("API: businessAddress", businessAddress);
			// console.log("API: gotShopAlreadyWithUs", gotShopAlreadyWithUs);
			// // if(gotShopAlreadyWithUs)
			// if(country)
			// 	console.log("API: country", country);
			// if(city)
			// 	console.log("API: city", city);
			// Checks if required information for vendor registration is sent by client 
			if(businessName && businessType && businessAddress && (gotShopAlreadyWithUs === true || gotShopAlreadyWithUs === false) && country && city){
				console.log("API: HERE E");
				// For vendor registration
				await registerVendorHelper(req, res, next);
			}
			else{
				console.log("API: HERE F");
				// If all required information has not been entered by vendor
				return res.status(400).json({
					errorCode: ERRORS.invalid_registration_information,
					errorMessage: "Please, enter all the required information."
				});
			}
		}
		else if(accountType.trim().toLowerCase() === ACCOUNT_TYPE.user){
			console.log("API: HERE G");
			await registerUserHelper(req, res, next);
		}
		else{
			return res.status(400).json({
				errorCode: ERRORS.invalid_registration_information,
				errorMessage: "Please, enter the correct account type."
			});
		}
	}
	else{
		console.log("API: HERE C");
		// If all required information has not been entered by vendor
		return res.status(400).json({
			errorCode: ERRORS.invalid_registration_information,
			errorMessage: "Please, enter all the required information."
		});
	}
}

async function registerVendorHelper(req, res, next){
	const {firstName, 
			lastName,
			email,
			password,
			accountType,
			contactNumber, 
			language,
			businessName,
			businessType,
			businessAddress,
			gotShopAlreadyWithUs,
			country,
			city} = req.body;
	console.log("Vendor: HERE D");
	try{
		let saltRounds     = 10;
		let saltForHashing = await bcrypt.genSalt(saltRounds);
		let hashedPassword = await bcrypt.hash(password.trim(), saltForHashing);
		const checkIfEnteredEmailAlreadyTaken = await Vendor.find({email: email});
		console.log("Vendor: HERE D", checkIfEnteredEmailAlreadyTaken);
		// Checks if chosen email already exists
		if(checkIfEnteredEmailAlreadyTaken.length == 0){
			const newVendor = new Vendor({
				firstName            : firstName.trim(),
				lastName             : lastName.trim(),
				email                : email.trim(),
				password             : hashedPassword,
				accountType          : accountType.trim(),
				contactNumber        : contactNumber.trim(),
				language             : language.trim(),
				businessName         : businessName.trim().replace(" ", "-"),
				businessType         : businessType.trim(),
				businessAddress      : businessAddress.trim(),
				gotShopAlreadyWithUs : gotShopAlreadyWithUs,
				country              : country.trim(),
				city                 : city.trim()
			});
			const isNewVendorCreated = await newVendor.save();
			console.log("Vendor: HERE E", isNewVendorCreated);
			if(isNewVendorCreated){
				// ** TODO: Figure out what to do when error occurs during token creation **
				const accessToken = await createAccessToken(
											isNewVendorCreated._id,
											firstName,
											lastName,
											email);
				const refreshToken = await createRefreshToken(
											isNewVendorCreated._id,
											firstName,
											lastName,
											email);
				console.log("Vendor: HERE F");
				return res.status(201).json({
					userId: isNewVendorCreated._id.toString(), 
					accessToken: accessToken,
					refreshToken: refreshToken,
					accountType: isNewVendorCreated.accountType
				});	
			}
			else{
				console.log("Vendor: HERE G");
				// Server error in creating vendor
				return res.status(502).json({
					errorCode: ERRORS.error_registering_user,
					errorMessage: "Please, try registering again"
				});	
			}
		}
		else{
			console.log("Vendor: HERE H", "email already taken");
			// Chosen email already taken by another vendor
			return res.status(400).json({
				errorCode: ERRORS.email_already_taken,
				errorMessage: "This email is not available."
			});
		}
	}
	catch(err){
		console.log("Vendor: HERE I", "invalid info", err);
		console.log("Vendor: HERE Z", "invalid info", err.name);
		console.log("Vendor: HERE ZZ", "invalid info", err.message);
		// If vendor has entered invalid information
		if(err.name === "ValidationError"){
			return res.status(400).json({
				errorCode: ERRORS.invalid_registration_information,
				errorMessage: err.message.split("|")[1]
			});
		}
		if(err.message.includes("duplicate key")){
			let objProp = Object.keys(err.keyValue);
			console.log("Vendor: HERE ZZZ", "keyValue", objProp);
			return res.status(400).json({
				errorCode: ERRORS.registration_data_duplication,
				errorMessage: err.keyValue[objProp[0]] + " is already taken. Please, choose another."
			});
		}
		// Server error in registering user
		else{
			console.log("Vendor: HERE F");
			return res.status(502).json({
				errorCode: ERRORS.error_registering_user,
				errorMessage: "Please, try registering again."
			});	
		}
	}
}

async function registerUserHelper(req, res, next){
	const {firstName, 
			lastName,
			email,
			password,
			accountType,
			language,
			contactNumber} = req.body;
	console.log("USER: HERE H", req.body);
	try{
		let saltRounds     = 10;
		let saltForHashing = await bcrypt.genSalt(saltRounds);
		let hashedPassword = await bcrypt.hash(password.trim(), saltForHashing);
		const checkIfEnteredEmailAlreadyTaken = await User.find({email: email});
		console.log("USER: HERE I", checkIfEnteredEmailAlreadyTaken);
		// Checks if chosen email already exists
		if(checkIfEnteredEmailAlreadyTaken.length == 0){
			console.log("USER: HERE J");
			const newUser = new User({
				firstName     : firstName,
				lastName      : lastName,
				email         : email,
				password      : hashedPassword,
				accountType   : accountType,
				language      : language,
				contactNumber : contactNumber
			});
			const isNewUserCreated = await newUser.save();
			console.log("USER: HERE K", isNewUserCreated);
			if(isNewUserCreated){
				// ** TODO: Figure out what to do when error occurs during token creation **
				const accessToken = await createAccessToken(
											isNewUserCreated._id,
											firstName,
											lastName,
											email);
				const refreshToken = await createRefreshToken(
											isNewUserCreated._id,
											firstName,
											lastName,
											email);
				console.log("USER: HERE L");
				return res.status(201).json({
					userId: isNewUserCreated._id.toString(), 
					accessToken: accessToken,
					refreshToken: refreshToken,
					accountType: isNewUserCreated.accountType
				});	
			}
			else{
				console.log("USER: HERE M");
				// Server error in creating vendor
				return res.status(502).json({
					errorCode: ERRORS.error_registering_user,
					errorMessage: "Please, try registering again"
				});	
			}
		}
		else{
			console.log("USER: HERE N", "email already taken");
			// Chosen email already taken by another vendor
			return res.status(400).json({
				errorCode: ERRORS.email_already_taken,
				errorMessage: "This email is not available."
			});
		}

	}
	catch(err){
		console.log("USER: HERE O", err);
		// If user has entered invalid information
		if(err.name === "ValidationError"){
			return res.status(400).json({
				errorCode: ERRORS.invalid_registration_information,
				errorMessage: err.message.split("|")[1]
			});
		}
		// Server error in registering user
		else{
			return res.status(502).json({
				errorCode: ERRORS.error_registering_user,
				errorMessage: "Please, try registering again."
			});	
		}
	}
}

export async function deleteAccount(req, res, next){
	const {accountType, id} = req.params;
	if(accountType && id){
		try{
			// When account type is vendor
			if(accountType === ACCOUNT_TYPE.vendor){
				const vendorToDelete = await Vendor.findOneAndUpdate({
					_id: id,
					accountType: accountType
				},
				{
					deleteRequest: true
				},
				{
					new: true	
				});

				if(vendorToDelete){
					return res.status(200).json({
						userId: vendorToDelete._id,
						accountType: vendorToDelete.accountType,
						deleteRequest: vendorToDelete.deleteRequest,
						message: "Your account deletion request awaits approval."
					});
				}
				else{
					// When account with given id & accountType does not exist
					return res.status(400).json({
						errorCode: ERRORS.invalid_information,
						errorMessage: "Invalid account"
					});
				}
			}
			// When account type is user
			else if(accountType === ACCOUNT_TYPE.user){
				const userToDelete = await User.findOneAndUpdate({
					_id: id,
					accountType: accountType
				},
				{
					deleteRequest: true
				},
				{
					new: true
				});

				if(userToDelete){
					return res.status(200).json({
						userId: userToDelete._id,
						accountType: userToDelete.accountType,
						deleteRequest: userToDelete.deleteRequest,
						message: "Your account deletion request awaits approval."
					});
				}
				else{
					// When account with given id & accountType does not exist
					return res.status(400).json({
						errorCode: ERRORS.invalid_information,
						errorMessage: "Invalid account"
					});
				}
			}
			// When account type is neither vendor nor user
			else{
				return res.status(400).json({
					errorCode: ERRORS.invalid_information,
					errorMessage: "Invalid id or account type"
				});
			}
		}
		catch(error){
			return res.status(502).json({
				errorCode: ERRORS.error_processing_request,
				errorMessage: "Please, try again."
			});
		}
	}
	else{
		// When email or password is not entered.
		return res.status(400).json({
			errorCode: ERRORS.invalid_information,
			errorMessage : "Invalid request."
		});
	}
}

export async function login(req, res, next){
	const {email, password} = req.body;
	if(email && password){
		try{
			// console.log("API", "HERE A");
			const checkIfAccountIsVendor = await Vendor.find({email: email});
			const checkIfAccountIsUser   = await User.find({email: email});
			const checkIfAccountIsAdmin  = await Admin.find({email: email});
			// console.log("API", "HERE E");
			// Uncomment checkIfAccountIsAdmin when Admin model is made   
			// const checkIfAccountIsAdmin  = await Admin.find({email: email});

			// If only one vendor account exists with given email
			if(checkIfAccountIsVendor.length == 1){
				//console.log("API", "HERE F");
				const retrievedVendor = checkIfAccountIsVendor[0];
				const isPasswordCorrect = await bcrypt.compare(password, retrievedVendor.password);
				
				// When entered password is correct
				if(isPasswordCorrect){
					// ** TODO: Figure out what to do when error occurs during token creation **
					const accessToken  = await createAccessToken(
											retrievedVendor._id,
											retrievedVendor.firstName,
											retrievedVendor.lastName,
											email);
					const refreshToken = await createRefreshToken(
												retrievedVendor._id,
												retrievedVendor.firstName,
												retrievedVendor.lastName,
												email);
					return res.status(200).json({
						userId : retrievedVendor._id,
						accountType : retrievedVendor.accountType,
						accessToken : accessToken,
						refreshToken: refreshToken
					});
				}
				else{
					// console.log("API", "HERE G");
					// When password is incorrect
					return res.status(401).json({
						errorCode: ERRORS.invalid_login_information,
						errorMessage : "Incorrect email or password."
					});
				}
			}

			// If only one User account exists with given email
			else if(checkIfAccountIsUser.length == 1){
				// console.log("API", "HERE H");
				const retrievedUser = checkIfAccountIsUser[0];
				const isPasswordCorrect = await bcrypt.compare(password, retrievedUser.password);

				// When entered password is correct
				if(isPasswordCorrect){
					// ** TODO: Figure out what to do when error occurs during token creation **
					const accessToken  = await createAccessToken(
											retrievedUser._id,
											retrievedUser.firstName,
											retrievedUser.lastName,
											email);
					const refreshToken = await createRefreshToken(
												retrievedUser._id,
												retrievedUser.firstName,
												retrievedUser.lastName,
												email);
					return res.status(200).json({
						userId : retrievedUser._id,
						accountType : retrievedUser.accountType,
						accessToken : accessToken,
						refreshToken: refreshToken
					});
				}
				
				else{
					// console.log("API", "HERE I");
					// When password is incorrect
					return res.status(401).json({
						errorCode: ERRORS.invalid_login_information,
						errorMessage : "Incorrect email or password."
					});
				}
			}
			//if only one admin account is of this email
			else if(checkIfAccountIsAdmin.length == 1){
				// console.log("API", "HERE H");
				const retrievedAdmin = checkIfAccountIsAdmin[0];
				const isPasswordCorrect = await bcrypt.compare(password, retrievedAdmin.password);

				// When entered password is correct
				if(isPasswordCorrect){
					// ** TODO: Figure out what to do when error occurs during token creation **
					const accessToken  = await createAccessToken(
											retrievedAdmin._id,
											retrievedAdmin.firstName,
											retrievedAdmin.lastName,
											email);
					const refreshToken = await createRefreshToken(
												retrievedAdmin._id,
												retrievedAdmin.firstName,
												retrievedAdmin.lastName,
												email);
					return res.status(200).json({
						userId : retrievedAdmin._id,
						accountType : retrievedAdmin.accountType,
						accessToken : accessToken,
						refreshToken: refreshToken
					});
				}
				
				else{
					// console.log("API", "HERE I");
					// When password is incorrect
					return res.status(401).json({
						errorCode: ERRORS.invalid_login_information,
						errorMessage : "Incorrect email or password."
					});
				}
			}
			// If only one admin account exists with given email
			else if(false){
				// ** TODO: Implement admin login here **
			}

			// If account with given email does not exist.
			else{
				// console.log("API", "HERE B");
				return res.status(401).json({
					errorCode: ERRORS.invalid_login_information,
					errorMessage : "Incorrect email or password."
				});
			}

		}
		catch(err){
			// console.log("API", "HERE C", err);
			return res.status(500).json({
				errorCode: ERRORS.error_processing_request,
				errorMessage: "Please, try logging in again."
			});
		}
	}
	else{
		//console.log("API", "HERE D");
		// When email & password data is not entered by the client
		return res.status(401).json({
			errorCode: ERRORS.invalid_login_information,
			errorMessage: "Please, enter your email and password."
		})
	}
}

function verifyRefreshToken(refreshToken){
	// jwt.verify(token, secretOrPublicKey, [options, callback])
	// console.log("HERE A: verifyRefreshToken");
	try{
		let verification = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_PRIVATE_KEY);
		// console.log("HERE B: verifyRefreshToken", verification);
		if(verification){
			return true;
		}
	}
	catch(error){
		// console.log("HERE C: verifyRefreshToken");
		return false;
	}
}

function verifyAccessToken(accessToken){
	// jwt.verify(token, secretOrPublicKey, [options, callback])
	// console.log("HERE A: verifyAccessToken");
	try{
		let verification = jwt.verify(accessToken, process.env.ACCESS_TOKEN_PRIVATE_KEY);
		// console.log("HERE B: verifyAccessToken", verification);
		if(verification){
			return true;
		}
	}
	catch(error){
		// console.log("HERE C: verifyAccessToken");
		return false;
	}
}

async function formAccessToken(userId, accountType){
	// jwt.sign(payload, secretOrPrivateKey, [options, callback])
	try{
		const payload = {
			userId: userId,
			accountType: accountType
		};
		const secretOrPrivateKey = process.env.ACCESS_TOKEN_PRIVATE_KEY;
		const options = {
			"expiresIn" : "1h", // Change this back to 1h
			"issuer" : "ShaadiCaravan",
			"audience" : userId.toString()
		};
		const accessToken = await jwt.sign(payload, secretOrPrivateKey, options);
		// console.log("HERE A formAccessToken", "newAccessToken", accessToken);
		return {
			accessToken: accessToken,
			success: true
		};
	}
	catch(err){
		// console.log("HERE B formAccessToken:", err.message);
		return {
			success: false
		};
	}
}


export async function verifyTokensAndCreateNewOnes(req, res, next){
	const {accessToken, refreshToken, userId, accountType} = req.body;
	// console.log("HERE A");
	if(accessToken && refreshToken && userId && accountType){
		try{
			const refreshTokenVerification = verifyRefreshToken(refreshToken);
			if(refreshTokenVerification){
				const accessTokenVerification = verifyAccessToken(accessToken);
				// console.log("HERE B", "accessTokenVerification", accessTokenVerification);
				if(accessTokenVerification){
					// console.log("HERE C", "accessToken", accessToken);
					return res.status(200).json({
						accessToken: accessToken,
						success: true
					});
				}
				else{
					const newAccessToken  = await formAccessToken(userId, accountType);
					// console.log("HERE F", "newAccessToken", newAccessToken);
					if(newAccessToken.success){
						// console.log("HERE X")
						return res.status(200).json({
							accessToken: newAccessToken.accessToken,
							success: true
						});
					}
					else{
						// console.log("HERE Z");
						return res.status(400).json({
							errorCode: ERRORS.error_creating_token,
							errorMessage : "Error Creating Token.",
							success: false
						});
					}
				}
			}
			else{
				// When Refresh Token Has Expired
				return res.status(401).json({
					errorCode: ERRORS.expired_refresh_token,
					errorMessage : "Expired Refresh Token",
					success: false
				});
			}
		}
		catch(err){
			// console.log("HERE G", err);
			return res.status(400).json({
				errorCode: ERRORS.error_creating_token,
				errorMessage : "Error Creating Token.",
				success: false
			});
		}
	}
	else{
		// console.log("HERE H");
		return res.status(400).json({
			errorCode: ERRORS.invalid_information,
			errorMessage: "Request Body Data Missing.",
			success: false
		});
	}
	// console.log("\n")
}

// Commented Code Below // 


// export async function login(req, res, next){
// 	const {email, password} = req.body;
// 	if(email && password){
// 		try{
// 			console.log("API", "HERE A")
// 			const checkIfAccountIsVendor = await Vendor.find({email: email});
// 			const checkIfAccountIsUser   = await User.find({email: email});

// 			// Uncomment checkIfAccountIsAdmin when Admin model is made   
// 			// const checkIfAccountIsAdmin  = await Admin.find({email: email});

// 			// If only one vendor account exists with given email
// 			if(checkIfAccountIsVendor.length == 1){
// 				const retrievedVendor = checkIfAccountIsVendor[0];
// 				const isPasswordCorrect = await bcrypt.compare(password, retrievedVendor.password);
				
// 				// When entered password is correct
// 				if(isPasswordCorrect){
// 					// ** TODO: Figure out what to do when error occurs during token creation **
// 					const accessToken  = await createAccessToken(
// 											retrievedVendor._id,
// 											retrievedVendor.firstName,
// 											retrievedVendor.lastName,
// 											email);
// 					const refreshToken = await createRefreshToken(
// 												retrievedVendor._id,
// 												retrievedVendor.firstName,
// 												retrievedVendor.lastName,
// 												email);
// 					return res.status(200).json({
// 						vendorId : retrievedVendor._id,
// 						accountType : retrievedVendor.accountType,
// 						accessToken : accessToken,
// 						refreshToken: refreshToken
// 					});
// 				}
// 				else{
// 					// When password is incorrect
// 					return res.status(401).json({
// 						errorCode: ERRORS.invalid_login_information,
// 						errorMessage : "Incorrect email or password."
// 					});
// 				}
// 			}
// 			// If only one User account exists with given email
// 			else if(checkIfAccountIsUser.length == 1){
// 				const retrievedUser = checkIfAccountIsUser[0];
// 				const isPasswordCorrect = await bcrypt.compare(password, retrievedUser.password);

// 				// When entered password is correct
// 				if(isPasswordCorrect){
// 					// ** TODO: Figure out what to do when error occurs during token creation **
// 					const accessToken  = await createAccessToken(
// 											retrievedUser._id,
// 											retrievedUser.firstName,
// 											retrievedUser.lastName,
// 											email);
// 					const refreshToken = await createRefreshToken(
// 												retrievedUser._id,
// 												retrievedUser.firstName,
// 												retrievedUser.lastName,
// 												email);
// 					return res.status(200).json({
// 						userId : retrievedUser._id,
// 						accountType : retrievedUser.accountType,
// 						accessToken : accessToken,
// 						refreshToken: refreshToken
// 					});
// 				}
// 				else{
// 					// When password is incorrect
// 					return res.status(401).json({
// 						errorCode: ERRORS.invalid_login_information,
// 						errorMessage : "Incorrect email or password."
// 					});
// 				}
// 			}
// 			// If only one admin account exists with given email
// 			else if(false){
// 				// ** TODO: Implement admin login here **
// 			}
// 			// If account with given email does not exist.
// 			else{
// 				return res.status(401).json({
// 					errorCode: ERRORS.invalid_login_information,
// 					errorMessage : "Incorrect email or password."
// 				});
// 			}
// 		}
// 		catch(err){
// 			console.log("API", "HERE B")
// 			// ** Figure out what error to send here **
// 			return res.status(401).json(err);

// 		}
// 	}
// 	else{
// 		// When email or password is not entered.
// 		return res.status(400).json({
// 			errorCode: ERRORS.invalid_login_information,
// 			errorMessage : "Please, enter your email and password."
// 		});
// 	}
// }

