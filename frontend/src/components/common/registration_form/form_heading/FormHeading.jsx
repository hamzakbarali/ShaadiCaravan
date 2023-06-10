import styled from "styled-components";

const FormHeadingContainer = styled.div``;
const FormHeadingContainerStyle = "mt-28 w-full";
const FormHeadingText = styled.h1``;
const FormHeadingTextStyle = "font-primary text-secondary text-4xl font-medium text-center";

export default function FormHeading(props){
	return (
		<FormHeadingContainer className={FormHeadingContainerStyle}>
			<FormHeadingText className={FormHeadingTextStyle}>{props.heading}</FormHeadingText>
		</FormHeadingContainer>
	);
}