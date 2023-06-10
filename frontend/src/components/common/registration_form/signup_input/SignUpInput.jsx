import styled from "styled-components";

const SignupInputContainer = styled.div``;
const SignupInputContainerStyle = "h-28 w-96 flex flex-col justify-center items-center relative";

const SignupInputLabel = styled.label``;
const SignupInputLabelStyle = "font-semibold mx-2 px-2 font-primary text-secondary text-sm absolute left-6 top-2 z-20";

const SignupInput = styled.input``;
const SignupInputStyle = "w-80 h-12 font-primary rounded-lg mt-4 mx-3 px-2 text-base font-medium drop-shadow text-accent focus:outline-none focus:border-accent focus:border";

const SignupErrorLabelContainer = styled.div``;
const SignupErrorLabelContainerStyle = "h-10 flex items-start w-80";

const SignupErrorLabel = styled.label``;
const SignupErrorLabelStyle = "mt-1 font-normal mx-1 px-1 font-primary text-secondary text-sm";

export default function SignUpInput(props){
	return (
		<SignupInputContainer className={SignupInputContainerStyle}>
			<SignupInputLabel className={SignupInputLabelStyle}>
				{props.label}
			</SignupInputLabel>
			<SignupInput 
				onChange={props.onChange} 
				value={props.value}  
				type={props.type} 
				className={SignupInputStyle}
			/>
			<SignupErrorLabelContainer className={SignupErrorLabelContainerStyle}>
				<SignupErrorLabel className={SignupErrorLabelStyle}>{props.error}</SignupErrorLabel>
			</SignupErrorLabelContainer>
		</SignupInputContainer>
	);
}