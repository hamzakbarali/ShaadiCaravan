import styled from "styled-components";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import {Doli} from "./../../../assets/imports.js";

const Container = styled.div``;
const ContainerStyle = "h-20 w-full bg-primary flex justify-center";

const Section = styled.div``;
const SectionStyle = "w-10/12 h-full flex flex-row";

const Left = styled.div``;
const LeftStyle = "h-full flex-1 flex flex-row items-center justify-start";

const Brand = styled.p``;
const BrandStyle = "text-2xl cursor-pointer font-semibold text-secondary font-primary";

const Middle = styled.div``;
const MiddleStyle = "flex-1 h-full flex items-center justify-center";

const NavbarLogo = styled.img``;
const NavbarLogoStyle = "object-cover w-28 h-28 mt-3";

const Right = styled.div``;
const RightStyle = "h-full flex-1 flex flex-row items-center justify-end gap-3";

const LoginBtn = styled.button``;
const LoginBtnStyle = "cursor-pointer font-medium rounded-md px-4 py-1 bg-secondary text-btnTextColor text-lg font-primary";

const SignUpBtn = styled.button``;
const SignUpBtnStyle = "cursor-pointer font-medium rounded-md px-3 py-1 text-lg bg-secondary text-btnTextColor font-primary";

export default function GeneralNavbar(props){
	return (
		<Container className={ContainerStyle}> 
			<Section className={SectionStyle}>
				<Left className={LeftStyle}>
					<Brand className={BrandStyle}>
						<Link to="/">
							ShaadiCaravan
						</Link>
					</Brand>
				</Left>
				<Middle className={MiddleStyle}>
					<NavbarLogo src={Doli} className={NavbarLogoStyle}/>
				</Middle>
				<Right className={RightStyle}>
					<LoginBtn 
						className={LoginBtnStyle}
						as={motion.button}
						whileHover={{
							scale: 1.05
						}}
					>
						<Link to="/login">Login</Link>
					</LoginBtn>
					<SignUpBtn 
						className={SignUpBtnStyle}
						as={motion.button}
						whileHover={{
							scale: 1.05
						}}
					>
						<Link to="/signup">Sign Up</Link>
					</SignUpBtn>
				</Right>
			</Section>
		</Container>
	);
}