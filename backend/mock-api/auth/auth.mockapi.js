//******************* Vendor Auth MOCK API *********************

// Route: http://localhost:4000/api/auth/register
export const VENDOR_REGISTRATION_REQUEST = {
	"firstName": "Hamza", 
	"lastName": "Akbar",
	"email": "hamza@gmail.com",
	"password": "123456",
	"accountType": "vendor",
	"language": "en",
	"contactNumber": "123456789",
	"businessName": "Taanda Halls", 
	"businessType": "wedding_hall",
	"businessAddress": "Saba Avenue",
	"gotShopAlreadyWithUs": "false",
	"country": "Pakistan",
	"city": "Karachi"
};

export const VENDOR_REGISTRATION_RESPONSE = {
	"_id": "ABC",
	"accessToken": "12324asadad",
    "refreshToken": "12324asadad"
};

// Route: http://localhost:4000/api/auth/login
export const VENDOR_LOGIN_REQUEST = {
	"email": "hamza@gmail.com",
	"password": "123456",
};

export const VENDOR_LOGIN_RESPONSE = {
	"_id": "ABC",
	"accessToken": "12324asadad",
    "refreshToken": "12324asadad",
    "accountType" : "vendor"
};

 // Route: http://localhost:4000/api/auth/delete-account/vendor/64109821bb60fa933ea36fa4
export const VENDOR_ACCOUNT_DELETE_REQUEST = {
	"id": "64109821bb60fa933ea36fa4",
	"accountType" : "vendor"
};

export const VENDOR_ACCOUNT_DELETE_RESPONSE = {
	"vendorId": "64109821bb60fa933ea36fa4",
    "accountType": "vendor",
    "deleteRequest": "true",
    "message": "Your account deletion request awaits approval."
};

//********************* User Auth Mock API ******************************
// Route: http://localhost:4000/api/auth/register
export const USER_REGISTRATION_REQUEST = {
	"firstName": "Ather", 
	"lastName": "Akbar",
	"email": "ather@gmail.com",
	"password": "123456",
	"accountType": "user",
	"language": "en"
};

export const USER_REGISTRATION_RESPONSE = {
	"_id": "ABC",
	"accessToken": "12324asadad",
    "refreshToken": "12324asadad"
};

// Route: http://localhost:4000/api/auth/login
export const USER_LOGIN_REQUEST = {
	"email": "hamza@gmail.com",
	"password": "123456",
};

export const USER_LOGIN_RESPONSE = {
	"_id": "ABC",
	"accessToken": "12324asadad",
    "refreshToken": "12324asadad",
    "accountType" : "user"
};

// Route: http://localhost:4000/api/auth/delete-account/user/64109994ace075091b594096
export const USER_ACCOUNT_DELETE_REQUEST = {
	"id": "64109994ace075091b594096",
	"accountType" : "user"
};

export const USER_ACCOUNT_DELETE_RESPONSE = {
	"userId": "64109994ace075091b594096",
    "accountType": "user",
    "deleteRequest": "true",
    "message": "Your account deletion request awaits approval."
};

// Admin Auth Mock API

export const ADMIN_LOGIN_REQUEST = {
	"email": "hamza@gmail.com",
	"password": "123456",
};

export const ADMIN_LOGIN_RESPONSE = {
	"_id": "ABC",
    "accountType" : "admin"
};

