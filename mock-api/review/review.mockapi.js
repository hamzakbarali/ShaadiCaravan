// This below api is both when user wants to see his own reviews or
// the reviews given to a vendor 
export const VENDOR_GET_REVIEW_REQUEST = {
	"vendorId": "640e6d1998470a969acdcb62",
	"accessToken" : "aasdk34rnewbfemdbfdsjf",
};

export const VENDOR_GET_REVIEW_RESPONSE = {
	"reviews" : [
		0 : {
			"_id" : "232432534rdfrda34wersdf",
			"vendorId": "640e6d1998470a969acdcb62",
			"vendorProfilePicture" : "vendor.png",
			"businessName" : "Taanda Halls",
			"userId" : "Asasadasdfsfhd3232343242",
			"userFirstName": "Hamza",
			"userLastName": "Akbar",
			"userProfilePicture" : "pic.png",
			"review" : "Really bad service",
			"rating" : "1",
			"verifiedPurchase" : "true"
		},
		1 : {
			"_id" : "2332re43875yehjfsdjdsjfhgdsyfrgu43",
			"vendorId": "640e6d1998470a969acdcb62",
			"vendorProfilePicture" : "vendor.png",
			"businessName" : "Taanda Halls",
			"userId" : "jhdfjdbfjs743irebmfhds",
			"userFirstName": "Akbar",
			"userLastName": "Ali",
			"userProfilePicture" : "pic.png",
			"review" : "Really good service",
			"rating" : "4",
			"verifiedPurchase" : "true"
		},
	]
};

export const USER_POST_REVIEW_REQUEST = {
	"accessToken" : "askjadhak343rerwer34534",
	"vendorId" : "Asasjasdfusfkj2324324",
	"vendorProfilePicture" : "vendor.png",
	"businessName" : "Taanda Halls",
	"userId" : "asasahdbsak23234234",
	"userFirstName" : "Hamza",
	"userLastName" : "Akbar",
	"userProfilePicture" : "user.png",
	"review" : "Bad service",
	"rating" : "2",
	"verifiedPurchase" : "true",
};

export const USER_POST_REVIEW_RESPONSE = {
	"reviews" : [
		0 : {
			"_id" : "232432534rdfrda34wersdf",
			"vendorId": "640e6d1998470a969acdcb62",
			"vendorProfilePicture" : "vendor.png",
			"businessName" : "Taanda Halls",
			"userId" : "Asasadasdfsfhd3232343242",
			"userFirstName": "Hamza",
			"userLastName": "Akbar",
			"userProfilePicture" : "pic.png",
			"review" : "bad service",
			"rating" : "2",
			"verifiedPurchase" : "true"
		},
		1 : {
			"_id" : "2332re43875yehjfsdjdsjfhgdsyfrgu43",
			"vendorId": "640e6d1998470a969acdcb62",
			"vendorProfilePicture" : "vendor.png",
			"businessName" : "Taanda Halls",
			"userId" : "jhdfjdbfjs743irebmfhds",
			"userFirstName": "Akbar",
			"userLastName": "Ali",
			"userProfilePicture" : "pic.png",
			"review" : "Really good service",
			"rating" : "4",
			"verifiedPurchase" : "true"
		},
	]
}
