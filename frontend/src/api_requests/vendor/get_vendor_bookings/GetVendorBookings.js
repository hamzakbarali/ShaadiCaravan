import axios from "axios";
import {API_ROUTE_URL, FRONTEND_PATH_URLS, Local_Storage_Strings} from "./../../../utils/imports.js";

export async function GetVendorBookingsAPIRequest(vendorId, setBookings){
	try{
		const api_url = API_ROUTE_URL.get_vendor_bookings + vendorId;
		let accessToken = localStorage.getItem(Local_Storage_Strings.accesstoken);
		let bookings = await axios.get(
			api_url,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`
				},
			}
		);
		if(bookings.data.success && bookings.status === 200){
			setBookings(bookings.data.booking)
		}
		// console.log("HERE A", bookings);
	}
	catch(err){
		setBookings(0);
		console.log("HERE ERROR", err);
	}
}