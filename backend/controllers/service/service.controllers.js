import {verifyAccessToken, 
		verifyRefreshToken} from "./../../middleware/auth/auth.middleware.js";
import Service from "./../../models/service/Service.js";
import {ERRORS} from "./../../utils/errors/errors.js";


export async function getServicesByServiceType(req, res, next){
	const {serviceType} = req.params;
	try{
		const fetchedServices = await Service.find({businessType: serviceType});
		console.log("HERE A", fetchedServices);
		if(fetchedServices.length > 0){
			return res.status(200).json({
				services: fetchedServices,
				success : true
			});
		}
		else{
			console.log("HERE B", "No service found");	
			return res.status(400).json({
				success: false
			});
		}
	}
	catch(err){
		console.log("HERE C", err);	
		return res.status(400).json({
			success: false
		});
	}
}

export async function createService(req, res, next){
	const {serviceName, serviceType, vendorId, businessName, businessType, serviceDetails} = req.body;
	if(serviceName && serviceType && vendorId && businessName && businessType && serviceDetails){
		try{
			const newService = new Service({
				serviceName : serviceName.trim(),
				serviceType : serviceType.trim(),
				vendorId : vendorId.trim(),
				businessName: businessName.trim(),
				businessType : businessType.trim(),
				serviceDetails : serviceDetails,
			});

			const isNewServiceCreated = await newService.save();
			if(isNewServiceCreated){
				// console.log("HERE A");
				return res.status(200).json({
					service: isNewServiceCreated,
					success: true
				});
			}
			else{
				// console.log("HERE B");
				// Server error in creating vendor
				return res.status(400).json({
					errorCode: ERRORS.error_creating_service,
					errorMessage: "Please, try creating the service again",
					success: false
				});	
			}
			
		}
		catch(err){
			// If vendor has entered invalid service information
			if(err.name === "ValidationError"){
				// console.log("HERE C");
				return res.status(400).json({
					errorCode: ERRORS.invalid_information,
					errorMessage: err.message.split("|")[1],
					success: false
				});
			}
			// Server error in creating service
			else{
				// console.log("HERE D", err);
				return res.status(502).json({
					errorCode: ERRORS.error_creating_service,
					errorMessage: "Please, try creating the service again.",
					success: false
				});	
			}
		}
	}
	else{
		// When required parameters are not passed from frontend
		return res.status(400).json({
			errorCode: ERRORS.request_data_not_given, 
			errorMessage: "Invalid Request",
			success: false
		});
	}
}


export async function getServiceByServiceId(req, res, next){
	const {serviceId} = req.params;
	if(serviceId){
		try{
			const serviceToFetch = await Service.find({_id: serviceId});
			if(serviceToFetch && serviceToFetch.length === 1){
				return res.status(200).json(
					{
						service: serviceToFetch[0],
						success: true
					});
			}

			if(serviceToFetch && serviceToFetch.length === 0){
				return res.status(400).json({
					errorMessage: "No Such Service Exists",
					success: false
				});
			}
		}
		catch(err){
			console.log("HERE A", err);
			return res.status(502).json({
				errorCode: ERRORS.error_processing_request,
				errorMessage: "Please, try again.",
				success: false
			});
		}
	}
	else{
		// When required parameters are not passed from frontend
		return res.status(400).json({
			errorCode: ERRORS.request_data_not_given, 
			errorMessage: "Invalid Request",
			success: false
		});
	}
}

export async function deleteService(req, res, next){
	const {vendorId} = req.body;
	const {serviceId} = req.params;
	if(vendorId && serviceId){
		try{
			const serviceToDelete = await Service.findOneAndUpdate(
				{
					_id: serviceId, 
					vendorId: vendorId
				}, 
				{
					deleteRequest: true
				},
				{
					new: true
				});

			if(serviceToDelete){
				return res.status(200).json(serviceToDelete);
			}
			else{
				return res.status(502).json({
					errorCode: ERRORS.error_processing_request,
					errorMessage: "Please, try again."
				});
			}
		}
		catch(err){
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

export async function getAllVendorServices(req, res, next){
	const {businessName} = req.params;
	if(businessName){
		try{
			const servicesToGet = await Service.find({businessName: businessName.trim()});
			if(servicesToGet.length > 0){
				return res.status(200).json(servicesToGet);
			}
			else{
				return res.status(400).json({
					errorCode: ERRORS.error_when_db_returns_empty,
					errorMessage: "Wrong business name given"
				})
			}
		}
		catch(err){
			return res.status(502).json({
				errorCode: ERRORS.error_getting_vendor_services,
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
			// ** TODO: See what error to return here **
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

export async function bookedServices(req, res, next) {
	const { userId } = req.params;
	if (userId) {
		try {
			//const userIdObj = mongoose.Types.ObjectId(userId); // Convert userId to ObjectId
			const bookedServices = await Service.find({
				"responses.userId": userId
			});
	
			if (bookedServices.length > 0) {
				res.status(200).json(bookedServices);
			} 
			else {
				res.status(404).json({
					errorCode: ERRORS.error_not_found,
					errorMessage: "No booked services found for the given user."
				});
			}
		} catch (err) {
			res.status(500).json({
			errorCode: ERRORS.error_processing_request,
			errorMessage: "Error retrieving booked services"
			});
		}
		} else {
		// When required parameters are not passed from frontend
		return res.status(400).json({
			errorCode: ERRORS.request_data_not_given,
			errorMessage: "Invalid Request"
		});
	}
}  