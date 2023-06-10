import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {useState, useRef, useEffect, useReducer} from "react";
import {API_ROUTE_URL, FRONTEND_PATH_URLS, Local_Storage_Strings} from "./../../../utils/imports.js";
import {PeacockIcon} from "./../../../assets/imports.js";
import {GeneralNavbar, FormHeading, FormSubmitButton, GeneralRegistrationForm} from "./../../../components/common/imports.js";
import {VendorSpecificRegistrationForm} from "./../../../components/vendor/imports.js";
import SignUpState from "./../../../state/common/auth/sign_up_state/SignUpState.js";
import {SignUpReducer} from "./../../../reducers/common/auth/registration_reducer/imports.js";
import {MakeSignUpAPIRequest, ValidateSignUpFields, CheckSignUpFormForErrors} from "./../../../api_requests/common/auth/imports.js";

const Container = styled.div``;
const ContainerStyle = "min-h-screen max-h-full w-full flex flex-col items-center bg-primary font-primary";

const Section = styled.div``;
const SectionStyle = "w-10/12 h-full flex flex-row justify-start items-start z-20";

const FormContainer = styled.div``;
const FormContainerStyle = "mt-8 flex flex-col justify-start items-start  w-full h-full rounded-3xl border border-accent border-4 drop-shadow-xl relative shadow-2xl mb-14";

const SignupFormContainer = styled.div``;
const SignupFormContainerStyle = "flex flex-col h-full w-full mt-4 mb-4";
const SignupForm = styled.form``;
const SignupFormStyle = "grid grid-cols-3 gap-3";

const SignupBtnContainer = styled.div``;
const SignupBtnContainerStyle = "w-full h-full mb-4 flex flex-row justify-center";
const SignupBtn = styled.button``;
const SignupBtnStyle = "font-primary rounded-lg bg-secondary text-btnTextColor h-8 w-24 text-center text-lg";

const PeacockImage = styled.img``;
const PeacockImageStyle = "z-0 absolute opacity-60 top-4 object-fit left-0 right-5 m-auto w-24 h-24";

export default function LoginPage(props){	
	const navigate = useNavigate();
	const [signupstate, dispatch] = useReducer(SignUpReducer, SignUpState);
	const [isFormCorrect, setIsFormCorrect] = useState(false);

	// When this page is rendered initially.
	useEffect(() => {
		if(localStorage.getItem(Local_Storage_Strings.authenticated) === "true"){
			navigate(FRONTEND_PATH_URLS.homepage);
		}
	}, []);
	
	// Called When User Enters Submit Button
	useEffect(() => {
		if(CheckSignUpFormForErrors(signupstate) && signupstate.validated.value){
			setIsFormCorrect(true);		
		}
		else{
			setIsFormCorrect(false);
		}
	}, [signupstate.validated]);

	// Called Whenever isFormCorrect State Is Changed
	useEffect(() => {
		//console.log("HERE F", "isFormCorrect", isFormCorrect);
		if(isFormCorrect){
			MakeSignUpAPIRequest(signupstate, dispatch, navigate);
		}
	}, [isFormCorrect]);

	async function formSubmitHandler(event){
		event.preventDefault();
		ValidateSignUpFields(signupstate, dispatch);
	}

	return (
		<Container className={ContainerStyle}>
			<GeneralNavbar />
			<Section className={SectionStyle}>
				<FormContainer className={FormContainerStyle}>
					<FormHeading heading="Sign Up" />
					<SignupFormContainer className={SignupFormContainerStyle}>
						<SignupForm 
							id="signupForm" 
							onSubmit={formSubmitHandler}
							className={SignupFormStyle}
						>	
							<GeneralRegistrationForm 
								state={signupstate} 
								dispatch={dispatch}
							/>
							{signupstate.accountType.value === "vendor" ? 
								<VendorSpecificRegistrationForm 
									state={signupstate}
									dispatch={dispatch}
								/> 
							: null}
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
							Sign Up
						</SignupBtn>
					</SignupBtnContainer>
					<PeacockImage src={PeacockIcon} className={PeacockImageStyle}/>
				</FormContainer>
			</Section>
		</Container>
	);
}