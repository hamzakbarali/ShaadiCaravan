import axios from "axios";
import {API_ROUTE_URL, FRONTEND_PATH_URLS, Local_Storage_Strings} from "./../../../utils/imports.js";
import {useNavigate} from "react-router-dom";

export async function GetServicesByServiceTypeAPIRequest(serviceType, setServices){
	try{
		const api_url = API_ROUTE_URL.get_services_by_type + serviceType;
		let accessToken = localStorage.getItem(Local_Storage_Strings.accesstoken);
		let services = await axios.get(
			api_url,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`
				},
			}
		);
		if(services.status === 200 && services.data.success){
			// console.log("HERE A", services.data.services);
			setServices(services.data.services);
		}
		else{
			// console.log("HERE B", "no service found");
			setServices([]);	
		}
	}
	catch(err){
		if(err.code === "ERR_BAD_REQUEST"){
			if(err.response){
				if(!err.response.data.success){
					setServices([]);
				}
			}
		}
		else{
			setServices([]);
		}
		// console.log("HERE C", err);
	}
}