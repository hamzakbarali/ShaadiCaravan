import axios from "axios";
import {updateEmail, updatePassword, updateAuthenticated, updateErrorSpecific, updateErrorGeneral} from "./../../../../reducers/common/auth/login_reducer/imports.js";
import {API_ROUTE_URL, FRONTEND_PATH_URLS, Local_Storage_Strings} from "./../../../../utils/imports.js";
import {useNavigate} from "react-router-dom";

export async function MakeLoginAPIRequest(loginstate, dispatch, navigate){
	try{
		if(loginstate.error.validated){
			const loginRes = await axios.post(API_ROUTE_URL.login, {
				email   : loginstate.email.value,
				password: loginstate.password.value
			});
			if(loginRes.status === 200){
				// console.log("Frontend: HERE A", loginRes);
				localStorage.setItem(Local_Storage_Strings.accesstoken, loginRes.data.accessToken);
				localStorage.setItem(Local_Storage_Strings.refreshtoken, loginRes.data.refreshToken);
				localStorage.setItem(Local_Storage_Strings.accounttype, loginRes.data.accountType);
				localStorage.setItem(Local_Storage_Strings.userid, loginRes.data.userId);
				updateAuthenticated(dispatch, true);
				localStorage.setItem(Local_Storage_Strings.authenticated, true);
				updateEmail(dispatch, "");
				updatePassword(dispatch, "");
				// console.log("Frontend: HERE D");
				navigate(FRONTEND_PATH_URLS.homepage);
				// console.log("Frontend: HERE F");
			}
		}
	}
	catch(err){
		// console.log("FRONTEND: HERE E", err);
		if(err.code === "ERR_NETWORK"){
			updateErrorGeneral(dispatch, "Please, try again later.");
			updateAuthenticated(dispatch, false);
			localStorage.setItem(Local_Storage_Strings.authenticated, false);
			// console.log("HERE B", err);
		}
		else{
			updateErrorGeneral(dispatch, err.response.data.errorMessage);
			updateAuthenticated(dispatch, false);
			localStorage.setItem(Local_Storage_Strings.authenticated, false);
			// console.log("HERE C", err);
		}
	}
}


