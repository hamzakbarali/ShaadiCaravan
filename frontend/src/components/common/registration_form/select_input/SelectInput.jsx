import styled from "styled-components";

const SignupInputContainer = styled.div``;
const SignupInputContainerStyle = "h-28 w-96 flex flex-col justify-center items-center relative";

const SignupInputLabel = styled.label``;
const SignupInputLabelStyle = "font-semibold mx-2 px-2 font-primary text-secondary text-sm absolute left-6 top-2 z-20";

const Select = styled.select``;
const SelectStyle = "w-80 h-12 font-primary rounded-lg mt-4 mx-3 px-2 text-base drop-shadow text-accent focus:outline-none focus:border-accent focus:border font-medium";

const SelectOption = styled.option``;
const SelectOptionStyle = "font-primary rounded-lg font-medium text-accent";

const SignupErrorLabelContainer = styled.div``;
const SignupErrorLabelContainerStyle = "h-10 flex items-start w-80";

const SignupErrorLabel = styled.label``;
const SignupErrorLabelStyle = "mt-1 font-normal mx-1 px-1 font-primary text-secondary text-sm";

export default function SelectInput(props){
	return (
		<SignupInputContainer className={SignupInputContainerStyle}>
			<SignupInputLabel className={SignupInputLabelStyle}>
				{props.label}
			</SignupInputLabel>
			<Select 
				className={SelectStyle}
				onChange={(event) => props.updateFunc(props.dispatch, event.target.value.toLowerCase().replace(/\s+/g, '-'))}
			>
				<SelectOption value="default" defaultValue disabled hidden>{props.placeholder}</SelectOption>
				
				{props.options.map((option) => {
					return (
						<SelectOption key={option} value={option} className={SelectOptionStyle}>
							{option}
						</SelectOption>
					);
				})}
			</Select>
			<SignupErrorLabelContainer className={SignupErrorLabelContainerStyle}>
				<SignupErrorLabel className={SignupErrorLabelStyle}>{props.error}</SignupErrorLabel>
			</SignupErrorLabelContainer>
		</SignupInputContainer>
	);
}