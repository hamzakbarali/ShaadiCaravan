import {FRONTEND_PATH_URLS} from "./imports.js"

// User Left Panel Menu Items List
const USER_LEFT_PANEL_MENU_LIST = [
	{
		"text" : "Wedding Hall",
		"url"  : FRONTEND_PATH_URLS.servicespagedynamic
	}, 
	{
		"text" : "Furniture",
		"url"  : FRONTEND_PATH_URLS.servicespagedynamic
	}, 
	{
		"text" : "Decoration", 
		"url"  : FRONTEND_PATH_URLS.servicespagedynamic
	},
	{
		"text" : "Catering", 
		"url"  : FRONTEND_PATH_URLS.servicespagedynamic
	},
	{
		"text" : "Clothes",
		"url"  : FRONTEND_PATH_URLS.servicespagedynamic
	}, 
	{
		"text" : "Jewelry",
		"url"  : FRONTEND_PATH_URLS.servicespagedynamic
	}, 
	
];

// Vendor Left Panel Menu Items List
const VENDOR_LEFT_PANEL_MENU_LIST = [
	{
		"text": "Create Service",
		"url" : FRONTEND_PATH_URLS.createservicepage,
	}, 
	
];

// Admin Left Panel Menu Items List
const ADMIN_LEFT_PANEL_MENU_LIST = [
	{
		"text": "User",
		"url" : FRONTEND_PATH_URLS.user_list
	}, 
	{
		"text": "Vendor",
		"url" : "",
	}, 
	{
		"text": "Forms",
		"url" : "",
	}, 
	{
		"text": "Services",
		"url" : "",
	}, 
	{
		"text": "Reviews",
		"url" : "",
	}, 
	{
		"text": "Meetings",
		"url" : "",
	}
];

export {USER_LEFT_PANEL_MENU_LIST, VENDOR_LEFT_PANEL_MENU_LIST, ADMIN_LEFT_PANEL_MENU_LIST};