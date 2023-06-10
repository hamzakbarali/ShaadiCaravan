import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {useState, useEffect, useRef, useReducer} from "react";
import axios from "axios";
import {API_ROUTE_URL, FRONTEND_PATH_URLS, Local_Storage_Strings, USER_LEFT_PANEL_MENU_LIST, VENDOR_LEFT_PANEL_MENU_LIST, ADMIN_LEFT_PANEL_MENU_LIST} from "./../../../utils/imports.js";
import {LeftPanelMenu, SpecificNavbar} from "./../../../components/common/imports.js";
import {WeddingPlanner} from "./../../../components/user/imports.js";
import {VendorInfoWindow} from "./../../../components/vendor/imports.js";
import {AdminDashboardWindow} from "./../../../components/admin/imports.js";
import {MakeHomePageInitialRenderAPIRequest} from "./../../../api_requests/common/home/imports.js";
import {GetVendorBookingsAPIRequest} from "./../../../api_requests/vendor/get_vendor_bookings/imports.js";

const Container = styled.div``;
const ContainerStyle = "min-h-screen max-h-full w-full flex flex-col items-center bg-white font-primary";

const Section = styled.div``;
const SectionStyle = "w-full h-full flex flex-row  items-start mb-5";

const Left = styled.div``;
const LeftStyle = "flex-2 flex flex-col bg-primary w-full h-full mx-4 mt-5 rounded-lg sticky border-2 border-accent";

const Right = styled.div``;
const RightStyle = "flex-8 flex flex-col items-center w-full h-full bg-primary mr-4 mt-5 rounded-lg border-2 border-accent mb-8";

export default function HomePage(props){
	const navigate = useNavigate();
	const [profile, setProfile] = useState(null);
	const [bookings, setBookings] = useState(0);

	// API Request Made When Page Is Rendered Initially
	useEffect(() => {
		let authenticated = localStorage.getItem(Local_Storage_Strings.authenticated);
		if(authenticated === "false"){
			navigate(FRONTEND_PATH_URLS.loginpage)
		}
		let userId       = localStorage.getItem(Local_Storage_Strings.userid);
		let accountType  = localStorage.getItem(Local_Storage_Strings.accounttype);
		let accessToken  = localStorage.getItem(Local_Storage_Strings.accesstoken);
		let refreshToken = localStorage.getItem(Local_Storage_Strings.refreshtoken);
		MakeHomePageInitialRenderAPIRequest(userId, accountType, accessToken, refreshToken, navigate, setProfile);
	}, []);

	// Runs when user's profile is fetched
	useEffect(() => {
		//console.log("HERE A", profile);
		if(profile !== null){
			let userId = localStorage.getItem(Local_Storage_Strings.userid);
			GetVendorBookingsAPIRequest(userId, setBookings);
		}
	}, [profile]);

	return (
		<Container className={ContainerStyle}>
			<SpecificNavbar userName={(profile) ? `${profile.firstName} ${profile.lastName}` : ""}/>
			<Section className={SectionStyle}>
				<Left className={LeftStyle}>
					<LeftPanelMenu 
						leftPanelMenuList={(profile !== null) ? ((profile.accountType === "user") ? USER_LEFT_PANEL_MENU_LIST :
						(profile.accountType === "vendor") ? VENDOR_LEFT_PANEL_MENU_LIST :
						ADMIN_LEFT_PANEL_MENU_LIST) : null}
						menuType={(profile !== null) ? ((profile.accountType === "user") ? "services" : "vendor") : "services"}
					/>
				</Left>

				<Right className={RightStyle}>
					{(profile !== null) ? 
						((profile.accountType === "user") ? 
							<WeddingPlanner /> : 
						(profile.accountType === "vendor") ?
							<VendorInfoWindow bookings={bookings}/> :
							<AdminDashboardWindow />
					) : null}
				</Right>
			</Section>
		</Container>
	);
}