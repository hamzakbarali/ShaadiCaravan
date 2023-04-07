import styled from "styled-components";
import Navbar from "./../../components/navbar/Navbar.jsx";
import {Link, useNavigate} from "react-router-dom";
import peacockIcon from "./../../assets/peacockIcon.png";
import {motion} from "framer-motion";
import {useState, useRef, useEffect} from "react";
import axios from "axios";
import API_ROUTE_URL from "./../../utils/api_route_urls.js";
import FRONTEND_PATH_URLS from "./../../utils/frontend_path_urls.js";
import Local_Storage_Strings from "./../../utils/local_storage_strings.js";

const Container = styled.div``;
const ContainerStyle = " h-screen min-h-screen max-h-full w-full flex flex-col items-center bg-primary font-primary";

const Section = styled.div``;
const SectionStyle = "w-10/12 h-full flex flex-row justify-start items-start z-20";

const FormContainer = styled.div``;
const FormContainerStyle = "flex flex-col justify-start items-start gap-4 w-full h-full rounded-3xl border border-accent border-4 drop-shadow-xl relative shadow-xl";

const FormHeadingContainer = styled.div``;
const FormHeadingContainerStyle = "mt-28 w-full";
const FormHeading = styled.h1``;
const FormHeadingStyle = "font-primary text-secondary text-4xl font-medium text-center";

const SignupFormContainer = styled.div``;
const SignupFormContainerStyle = "w-full border border-pink-500";
const SignupForm = styled.form``;
const SignupFormStyle = "flex flex-col gap-4 w-full";

const SignupInputContainer = styled.div``;
const SignupInputContainerStyle = "border border-slate-950 h-14 w-80 flex flex-col justify-end";
const SignupInputLabel = styled.label``;
const SignupInputLabelStyle = "";
const SignupInput = styled.input``;
const SignupInputStyle = "font-primary rounded-lg mx-3 px-2 text-lg drop-shadow text-secondary focus:outline-none";

const SignupBtnContainer = styled.div``;
const SignupBtnContainerStyle = "";
const SignupBtn = styled.button``;
const SignupBtnStyle = "font-primary rounded-lg bg-secondary text-btnTextColor h-8 w-28 text-center text-lg";

const PeacockImage = styled.img``;
const PeacockImageStyle = "z-0 absolute opacity-60 top-4 object-fit left-0 right-5 m-auto w-24 h-24";

const ErrorMessageContainer = styled.div``;
const ErrorMessageContainerStyle = " flex items-center justify-center h-8 w-full";
const ErrorMessage = styled.p``;
const ErrorMessageStyle = "text-secondary font-secondary";

export default function LoginPage(props){
	//firstName
	//lastName
	//email
	//password
	//accountType
	//contactNumber
	//language
	//businessName
	//businessType
	//businessAddress
	//gotShopAlreadyWithUs
	//country
	//city

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [authenticated, setAuthenticated] = useState(false);
	const emailRef = useRef();
	const passwordRef = useRef();
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	useEffect(() => {

	}, []);

	async function formSubmitHandler(event){
		event.preventDefault();
		console.log("Form Submit Handler");
	}

	return (
		<Container className={ContainerStyle}>
			<Navbar />
			<Section className={SectionStyle}>
				<FormContainer className={FormContainerStyle}>

					<FormHeadingContainer className={FormHeadingContainerStyle}>
						<FormHeading className={FormHeadingStyle}>Sign Up</FormHeading>
					</FormHeadingContainer>

					<SignupFormContainer className={SignupFormContainerStyle}>
						<SignupForm 
							id="signupForm" 
							onSubmit={formSubmitHandler}
							className={SignupFormStyle}
						>
							<SignupInputContainer className={SignupInputContainerStyle}>
								<SignupInputLabel className={SignupInputLabelStyle}>
									Email
								</SignupInputLabel>
								<SignupInput 
									onChange={(event) => setEmail(event.target.value)} 
									value={email} 
									ref={emailRef} 
									type="email"  
									placeholder="Email"
									className={SignupInputStyle}
								/>
							</SignupInputContainer>
							<SignupInput 
								onChange={(event) => setPassword(event.target.value)} 
								value={password} 
								ref={passwordRef} 
								type="password" 
								placeholder="Password"
								className={SignupInputStyle}
							/>
						</SignupForm>
					</SignupFormContainer>

					<SignupBtnContainer className={SignupBtnContainerStyle}>
						<SignupBtn 
							form="signupForm" 
							className={SignupBtnStyle}
							as={motion.button}
							whileHover={{
								scale: 1.05
							}}
						>
							Register
						</SignupBtn>
					</SignupBtnContainer>

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