import {Outlet} from "react-router";
import {Local_Storage_Strings} from "./../utils/imports.js";

export default function ProtectedRoutes(){
	let authenticated = localStorage.getItem(Local_Storage_Strings.authenticated);
	console.log("HERE A", typeof authenticated);
	if(authenticated == "true"){
		
	}

	return (
		<>

		</>
	);
}