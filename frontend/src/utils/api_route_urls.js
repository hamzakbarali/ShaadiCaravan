const API_ROUTE_URL = {
	base        			: "http://localhost:4000/api",
	login       			: "http://localhost:4000/api/auth/login",
	register    			: "http://localhost:4000/api/auth/register",
	get_profile 			: "http://localhost:4000/api/profile/get_profile/",
	create_new_access_token : "http://localhost:4000/api/auth/create_access_token",
	get_services_by_type    : "http://localhost:4000/api/service/get-services-by-type/",
	get_service_by_id       : "http://localhost:4000/api/service/get-service/",
	get_all_users			: "http://localhost:4000/api/admin/get-all-users/",
	update_user				: "http://localhost:4000/api/admin/update-user/:userId/",
	delete_user				: "http://localhost:4000/api/admin/delete-user/:userId",
	create_user				: "http://localhost:4000/api/admin/create-user",
	create_new_service      : "http://localhost:4000/api/service/create-service",
	create_new_booking      : "http://localhost:4000/api/booking/create-booking",
	get_vendor_bookings     : "http://localhost:4000/api/booking/get-bookings/",
}

export default API_ROUTE_URL;