import styled from "styled-components";
import {motion} from "framer-motion";

const SignupBtnContainer = styled.div``;
const SignupBtnContainerStyle = "";
const SignupBtn = styled.button``;
const SignupBtnStyle = "font-primary rounded-lg bg-secondary text-btnTextColor h-8 w-28 text-center text-lg";

export default function FormSubmitButton(props){
	return (
		<SignupBtnContainer className={SignupBtnContainerStyle}>
			<SignupBtn 
				form={props.form} 
				className={SignupBtnStyle}
				as={motion.button}
				whileHover={{
					scale: 1.05
				}}
			>
				{props.text}
			</SignupBtn>
		</SignupBtnContainer>
	);
}