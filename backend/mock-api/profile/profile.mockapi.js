//********************* For reading User & Vendor profiles **************

// Route: http://localhost:4000/api/profile/get_profile/vendor/64109821bb60fa933ea36fa4
export const GET_VENDOR_PROFILE_REQUEST = {
	"id" : "64109821bb60fa933ea36fa4",
	"accountType"  : "vendor"
};

export const GET_VENDOR_PROFILE_RESPONSE = {
	id: "64109821bb60fa933ea36fa4"
	firstName: "Hamza",
	lastName : "Akbar",
	email    : "hamza@gmail.com",
	accountType: "vendor",
	contactNumber: "123456789",
	language: "en",
	country : "Pakistan",
	city : "city",
	businessName: "Taanda Halls",
	businessDescription: "We are a wedding hall service",
	businessType: "wedding-hall",
	businessAddress: "Saba Avenue",
	gotShopAlreadyWithUs: false,
	businessApproved: false,
	profilePicture: "vendor.png",
};


// Route: http://localhost:4000/api/profile/get_profile/user/64109994ace075091b594096
export const GET_USER_PROFILE_REQUEST = {
	"id" : "64109994ace075091b594096",
	"accountType": "user"
};

export const GET_USER_PROFILE_RESPONSE = {
	id: "64109994ace075091b594096",
	firstName: "Ather",
	lastName : "Akbar",
	email    : "ather@gmail.com",
	accountType: "user",
	contactNumber: "123456789",
	language: "en",
	profilePicture: "user.png",
};

// **************For updating user & vendor profiles******************

// Route: http://localhost:4000/api/profile/update_profile/vendor/64109821bb60fa933ea36fa4
export const UPDATE_VENDOR_PROFILE_REQUEST = {
	id : "64109821bb60fa933ea36fa4", 
	accountType: "vendor",
	firstName: "Hamza", 
	lastName: "Akbar", 
	email: "hamza@gmail.com",
	password: "123456", 
	contactNumber: "123456789", 
	language: "en", 
	country: "Pakistan", 
	city: "Karachi", 
	businessName: "Taanda Halls",
	businessDescription: "We are a bad service", 
	businessType: "wedding-hall", 
	businessAddress: "Hell's Bathroom", 
	gotShopAlreadyWithUs: "false",  
	profilePicture: "vendor.png"
};

export const UPDATE_VENDOR_PROFILE_RESPONSE = {
	id : "64109821bb60fa933ea36fa4", 
	accountType: "vendor",
	firstName: "Hamza", 
	lastName: "Akbar", 
	email: "hamza@gmail.com",
	accountType: "vendor", 
	contactNumber: "123456789", 
	language: "en", 
	country: "Pakistan", 
	city: "Karachi", 
	businessName: "Taanda Halls",
	businessDescription: "We are a bad service", 
	businessType: "wedding-hall", 
	businessAddress: "Hell's Bathroom", 
	gotShopAlreadyWithUs: "false",  
	profilePicture: "vendor.png"
};

// Route: http://localhost:4000/api/profile/update_profile/user/64109994ace075091b594096
export const UPDATE_USER_PROFILE_REQUEST = {
	id : "64109994ace075091b594096", 
	accountType: "user",
	firstName: "Ather", 
	lastName: "Akbar", 
	email: "ather@gmail.com",
	password: "123456", 
	contactNumber: "123456789", 
	language: "en", 
	profilePicture: "user.png"
};

export const UPDATE_USER_PROFILE_RESPONSE = {
	id : "64109994ace075091b594096", 
	accountType: "user",
	firstName: "Ather", 
	lastName: "Akbar", 
	email: "ather@gmail.com",
	contactNumber: "123456789", 
	language: "en", 
	profilePicture: "user.png"
};

