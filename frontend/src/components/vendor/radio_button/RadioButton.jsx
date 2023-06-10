import styled from "styled-components";

const SignupInputContainer = styled.div``;
const SignupInputContainerStyle = "h-24 w-96 flex flex-col justify-center items-center relative";

const SignupInputLabel = styled.label``;
const SignupInputLabelStyle = "font-semibold mx-2 px-2 font-primary text-secondary text-sm absolute left-6 top-2 z-20";

const RadioBtnContainer = styled.div``;
const RadioBtnContainerStyle = " flex flex-row items-center w-80 h-20 justify-start mt-6";

const RadioBtn = styled.input``;
const RadioBtnStyle = "text-accent ml-2 bg-accent";

const RadioBtnLabel = styled.label``;
const RadioBtnLabelStyle = "text-secondary font-normal font-primary text-md mr-10 ml-1 font-medium";

const SignupErrorLabelContainer = styled.div``;
const SignupErrorLabelContainerStyle = "h-10 flex items-start w-80";

const SignupErrorLabel = styled.label``;
const SignupErrorLabelStyle = "mt-1 font-normal mx-1 px-1 font-primary text-secondary text-sm";

export default function RadioButton(props){
	return (
		<SignupInputContainer className={SignupInputContainerStyle}>
			<SignupInputLabel className={SignupInputLabelStyle}>
				{props.label}
			</SignupInputLabel>
			<RadioBtnContainer className={RadioBtnContainerStyle}>
				<RadioBtn 
					type="radio" 
					value="Yes" 
					name="gotShopAlreadyWithUs" 
					className={RadioBtnStyle}
					onChange={(event) => props.updateFunc(props.dispatch, event.target.value === "Yes" ? true : false)}
				/>
				<RadioBtnLabel className={RadioBtnLabelStyle}>Yes</RadioBtnLabel>

				<RadioBtn 
					type="radio" 
					value="No" 
					name="gotShopAlreadyWithUs"
					className={RadioBtnStyle}
					onChange={(event) => props.updateFunc(props.dispatch, event.target.value === "Yes" ? true : false)} 
					defaultChecked 
				/>
				<RadioBtnLabel className={RadioBtnLabelStyle}>No</RadioBtnLabel>
			</RadioBtnContainer>

			<SignupErrorLabelContainer className={SignupErrorLabelContainerStyle}>
				<SignupErrorLabel className={SignupErrorLabelStyle}>{props.error}</SignupErrorLabel>
			</SignupErrorLabelContainer>
		</SignupInputContainer>
	);
}