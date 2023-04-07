import {ERRORS} from "./../../utils/errors/errors.js";
import {ACCOUNT_TYPE} from "./../../utils/constants/constants.js";
import Form from "./../../models/form/Form.js";

export async function createForm(req, res, next){
	const {serviceId, formFields} = req.body;
	if(serviceId && formFields){
		try{
			const formToCreate = new Form({
				serviceId: serviceId.trim(),
				formFields: formFields
			});
			const newFormCreated = await formToCreate.save();
			if(newFormCreated){
				return res.status(200).json(newFormCreated);
			}
			else{
				return res.status(502).json({
					errorCode: ERRORS.error_creating_form,
					errorMessage: "Please, try creating the form again."
				});	
			}
		}
		catch(err){
			// If vendor has entered invalid form information
			if(err.name === "ValidationError"){
				return res.status(400).json({
					errorCode: ERRORS.invalid_information,
					errorMessage: err.message.split("|")[1]
				});
			}
			// Server error in creating form
			else{
				return res.status(502).json({
					errorCode: ERRORS.error_creating_form,
					errorMessage: "Please, try creating the form again."
				});	
			}
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

export async function getFormById(req, res, next){
	const {serviceId} = req.body;
	if(serviceId){
		try{
			const formToFetch = await Form.find({serviceId: serviceId.trim()});
			if(formToFetch.length === 1){
				return res.status(200).json(formToFetch[0]);
			}
			else{
				return res.status(502).json({
					errorCode: ERRORS.error_getting_form,
					errorMessage: "Please, try again."
				});	
			}
		}
		catch(err){
			return res.status(502).json({
				errorCode: ERRORS.error_getting_form,
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

export async function updateForm(req, res, next){
	const {serviceId} = req.params;
	const {formFields, softDelete} = req.body;
	if(serviceId){
		if(formFields || softDelete){
			try{
				const formToUpdate = await Form.findOneAndUpdate(
					{
						serviceId: serviceId.trim()
					}, 
					{
						formFields: formFields,
						softDelete: softDelete
					}, 
					{
						new: true
					}
				);
				if(formToUpdate){
					return res.status(200).json(formToUpdate);
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
	else{
		// When required parameters are not passed from frontend
		return res.status(400).json({
			errorCode: ERRORS.request_data_not_given, 
			errorMessage: "Invalid Request"
		});
	}
}

export async function deleteForm(req, res, next){
	const {serviceId} = req.params;
	if(serviceId){
		try{
			const formToDelete = await Form.findOneAndUpdate(
				{
					serviceId: serviceId.trim()
				}, 
				{
					softDelete: true
				}, 
				{
					new: true
				}
			);
			if(formToDelete){
				return res.status(200).json(formToDelete);
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