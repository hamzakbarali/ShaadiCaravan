import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import BlurCircularOutlinedIcon from '@mui/icons-material/BlurCircularOutlined';

import {FRONTEND_PATH_URLS} from "./../../../utils/imports.js";
import {LeftPanelMenuItem} from "./imports.js";

const Container = styled.div``;
const ContainerStyle = "mb-5";

export default function LeftPanelMenu(props){
	return (
		<Container className={ContainerStyle}>
			{(props.leftPanelMenuList !== null) ? props.leftPanelMenuList.map((item) => {
				return (<LeftPanelMenuItem 
							to={ (props.menuType === "services") ?
								item.url + item.text.replace(/\s+/g, '-').toLowerCase() : item.url
								}
							icon={
								<BlurCircularOutlinedIcon fontSize="medium" color="primary"/>
							}
							key={item.text}
						>
							{item.text}
						</LeftPanelMenuItem>);
			}) : ""}
			

			
		</Container>
	);
}