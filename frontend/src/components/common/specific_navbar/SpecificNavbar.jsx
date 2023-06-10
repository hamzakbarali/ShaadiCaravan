import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AssistantOutlinedIcon from '@mui/icons-material/AssistantOutlined';
import {DefaultImg} from "./../../../images/imports.js";
import {IconButton, SpecificNavbarBrand} from "./imports.js";
import {FRONTEND_PATH_URLS, Local_Storage_Strings} from "./../../../utils/imports.js";

const Container = styled.div``;
const ContainerStyle = "h-20 w-full bg-primary flex justify-center sticky border-b-2 border-accent";

const Section = styled.div``;
const SectionStyle = "w-full h-full flex flex-row";

const Left = styled.div``;
const LeftStyle = "h-full flex-1 flex flex-row items-center justify-start gap-3";

const Middle = styled.div``;
const MiddleStyle = "flex-1 h-full flex items-center justify-center";

const Right = styled.div``;
const RightStyle = "h-full flex-1 flex flex-row items-center justify-end";

const UserImgContainer = styled.div``;
const UserImgContainerStyle = "rounded-full w-11 h-11";

const UserImg = styled.img``;
const UserImgStyle = "rounded-full w-11 h-11";

export default function SpecificNavbar(props){
	const navigate = useNavigate();

	function signOutHandler(){
		navigate(FRONTEND_PATH_URLS.loginpage);
		localStorage.setItem(Local_Storage_Strings.authenticated, false);
	}

	return (
		<Container className={ContainerStyle}> 
			<Section className={SectionStyle}>
				<Left className={LeftStyle}>
					<SpecificNavbarBrand >
						{props.userName}
					</SpecificNavbarBrand>
					<UserImgContainer className={UserImgContainerStyle}>
						<UserImg className={UserImgStyle} src={DefaultImg}/>
					</UserImgContainer>
				</Left>

				<Middle className={MiddleStyle}>
					
				</Middle>
				
				<Right className={RightStyle}>
					<IconButton>
						<SearchIcon color="primary"/>
					</IconButton>
					<IconButton>
						<NotificationsIcon fontSize="medium" color="primary"/>
					</IconButton>
					<IconButton>
						<AssistantOutlinedIcon fontSize="medium" color="primary" onClick={signOutHandler}/>
					</IconButton>
				</Right>
			</Section>
		</Container>
	);
}