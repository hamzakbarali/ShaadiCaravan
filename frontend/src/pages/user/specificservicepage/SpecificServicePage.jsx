import styled from "styled-components";
import {Link, useNavigate, useLocation, useParams} from "react-router-dom";
import {motion} from "framer-motion";
import {useState, useEffect, useRef} from "react";
import axios from "axios";
import {API_ROUTE_URL, FRONTEND_PATH_URLS, Local_Storage_Strings, USER_LEFT_PANEL_MENU_LIST, VENDOR_LEFT_PANEL_MENU_LIST, ADMIN_LEFT_PANEL_MENU_LIST} from "./../../../utils/imports.js";
import {LeftPanelMenu, SpecificNavbar, Services, ServiceTitle} from "./../../../components/common/imports.js";
import {MakeHomePageInitialRenderAPIRequest} from "./../../../api_requests/common/home/imports.js";
import {GetSpecificServiceByServiceIdAPIRequest, BookServiceAPIRequest} from "./../../../api_requests/user/specific_service/imports.js";

const Container = styled.div``;
const ContainerStyle = "min-h-screen max-h-full w-full flex flex-col items-center bg-white font-primary";

const Section = styled.div``;
const SectionStyle = "w-full h-full flex flex-row items-start mb-5";

const Left = styled.div``;
const LeftStyle = "flex-2 flex flex-col bg-primary w-full h-full mx-4 mt-5 rounded-lg sticky border-2 border-accent";

const Right = styled.div``;
const RightStyle = "flex-8 flex flex-col items-center w-full min-h-screen max-h-full bg-primary mr-4 mt-5 rounded-lg border-2 border-accent mb-8";

const ServiceInfoContainer = styled.div``;
const ServiceInfoContainerStyle = "w-8/12 h-10/12 rounded-lg border-4 border-chocolate flex flex-col items-start justify-center shadow-2xl mt-4 py-4";

const ServiceInfo = styled.p``;
const ServiceInfoStyle = "font-primary text-chocolate font-medium text-xl my-2 mx-2";

const ServiceInfoHeading = styled.span``;
const ServiceInfoHeadingStyle = "font-primary text-chocolate font-medium text-xl my-2 mx-2";

const ServiceBookingContainer = styled.div``;
const ServiceBookingContainerStyle = "w-full h-full flex flex-row items-center justify-center"; 

const BookServiceButton = styled.button``;
const BookServiceButtonStyle = "cursor-pointer rounded-md text-base w-fit px-4 py-2 h-fit bg-accent text-btnTextColor mt-1 font-primary font-medium";

export default function SpecificServicePage(props){
	const navigate = useNavigate();
	const [profile, setProfile] = useState(null);
	const {serviceId} = useParams();
	const [service, setService] = useState(null);

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
		if(profile !== null){
			GetSpecificServiceByServiceIdAPIRequest(serviceId, setService);
		}
	}, [profile]);

	// When Book Service button is clicked
	function bookService(event){
		event.preventDefault();
		BookServiceAPIRequest(service, navigate);
	}

	return (<Container className={ContainerStyle}>
			<SpecificNavbar userName={(profile) ? `${profile.firstName} ${profile.lastName}` : ""}/>
			<Section className={SectionStyle}>
				<Left className={LeftStyle}>
					<LeftPanelMenu 
						leftPanelMenuList={(profile !== null) ? USER_LEFT_PANEL_MENU_LIST : null}
						menuType={"services"}
					/>
				</Left>
	
				<Right className={RightStyle}>
					<ServiceTitle title={(service !== null) ? service.serviceName : ""} />
					<ServiceInfoContainer className={ServiceInfoContainerStyle}>
						<ServiceInfo className={ServiceInfoStyle}>
							{(service !== null) ? `Company Name: ${service.businessName}` : ""}
						</ServiceInfo>
						<ServiceInfo className={ServiceInfoStyle}>
							{(service !== null) ? 
								`${service.serviceDetails[0].label}: 
								${service.serviceDetails[0].values[0]} ` 
								: ""
							}
						</ServiceInfo>
						<ServiceInfo className={ServiceInfoStyle}>
							{(service !== null) ? 
								`${service.serviceDetails[1].label}: ${service.serviceDetails[1].values[0]}` : 
								""
							}
						</ServiceInfo>
						<ServiceInfo className={ServiceInfoStyle}>
							{(service !== null) ? 
								`${service.serviceDetails[2].label}: ${service.serviceDetails[2].values[0]}` : 
								""
							}
						</ServiceInfo>
						<ServiceBookingContainer className={ServiceBookingContainerStyle}>
							<BookServiceButton 
								className={BookServiceButtonStyle}
								as={motion.button}
								whileHover={{
									scale: 1.05
								}}
								onClick={bookService}
							>
								Book Service
							</BookServiceButton>
						</ServiceBookingContainer>
					</ServiceInfoContainer>
				</Right>
			</Section>
		</Container>
	);
}