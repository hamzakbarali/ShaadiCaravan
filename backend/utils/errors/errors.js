export const ERRORS = {
	invalid_registration_information   : 0, // Used in auth controllers so far.
	email_already_taken                : 1, // Used in auth controllers so far.
	error_registering_user             : 2, // Used in auth controllers so far.
	invalid_login_information          : 3, // Used in auth controllers so far.
	invalid_account_type               : 4, // Used in auth controllers so far.
	request_data_not_given             : 5, // Used in controllers when data is not passed in req object
	error_processing_request           : 6, // When error occurs in try catch block in controllers
	invalid_information                : 7, // When wrong data is given in req objest
	error_creating_service             : 8, // When error occurs in creating service
	error_getting_vendor_services      : 9, // When error occurs in getting vendor's service(s)
	error_when_db_returns_empty        : 10, // When passed data does not return a result from the db
	error_creating_form                : 11, // When error occurs in creating service form
	error_getting_form                 : 12, // When error occurs in fetching service's form
	// Errors below are the latest & most accurate ones
	
};