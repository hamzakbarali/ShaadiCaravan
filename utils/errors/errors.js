export const ERRORS = {
	invalid_registration_information   : 0, // Used in auth controllers so far.
	email_already_taken                : 1, // Used in auth controllers so far.
	error_registering_user             : 2, // Used in auth controllers so far.
	invalid_login_information          : 3, // Used in auth controllers so far.
	invalid_account_type               : 4, // Used in auth controllers so far.
	request_data_not_given             : 5, // Used in controllers when data is not passed in req object
	error_processing_request           : 6, // When error occurs in try catch block in controllers
	invalid_information                : 7, // When wrong data is given in req objest
};