import {verifyAccessToken, 
    verifyRefreshToken} from "./../../middleware/auth/auth.middleware.js";
import {ACCOUNT_TYPE} from "../../utils/constants/constants.js";
import {ERRORS}    from "../../utils/errors/errors.js";
import bcrypt      from "bcrypt";
import Service from "./../../models/service/Service.js";
import Form from "./../../models/form/Form.js";
import Vendor from "./../../models/vendor/Vendor.js";
import User from "./../../models/user/User.js";
import Admin from "../../models/admin/Admin.js";
import Review   from "./../../models/review/Review.js";
import {createAccessToken,
    createRefreshToken} from "../../utils/auth/auth.utils.js";

// Controller function to get all users
export async function registerUser(req, res, next){
	const {firstName, 
			lastName,
			email,
			password,
			accountType,
			language} = req.body;
	// Checks if basic information has been sent by client
	if(firstName && lastName && email && password && accountType && language){
		// Checks if client wants to register as vendor
		if(accountType.trim().toLowerCase() === ACCOUNT_TYPE.user){
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
		return res.status(400).json({
			errorCode: ERRORS.invalid_registration_information,
			errorMessage: "Please, enter all the required information."
		});
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
				return res.status(201).json({
					userId: isNewUserCreated._id.toString(),
					accountType: isNewUserCreated.accountType
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

export async function getAllUsers(req, res, next) {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } 
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve users" });
    }
}
  
// Controller function to get all vendors
export async function getAllVendors(req, res, next) {
    try {
        const vendors = await Vendor.find();
        res.status(200).json(vendors);
    } 
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve vendors" });
    }
}

export async function getAllServices(req, res, next)
{
	const services = await Service.find();
	if(services)
	{
		try {
			const services = await Service.find();
			if(services)
			{
				res.status(200).json(services);
			}
			else{
				return res.status(502).json({
					errorCode: ERRORS.error_processing_request,
					errorMessage: "Please, try again."
				});	
			}
		} 
		catch (error) {
			res.status(500).json({ error: "Error retrieving services" });
		}
	}
	else
	{
		return res.status(400).json({
			errorCode: ERRORS.request_data_not_given, 
			errorMessage: "Invalid Request"
		});
	}
}

export async function updateService(req, res, next){
    const {serviceId} = req.params;
	const {serviceName, 
		   serviceType, 
		   businessName, 
		   businessType, 
		   serviceDetails, 
		   servicePictures,
		   deleteRequest
		} = req.body;
	if(serviceId){
		try{
			if(serviceName || serviceType || businessName || businessType || serviceDetails || servicePictures || deleteRequest){
				const serviceToUpdate = await Service.findOneAndUpdate(
					{
						_id: serviceId
					}, 
					{
						serviceName: (serviceName) ? serviceName.trim() : serviceName,
						serviceType: (serviceType) ? serviceType.trim() : serviceType,
						businessName: (businessName) ? businessName.trim() : businessName,
						businessType: (businessType) ? businessType.trim() : businessType,
						serviceDetails: serviceDetails,
						servicePictures: servicePictures,
						deleteRequest: deleteRequest
					}, 
					{
						new: true
					}
				);
				if(serviceToUpdate){
					return res.status(200).json(serviceToUpdate);
				}
				else{
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
		catch(err){
			return res.status(502).json(err.message);	
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

export async function deleteService(req, res, next){
	const { serviceId } = req.params;
    if(serviceId)
    {
        try
        {
            const service = await Service.findById(serviceId);
            if(service)
            {
                await Service.findByIdAndDelete(serviceId);
                return res.json({ message: "Service deleted successfully" });
            }
            else{
                return res.status(502).json({
                    errorCode: ERRORS.error_processing_request,
                    errorMessage: "Please, try again."
                });	
            }
        }
        catch(err){
			return res.status(502).json(err.message);	
		}
    }
    else
    {
        return res.status(400).json({
			errorCode: ERRORS.request_data_not_given, 
			errorMessage: "Invalid Request"
		});
    }
}

export async function deleteVendor(req, res, next){
	const { vendorId } = req.params;
    if(vendorId)
    {
        try
        {
            const vendor = await Vendor.findById(vendorId);
            if(vendor)
            {
                await Vendor.findByIdAndDelete(vendorId);
                return res.json({ message: "Vendor deleted successfully" });
            }
            else{
                return res.status(502).json({
                    errorCode: ERRORS.error_processing_request,
                    errorMessage: "Please, try again."
                });	
            }
        }
        catch(err){
			return res.status(502).json(err.message);	
		}
    }
    else
    {
        return res.status(400).json({
			errorCode: ERRORS.request_data_not_given, 
			errorMessage: "Invalid Request"
		});
    }
}

export async function deleteUser(req, res, next){
	const { userId } = req.params;
    if(userId)
    {
        try
        {
            const user = await User.findById(userId);
            if(user)
            {
                await User.findByIdAndDelete(userId);
                return res.json({ message: "User deleted successfully" });
            }
            else{
                return res.status(502).json({
                    errorCode: ERRORS.error_processing_request,
                    errorMessage: "Please, try again."
                });	
            }
        }
        catch(err){
			return res.status(502).json(err.message);	
		}
    }
    else
    {
        return res.status(400).json({
			errorCode: ERRORS.request_data_not_given, 
			errorMessage: "Invalid Request"
		});
    }
}

export async function login(req, res, next){
	const {email, password} = req.body;
	if(email && password){
		try{
            const checkIfAccountIsAdmin = await Admin.find({email: email});

			// If only one admin account exists with given email
			if(checkIfAccountIsAdmin.length == 1){
                const retrievedAdmin = checkIfAccountIsAdmin[0];
                //console.log(retrievedAdmin)
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
						adminId : retrievedAdmin._id,
						accountType : retrievedAdmin.accountType,
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
			else{
				return res.status(401).json({
					errorCode: ERRORS.invalid_login_information,
					errorMessage : "Incorrect email or password."
				});
			}

		}
		catch(err){
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
export async function updateUser(req, res, next)
{
    const {userId} = req.params;
    const {firstName, 
        lastName,
        email,
        accountType,
        softDelete,
		myBio} = req.body;
    if(userId)
    {
        try{
			if(firstName || lastName || email ||  accountType || softDelete || myBio)
			{
				const userToUpdate = await User.findOneAndUpdate(
					{
						_id: userId
					},
					{
						firstName: (firstName) ? firstName.trim() : firstName,
                        lastName: (lastName) ? lastName.trim() : lastName,
                        email: (email) ? email.trim() : email,
                        accountType: (accountType) ? accountType : accountType,
						myBio: (myBio) ? myBio : myBio,
                        softDelete: softDelete
					},
					{
						new: true
					}
				);
				if(userToUpdate){
					return res.status(200).json(userToUpdate);
				}
				else{
					return res.status(502).json({
						errorCode: ERRORS.error_processing_request,
						errorMessage: "Please, try again."
					});	
				}
			}
			else{
				return res.status(400).json({
					errorCode: ERRORS.request_data_not_given, 
					errorMessage: "Invalid Request"
				});
			}
		}
		catch(err){
			return res.status(400).json({
				errorCode: ERRORS.request_data_not_given,
				errorMessage: "Invalid request."
			});
		}
    }
    else
    {
        return res.status(400).json({
			errorCode: ERRORS.request_data_not_given, 
			errorMessage: "Invalid Request"
		});
    }
}