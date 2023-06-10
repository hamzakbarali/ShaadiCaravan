import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {useState, useRef, useEffect, useReducer} from "react";
import {validateLoginInfo} from "./login_utilities.js";
import {API_ROUTE_URL, FRONTEND_PATH_URLS, Local_Storage_Strings} from "./../../../utils/imports.js";
import {PeacockIcon} from "./../../../assets/imports.js";
import {GeneralNavbar} from "./../../../components/common/imports.js";
import LoginState from "./../../../state/common/auth/login_state/LoginState.js";
import {LoginReducer, updateEmail, updatePassword, updateAuthenticated, updateErrorSpecific} from "./../../../reducers/common/auth/login_reducer/imports.js";
import {MakeLoginAPIRequest} from "./../../../api_requests/common/auth/imports.js";

const Container = styled.div``;
const ContainerStyle = " h-screen min-h-screen max-h-full w-full flex flex-col items-center bg-primary font-primary";

const Section = styled.div``;
const SectionStyle = "w-10/12 h-full flex flex-row justify-center items-center z-20";

const FormContainer = styled.div``;
const FormContainerStyle = "flex flex-col justify-center gap-4 w-1/3 h-3/5 rounded-3xl items-center border border-accent border-4 drop-shadow-xl relative shadow-2xl";

const FormHeadingContainer = styled.div``;
const FormHeadingContainerStyle = " mt-16";
const FormHeading = styled.h1``;
const FormHeadingStyle = "font-primary text-secondary text-4xl font-medium text-center";

const LoginFormContainer = styled.div``;
const LoginFormContainerStyle = "w-full";
const LoginForm = styled.form``;
const LoginFormStyle = "flex flex-col gap-4 w-full";

const LoginInput = styled.input``;
const LoginInputStyle = "font-primary rounded-lg mx-3 h-7 px-2 text-lg drop-shadow text-secondary focus:outline-none";

const LoginBtnContainer = styled.div``;
const LoginBtnContainerStyle = "";
const LoginBtn = styled.button``;
const LoginBtnStyle = "font-primary rounded-lg bg-secondary text-btnTextColor h-8 w-24 text-center text-lg";

const PeacockImage = styled.img``;
const PeacockImageStyle = "z-0 absolute opacity-60 top-5 object-fit left-0 right-5 m-auto w-24 h-24";

const ErrorMessageContainer = styled.div``;
const ErrorMessageContainerStyle = " flex items-center justify-center h-8 w-full";
const ErrorMessage = styled.p``;
const ErrorMessageStyle = "text-secondary font-secondary";

export default function LoginPage(props){
	const navigate = useNavigate();
	const [loginstate, dispatch] = useReducer(LoginReducer, LoginState);

	// When this page is rendered initially.
	useEffect(() => {
		if(localStorage.getItem(Local_Storage_Strings.authenticated) === "true"){
			navigate(FRONTEND_PATH_URLS.homepage);
		}
	}, []);

	// When loginstate.error is updated when login form is submitted
	useEffect(() => {
		MakeLoginAPIRequest(loginstate, dispatch, navigate); 
	}, [loginstate.error]);

	function formSubmitHandler(event){
		event.preventDefault();
		updateErrorSpecific(dispatch, loginstate.email.value, loginstate.password.value);
	}

	return (
		<Container className={ContainerStyle}>
			<GeneralNavbar />
			<Section className={SectionStyle}>
				<FormContainer className={FormContainerStyle}>

					<FormHeadingContainer className={FormHeadingContainerStyle}>
						<FormHeading className={FormHeadingStyle}>Sign In</FormHeading>
					</FormHeadingContainer>

					<LoginFormContainer className={LoginFormContainerStyle}>
						<LoginForm 
							id="loginForm" 
							onSubmit={formSubmitHandler}
							className={LoginFormStyle}
						>
							<LoginInput 
								onChange={(event) => updateEmail(dispatch, event.target.value)}
								value={loginstate.email.value}  
								type="email"  
								placeholder="Email"
								className={LoginInputStyle}
							/>
							<LoginInput 
								onChange={(event) => updatePassword(dispatch, event.target.value)} 
								value={loginstate.password.value}  
								type="password" 
								placeholder="Password"
								className={LoginInputStyle}
							/>
						</LoginForm>
					</LoginFormContainer>

					<LoginBtnContainer className={LoginBtnContainerStyle}>
						<LoginBtn 
							form="loginForm" 
							className={LoginBtnStyle}
							as={motion.button}
							whileHover={{
								scale: 1.05
							}}
						>
							Login
						</LoginBtn>
					</LoginBtnContainer>

					<PeacockImage src={PeacockIcon} className={PeacockImageStyle}/>

					<ErrorMessageContainer className={ErrorMessageContainerStyle}>
						<ErrorMessage className={ErrorMessageStyle}>
							{loginstate.error.value}
						</ErrorMessage>
					</ErrorMessageContainer>
				</FormContainer>
			</Section>
		</Container>
	);
}
