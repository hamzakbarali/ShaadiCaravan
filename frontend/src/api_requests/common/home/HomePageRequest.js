import axios from "axios";
import {API_ROUTE_URL, FRONTEND_PATH_URLS, Local_Storage_Strings} from "./../../../utils/imports.js";
import {useNavigate} from "react-router-dom";

export async function MakeHomePageInitialRenderAPIRequest(userId, accountType, accessToken, refreshToken, navigate, setProfile){
	try{
		// Verifying or Creating New Access Token
		const res = await CreateAccessToken(userId, accessToken, refreshToken, accountType);
		// console.log("HERE A", "res", res);
		if(res){
			let verifiedOrNewAccessToken = localStorage.getItem(Local_Storage_Strings.accesstoken);
			// console.log("HERE B", "verifiedOrNewAccessToken", verifiedOrNewAccessToken);
			let api_url = API_ROUTE_URL.get_profile + `${accountType}/${userId}`;
			let profile_res = await axios.get(
				api_url,
				{
					headers: {
						Authorization: `Bearer ${verifiedOrNewAccessToken}`
					}
				}
			);
			// console.log("HERE C", profile_res);
			if(profile_res.status === 200){
				setProfile(profile_res.data);
			}
			else{
				localStorage.clear();
				navigate(FRONTEND_PATH_URLS.loginpage);
			}
		}
		else{
			// console.log("HERE D");
			// Logging User Out
			localStorage.clear();
			navigate(FRONTEND_PATH_URLS.loginpage);
		}
	}
	catch(err){
		// if(err.response.data.errorMessage === 'jwt expired'){
		// 	console.log("HERE B", "refresh token");	
		// }
		// else{
		// 	console.log("HERE C", "some other error");
		// }
		// console.log("HERE D", err);
		setProfile(null);
		localStorage.clear();
		navigate(FRONTEND_PATH_URLS.loginpage);
	}
}

async function CreateAccessToken(userId, accessToken, refreshToken, accountType){
	try{
		const token_res = await axios.post(API_ROUTE_URL.create_new_access_token, {
			accessToken: accessToken, 
			refreshToken: refreshToken, 
			userId: userId,
			accountType: accountType
		});
		// console.log("HERE A", "token_res", token_res);
		if(token_res.status === 200 && token_res.data.success){
			localStorage.removeItem(Local_Storage_Strings.accesstoken);
			localStorage.setItem(Local_Storage_Strings.accesstoken, token_res.data.accessToken);
			return true;
		}
		else{
			return false;
		}
	}
	catch(err){
		if(err.code === "ERR_BAD_REQUEST"){
			// console.log("HERE B");
			if(err.response.data.errorMessage === "Expired Refresh Token"){
				// Log User Out
				// console.log("LOG USER OUT");
				return false;
			}
		}
		else{
			// Log User Out
			// console.log("HERE C", err);
			return false;
		}
	}
}


// if(err.response.data.errorMessage === 'jwt expired'){
// 	console.log("HERE B", "refresh token");	
// }
// else{
// 	console.log("HERE C", "some other error");
// }
