import styled from "styled-components";
import {Link, useNavigate, useLocation, useParams} from "react-router-dom";
import {motion} from "framer-motion";
import {useState, useEffect, useRef, useReducer} from "react";
import axios from "axios";
import {API_ROUTE_URL, FRONTEND_PATH_URLS, Local_Storage_Strings, USER_LEFT_PANEL_MENU_LIST, VENDOR_LEFT_PANEL_MENU_LIST, ADMIN_LEFT_PANEL_MENU_LIST} from "./../../../utils/imports.js";
import {LeftPanelMenu, SpecificNavbar, ServiceTitle} from "./../../../components/common/imports.js";
import {MakeHomePageInitialRenderAPIRequest} from "./../../../api_requests/common/home/imports.js";
import {SignUpInput} from "./../../../components/common/imports.js";
import {CreateNewServiceForm} from "./../../../components/vendor/imports.js";
import ServiceState from "./../../../state/vendor/service/service_state/ServiceState.js";
import {CreateServiceReducer} from "./../../../reducers/vendor/service/create_service_reducer/imports.js";
import {CreateNewServiceAPIRequest} from "./../../../api_requests/vendor/create_service/imports.js";

const Container = styled.div``;
const ContainerStyle = "min-h-screen max-h-full w-full flex flex-col items-center bg-white font-primary";

const Section = styled.div``;
const SectionStyle = "w-full h-full flex flex-row items-start mb-5";

const Left = styled.div``;
const LeftStyle = "flex-2 flex flex-col bg-primary w-full h-full mx-4 mt-5 rounded-lg sticky border-2 border-accent";

const Right = styled.div``;
const RightStyle = "flex-8 flex flex-col items-center w-full min-h-screen max-h-full bg-primary mr-4 mt-5 rounded-lg border-2 border-accent mb-8";

const CreateServiceFormContainer = styled.div``;
const CreateServiceFormContainerStyle = "flex flex-col h-full w-full mt-4 mb-4";
const CreateServiceForm = styled.form``;
const CreateServiceFormStyle = "grid grid-cols-3 gap-3";

const SubmitBtnContainer = styled.div``;
const SubmitBtnContainerStyle = "w-full h-full mb-4 flex flex-row justify-center";
const SubmitBtn = styled.button``;
const SubmitBtnStyle = "font-primary rounded-lg bg-accent text-btnTextColor h-8 w-24 text-center text-lg";

const ErrorLabelContainer = styled.div``;
const ErrorLabelContainerStyle = "h-10 w-full flex items-center justify-center mb-4";

const ReturnedError = styled.p``;
const ReturnedErrorStyle = "mt-1 font-normal mx-1 px-1 font-primary text-secondary text-base";

export default function CreateServicePage(props){
	const navigate = useNavigate();
	const [profile, setProfile] = useState(null);
	const [servicestate, dispatch] = useReducer(CreateServiceReducer, ServiceState);

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
			
		}
	}, [profile]);

	function createServiceFormHandler(event){
		event.preventDefault();
		CreateNewServiceAPIRequest(profile, servicestate, navigate);
	}

	return (
		<Container className={ContainerStyle}>
			<SpecificNavbar userName={(profile) ? `${profile.firstName} ${profile.lastName}` : ""}/>
			<Section className={SectionStyle}>
				<Left className={LeftStyle}>
					<LeftPanelMenu 
						leftPanelMenuList={(profile !== null) ? VENDOR_LEFT_PANEL_MENU_LIST : null}
						menuType={"vendor"}
					/>
				</Left>
	
				<Right className={RightStyle}>
					<ServiceTitle title={"Create Your Service"} />
					<CreateServiceFormContainer className={CreateServiceFormContainerStyle}>
						<CreateServiceForm 
							id="createServiceForm" 
							onSubmit={createServiceFormHandler}
							className={CreateServiceFormStyle}
						>
							<CreateNewServiceForm 
								state={servicestate} 
								dispatch={dispatch}
							/>
						</CreateServiceForm>
					</CreateServiceFormContainer>

					<SubmitBtnContainer className={SubmitBtnContainerStyle}>
						<SubmitBtn 
							form="createServiceForm" 
							className={SubmitBtnStyle}
							as={motion.button}
							whileHover={{
								scale: 1.05
							}}
						>
							Submit
						</SubmitBtn>
					</SubmitBtnContainer>
				</Right>
			</Section>
		</Container>
	);
}