import axios from "axios";
import {API_ROUTE_URL, FRONTEND_PATH_URLS, Local_Storage_Strings} from "./../../../utils/imports.js";
import {useNavigate} from "react-router-dom";

export async function CreateNewServiceAPIRequest(profile, servicestate, navigate){
	try{
		const api_url = API_ROUTE_URL.create_new_service;
		let accessToken = localStorage.getItem(Local_Storage_Strings.accesstoken);
		let service = await axios.post(
			api_url,
			{
				serviceName: servicestate.service_name, 
				serviceType: profile.businessType, 
				vendorId: profile.id, 
				businessName: profile.businessName, 
				businessType: profile.businessType, 
				serviceDetails: [{
					label: "Time",
					values: [servicestate.time]
				}, 
				{
					label: "Price",
					values: [servicestate.price]
				}, 
				{
					label: "Days",
					values: [servicestate.day]
				}]
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`
				},
			}
		);
		if(service.data.success){
			navigate(FRONTEND_PATH_URLS.homepage);
		}
		else{
			console.log("NEW SERVICE NOT CREATED");
			navigate(FRONTEND_PATH_URLS.homepage);
		}
	}
	catch(err){
		console.log(err);
		navigate(FRONTEND_PATH_URLS.homepage);
	}
}