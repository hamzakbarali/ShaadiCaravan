import styled from "styled-components";
import Navbar from "./../../components/navbar/Navbar.jsx";
import {Link, useNavigate} from "react-router-dom";
import peacockIcon from "./../../assets/peacockIcon.png";
import {motion} from "framer-motion";
import {useState, useRef, useEffect} from "react";
import axios from "axios";
import API_ROUTE_URL from "./../../utils/api_route_urls.js";
import {validateLoginInfo} from "./login_utilities.js";
import FRONTEND_PATH_URLS from "./../../utils/frontend_path_urls.js";
import Local_Storage_Strings from "./../../utils/local_storage_strings.js";

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
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [authenticated, setAuthenticated] = useState(false);
	const emailRef = useRef();
	const passwordRef = useRef();
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if(localStorage.getItem(Local_Storage_Strings.authenticated) === "true"){
			navigate(FRONTEND_PATH_URLS.homepage);
		}
	}, []);

	async function formSubmitHandler(event){
		event.preventDefault();
		try{
			let validation = validateLoginInfo(email, password);
			if(validation.result){
				const loginRes = await axios.post(API_ROUTE_URL.login, {
				email   : email,
				password: password
				});
				if(loginRes.status === 200){
					localStorage.setItem(Local_Storage_Strings.accesstoken, loginRes.data.accessToken);
					localStorage.setItem(Local_Storage_Strings.refreshtoken, loginRes.data.refreshToken);
					localStorage.setItem(Local_Storage_Strings.accounttype, loginRes.data.accountType);
					localStorage.setItem(Local_Storage_Strings.userid, loginRes.data.userId);
					setAuthenticated(true);
					localStorage.setItem(Local_Storage_Strings.authenticated, true);
					setEmail("");
					setPassword("");
					navigate(FRONTEND_PATH_URLS.homepage);
				}
			}
			else{
				setErrorMessage(validation.message);
			}

		}
		catch(err){
			setErrorMessage(err.response.data.errorMessage);
			setAuthenticated(false);
			localStorage.setItem(Local_Storage_Strings.authenticated, false);
		}
	}

	return (
		<Container className={ContainerStyle}>
			<Navbar />
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
								onChange={(event) => setEmail(event.target.value)} 
								value={email} 
								ref={emailRef} 
								type="email"  
								placeholder="Email"
								className={LoginInputStyle}
							/>
							<LoginInput 
								onChange={(event) => setPassword(event.target.value)} 
								value={password} 
								ref={passwordRef} 
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

					<PeacockImage src={peacockIcon} className={PeacockImageStyle}/>

					<ErrorMessageContainer className={ErrorMessageContainerStyle}>
						<ErrorMessage className={ErrorMessageStyle}>
							{errorMessage}
						</ErrorMessage>
					</ErrorMessageContainer>
				</FormContainer>
			</Section>
		</Container>
	);
}