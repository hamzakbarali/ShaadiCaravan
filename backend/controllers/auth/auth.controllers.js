import {ACCOUNT_TYPE} from "../../utils/constants/constants.js";
import {ERRORS}    from "../../utils/errors/errors.js";
import bcrypt      from "bcrypt";
import Vendor      from "../../models/vendor/Vendor.js";
import User        from "../../models/user/User.js";
import {createAccessToken,
		createRefreshToken} from "../../utils/auth/auth.utils.js";

export async function register(req, res, next){
	const {firstName, 
			lastName,
			email,
			password,
			accountType, 
			language} = req.body;
	// Checks if basic information has been sent by client
	if(firstName && lastName && email && password && accountType && language){
		// Checks if client wants to register as vendor
		if(accountType.trim().toLowerCase() === ACCOUNT_TYPE.vendor){
			const {contactNumber,
					businessName,
					businessType,
					businessAddress,
					gotShopAlreadyWithUs,
					country,
					city} = req.body;
			// Checks if required information for vendor registration is sent by client 
			if(businessName && businessType && businessAddress && gotShopAlreadyWithUs && country && city){
				// For vendor registration
				await registerVendorHelper(req, res, next);
			}
			else{
				// If all required information has not been entered by vendor
				return res.status(400).json({
					errorCode: ERRORS.invalid_registration_information,
					errorMessage: "Please, enter all the required information."
				});
			}
		}
		else if(accountType.trim().toLowerCase() === ACCOUNT_TYPE.user){
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

	try{
		let saltRounds     = 10;
		let saltForHashing = await bcrypt.genSalt(saltRounds);
		let hashedPassword = await bcrypt.hash(password.trim(), saltForHashing);
		const checkIfEnteredEmailAlreadyTaken = await Vendor.find({email: email});
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
				return res.status(201).json({
					vendorId: isNewVendorCreated._id.toString(), 
					accessToken: accessToken,
					refreshToken: refreshToken
				});	
			}
			else{
				// Server error in creating vendor
				return res.status(502).json({
					errorCode: ERRORS.error_registering_user,
					errorMessage: "Please, try registering again"
				});	
			}
		}
		else{
			// Chosen email already taken by another vendor
			return res.status(400).json({
				errorCode: ERRORS.email_already_taken,
				errorMessage: "This email is not available."
			});
		}
	}
	catch(err){
		// If vendor has entered invalid information
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

async function registerUserHelper(req, res, next){
	const {firstName, 
			lastName,
			email,
			password,
			accountType,
			language,
			contactNumber} = req.body;
	try{
		let saltRounds     = 10;
		let saltForHashing = await bcrypt.genSalt(saltRounds);
		let hashedPassword = await bcrypt.hash(password.trim(), saltForHashing);
		const checkIfEnteredEmailAlreadyTaken = await User.find({email: email});
		// Checks if chosen email already exists
		if(checkIfEnteredEmailAlreadyTaken.length == 0){
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
				return res.status(201).json({
					userId: isNewUserCreated._id.toString(), 
					accessToken: accessToken,
					refreshToken: refreshToken
				});	
			}
			else{
				// Server error in creating vendor
				return res.status(502).json({
					errorCode: ERRORS.error_registering_user,
					errorMessage: "Please, try registering again"
				});	
			}
		}
		else{
			// Chosen email already taken by another vendor
			return res.status(400).json({
				errorCode: ERRORS.email_already_taken,
				errorMessage: "This email is not available."
			});
		}

	}
	catch(err){
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
						vendorId: vendorToDelete._id,
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
			// console.log("API", "HERE A")
			const checkIfAccountIsVendor = await Vendor.find({email: email});
			const checkIfAccountIsUser   = await User.find({email: email});

			// Uncomment checkIfAccountIsAdmin when Admin model is made   
			// const checkIfAccountIsAdmin  = await Admin.find({email: email});

			// If only one vendor account exists with given email
			if(checkIfAccountIsVendor.length == 1){
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
						vendorId : retrievedVendor._id,
						accountType : retrievedVendor.accountType,
						accessToken : accessToken,
						refreshToken: refreshToken
					});
				}
				else{
					// When password is incorrect
					return res.status(401).json({
						errorCode: ERRORS.invalid_login_information,
						errorMessage : "Incorrect email or password."
					});
				}
			}

			// If only one User account exists with given email
			else if(checkIfAccountIsUser.length == 1){
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
		// When email & password data is not entered by the client
		return res.status(401).json({
			errorCode: ERRORS.invalid_login_information,
			errorMessage: "Please, enter your email and password."
		})
	}
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

