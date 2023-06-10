import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {useState, useEffect, useRef} from "react";
import { createTheme, ThemeProvider  } from '@mui/material/styles';
import {FRONTEND_PATH_URLS} from "./../../../../../utils/imports.js";

const ItemContainer = styled.div``;
const ItemContainerStyle = "h-14 w-11/12 mt-5 ml-2 flex flex-row items-center gap-3";
const ItemContainerMotion = {
	hover: {
		scale: 1.05,
		boxShadow: "3.5px 3.5px 0 #7B3F00",
	},
	animate: {
	 	x: 0,
	    boxShadow: "0px",
	}
}

const IconContainer = styled.button``;
const IconContainerStyle = "bg-accent rounded-full w-10 h-10 mr-2 ml-2";
const IconContainerMotion = {
	hover: {
		scale: 1.05,
		boxShadow: "2px 2px 0 #7B3F00",
		rotate: -10
	},
	animate: {
		boxShadow: "0px",
		x: 0
	}
}

const Icon = styled.span``;
const IconStyle = "rounded-full ";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F3EAD5", //Icon colour of left menu items
    },
  },
});

const Item = styled.p``;
const ItemStyle = "font-medium text-base font-primary text-chocolate"; //left menu items text
const ItemMotion = {
	hover: {
		scale: 1.1,
		textShadow: "2.5px 2.5px 0 #d4b76d", //Shadow of text
	},
	animate: {
		x: 0,
		textShadow: "0px"
	}
}

export default function LeftPanelMenuItem(props){
	return (
		<Link to={props.to}>
			<ItemContainer 
				className={ItemContainerStyle}
				as={motion.div}
				variants={ItemContainerMotion}
				whileHover="hover"
				animate="animate"
			>
				<IconContainer 
					className={IconContainerStyle}
					as={motion.button}
					variants={IconContainerMotion}
				>
					<ThemeProvider theme={theme}>
						<Icon 
							className={IconStyle}
						>
							{props.icon}
						</Icon>
					</ThemeProvider>
				</IconContainer>

				<Item 
					className={ItemStyle}
					as={motion.p}
					variants={ItemMotion}
				>	
					{props.children}
				</Item>
			</ItemContainer>
		</Link>
	);
}