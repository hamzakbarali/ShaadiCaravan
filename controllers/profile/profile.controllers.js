import {ERRORS} from "./../../utils/errors/errors.js";
import {ACCOUNT_TYPE} from "./../../utils/constants/constants.js";
import Vendor from "./../../models/vendor/Vendor.js";
import User from "./../../models/user/User.js";
import bcrypt from "bcrypt";

export async function getProfile(req, res, next){
	const {id, accountType} = req.params;
	if(id && accountType){
		try{
			if(accountType == ACCOUNT_TYPE.vendor){
				const doesVendorExist = await Vendor.find({_id: id, accountType: accountType});
				// When vendor whose id and account type are provided exists
				if(doesVendorExist.length == 1){
					const retrievedVendor = doesVendorExist[0];
					return res.status(200).json({
						id: retrievedVendor._id,
						firstName: retrievedVendor.firstName,
						lastName : retrievedVendor.lastName,
						email    : retrievedVendor.email,
						accountType: retrievedVendor.accountType,
						contactNumber: retrievedVendor.contactNumber,
						language: retrievedVendor.language,
						country : retrievedVendor.country,
						city : retrievedVendor.city,
						businessName: retrievedVendor.businessName.replace("-", " "),
						businessDescription: retrievedVendor.businessDescription,
						businessType: retrievedVendor.businessType,
						businessAddress: retrievedVendor.businessAddress,
						gotShopAlreadyWithUs: retrievedVendor.gotShopAlreadyWithUs,
						businessApproved: retrievedVendor.businessApproved,
						profilePicture: retrievedVendor.profilePicture,
						averageRating: retrievedVendor.averageRating,
						isOnline: retrievedVendor.isOnline
					}); 
				}
				// When vendor whose id and account type are provided does not exist
				else{
					return res.status(400).json({
						errorCode: ERRORS.invalid_information,
						errorMessage: "Invalid id or account type"
					});
				}
			}
			else if(accountType == ACCOUNT_TYPE.user){
				const doesUserExist = await User.find({_id: id, accountType: accountType});
				// When user whose id and account type are provided exists
				if(doesUserExist.length == 1){
					const retrievedUser = doesUserExist[0];
					return res.status(200).json({
						id: retrievedUser._id,
						firstName: retrievedUser.firstName,
						lastName : retrievedUser.lastName,
						email    : retrievedUser.email,
						accountType: retrievedUser.accountType,
						contactNumber: retrievedUser.contactNumber,
						language: retrievedUser.language,
						profilePicture: retrievedUser.profilePicture,
					}); 
				}
				// When user whose id and account type are provided does not exist
				else{
					return res.status(400).json({
						errorCode: ERRORS.invalid_information,
						errorMessage: "Invalid id or account type"
					});
				}
			}
			// When account type is neither vendor or user
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
		// When required parameters are not passed from frontend
		return res.status(400).json({
			errorCode: ERRORS.request_data_not_given, 
			errorMessage: "Invalid Request"
		});
	}
}

export async function updateProfile(req, res, next){
	const {id, accountType} = req.params; 
	if(id && accountType){
		try{
			// When account type is vendor
			if(accountType === ACCOUNT_TYPE.vendor){
				const {firstName, 
						lastName, 
						email,
						password, 
						contactNumber, 
						language, 
						country, 
						city, 
						businessName,
						businessDescription, 
						businessType, 
						businessAddress, 
						gotShopAlreadyWithUs,  
						profilePicture} = req.body;
				
				let isBusinessNameParamGiven = false;
				let isPasswordParamGiven = false;
				let hashedPassword;

				if(businessName !== undefined){
				 	isBusinessNameParamGiven = true;
				}
				if(password !== undefined){
					isPasswordParamGiven = true;
					const saltRounds = 10;
					const salt = await bcrypt.genSalt(saltRounds);
					hashedPassword = await bcrypt.hash(password, salt);
				}

				const vendorToUpdate = await Vendor.findOneAndUpdate({
					_id: id, 
					accountType: accountType
				}, 
				{
					firstName : firstName,
					lastName  : lastName,
					email     : email,
					password: (isPasswordParamGiven) ? hashedPassword: password,
					contactNumber : contactNumber,
					language : language,
					country: country, 
					city : city, 
					businessName : (isBusinessNameParamGiven) ? businessName.trim().replace(" ", "-") : businessName,
					businessDescription : businessDescription, 
					businessType : businessType, 
					businessAddress : businessAddress, 
					gotShopAlreadyWithUs : gotShopAlreadyWithUs,
					profilePicture : profilePicture
				},
				{
					new: true
				}); 
				// When vendor is updated
				if(vendorToUpdate){
					return res.status(200).json({
						id: vendorToUpdate._id,
						firstName: vendorToUpdate.firstName,
						lastName : vendorToUpdate.lastName,
						email    : vendorToUpdate.email,
						accountType: vendorToUpdate.accountType,
						contactNumber: vendorToUpdate.contactNumber,
						language: vendorToUpdate.language,
						country : vendorToUpdate.country,
						city : vendorToUpdate.city,
						businessName: vendorToUpdate.businessName.replace("-", " "),
						businessDescription: vendorToUpdate.businessDescription,
						businessType: vendorToUpdate.businessType,
						businessAddress: vendorToUpdate.businessAddress,
						gotShopAlreadyWithUs: vendorToUpdate.gotShopAlreadyWithUs,
						profilePicture: vendorToUpdate.profilePicture,
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
				const {firstName,
					    lastName,
					    email,
					    password,
					    contactNumber,
					    language,
					    profilePicture} = req.body;

			    let isPasswordParamGiven = false;
				let hashedPassword;

				if(password !== undefined){
					isPasswordParamGiven = true;
					const saltRounds = 10;
					const salt = await bcrypt.genSalt(saltRounds);
					hashedPassword = await bcrypt.hash(password, salt);
				}

				const userToUpdate = await User.findOneAndUpdate(
					{
						_id: id, 
						accountType: accountType
					},
					{
						firstName: firstName,
					    lastName : lastName,
					    email : email,
					    password: (isPasswordParamGiven) ? hashedPassword: password,
					    contactNumber : contactNumber,
					    language : language,
					    profilePicture : profilePicture
					},
					{
						new: true
					});
				// When user is updated
				if(userToUpdate){
					return res.json(
					{
						id: userToUpdate._id,
						firstName: userToUpdate.firstName,
					    lastName: userToUpdate.lastName,
					    email: userToUpdate.email,
					    accountType: userToUpdate.accountType,
					    contactNumber: userToUpdate.contactNumber,
					    language: userToUpdate.language,
					    profilePicture: userToUpdate.profilePicture
					});
				}
				// When account with given id & accountType does not exist
				else{
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
		// When required parameters are not passed from frontend
		return res.status(400).json({
			errorCode: ERRORS.request_data_not_given, 
			errorMessage: "Invalid Request"
		});
	}
}