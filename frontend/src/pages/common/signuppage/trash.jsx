<ErrorMessageContainer className={ErrorMessageContainerStyle}>
	<ErrorMessage className={ErrorMessageStyle}>
		{errorMessage}
	</ErrorMessage>
</ErrorMessageContainer>

<SignupInputContainer className={SignupInputContainerStyle}>
	<SignupInputLabel className={SignupInputLabelStyle}>
		Password
	</SignupInputLabel>
	<SignupInput 
		onChange={(event) => setPassword(event.target.value)} 
		value={password} 
		ref={passwordRef} 
		type="password" 
		className={SignupInputStyle}
	/>
</SignupInputContainer>

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

const ErrorMessageContainer = styled.div``;
const ErrorMessageContainerStyle = " flex items-center justify-center h-8 w-full";
const ErrorMessage = styled.p``;
const ErrorMessageStyle = "text-secondary font-secondary";

<FormSubmitButton form="signupForm" text="Register"/>

<RadioButton
	label="Already have a business on ShaadiCaravan?"
	error="Please, answer this question."
/>