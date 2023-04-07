import styled from "styled-components";
import Navbar from "./../../components/navbar/Navbar.jsx";
import peacock from "./../../assets/peacock.png";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";

const Container = styled.div``;
const ContainerStyle = "h-screen w-full flex flex-col items-center bg-primary";

const Section = styled.div``;
const SectionStyle = "w-10/12 h-full flex flex-row justify-center items-center relative";

const Left = styled.div``;
const LeftStyle = "flex-1 flex flex-col items-start justify-center gap-4 absolute left-0 top-40";

const PrimaryHeading = styled.h1``;
const PrimaryHeadingStyle = "font-secondary text-6xl font-normal text-accent mb-1";

const Divider = styled.div``;
const DividerStyle = "rounded-md w-14 h-1 bg-accent";

const SecondaryHeading = styled.h2``;
const SecondaryHeadingStyle = "text-4xl	font-medium text-secondary font-primary";

const PlanWeddingBtn = styled.button``;
const PlanWeddingBtnStyle = "cursor-pointer rounded-md text-lg w-52 px-0.5 h-10 bg-secondary text-btnTextColor mt-1 font-primary font-medium";

const Right = styled.div``;
const RightStyle = "flex-1 h-full flex flex-col items-center justify-center absolute right-10";

const HeroImage = styled.img``;

export default function LandingPage(props){
	return (
		<Container className={ContainerStyle}>
			<Navbar />
			<Section className={SectionStyle}>
				<Left className={LeftStyle}>
					<PrimaryHeading className={PrimaryHeadingStyle}>
						ShaadiCaravan
					</PrimaryHeading>
					<Divider className={DividerStyle}/>
					<SecondaryHeading className={SecondaryHeadingStyle}>
						Where You Dream Your Future
					</SecondaryHeading>
					<PlanWeddingBtn
						as={motion.button}
						whileHover={{
							scale: 1.05
						}} 
						className={PlanWeddingBtnStyle}
					>
						<Link to="/login">Plan Your Wedding</Link>
					</PlanWeddingBtn>
				</Left>

				<Right className={RightStyle}>
					<HeroImage src={peacock}/>
				</Right>
			</Section>
		</Container>
	);
}