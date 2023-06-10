import axios from "axios";
import {API_ROUTE_URL, FRONTEND_PATH_URLS, Local_Storage_Strings} from "./../../../utils/imports.js";
import {useNavigate} from "react-router-dom";

export async function GetSpecificServiceByServiceIdAPIRequest(serviceId, setService){
	try{
		const api_url = API_ROUTE_URL.get_service_by_id + serviceId;
		let accessToken = localStorage.getItem(Local_Storage_Strings.accesstoken);
		let service = await axios.get(
			api_url,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`
				},
			}
		);
		if(service.status === 200 && service.data.success){
			// console.log("HERE A", service.data.service);
			setService(service.data.service);
		}
		else{
			// console.log("HERE B", "service not found");
			setService(null);	
		}
	}
	catch(err){
		if(err.code === "ERR_BAD_REQUEST"){
			if(err.response){
				if(!err.response.data.success){
					setService(null);
				}
			}
		}
		else{
			setService(null);
		}
	}
}

export async function BookServiceAPIRequest(service, navigate){
	try{
		const api_url = API_ROUTE_URL.create_new_booking;
		let accessToken = localStorage.getItem(Local_Storage_Strings.accesstoken);
		let userId = localStorage.getItem(Local_Storage_Strings.userid);
		let booking = await axios.post(
			api_url,
			{
				userId: userId, 
				vendorId: service.vendorId, 
				serviceId: service._id
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`
				},
			}
		);
		if(booking.status === 200 && booking.data.success){
			navigate(FRONTEND_PATH_URLS.homepage);
		}
	}
	catch(err){
		console.log("HERE ERROR:", err)
	}
}