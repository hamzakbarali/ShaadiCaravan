import styled from "styled-components";
import {motion} from "framer-motion";

const ServicesTitleContainer = styled.div``;
const ServiceTitleContainerStyle = "w-fit h-fit mt-5 mb-4 flex flex-row items-center justify-center border-b-4 border-chocolate";

const Title = styled.h1``;
const TitleStyle = "font-secondary text-2xl text-accent font-medium";

const TitleMotion = {
	hover: {
		scale: 1.05,
		textShadow: "0px",
	},
	animate: {
		textShadow: "0.5px 0.5px 0 #d4b76d",
	}
}

export default function ServiceTitle(props){
	return (
		<ServicesTitleContainer className={ServiceTitleContainerStyle}>
			<Title 
				className={TitleStyle}
				as={motion.h1}
				variants={TitleMotion}
				whileHover="hover"
				animate="animate"
			>
				{props.title}
			</Title>
		</ServicesTitleContainer>
	);
}