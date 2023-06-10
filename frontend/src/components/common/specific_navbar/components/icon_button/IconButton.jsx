import styled from "styled-components";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import { createTheme, ThemeProvider  } from '@mui/material/styles';

const IconBtn = styled.button``;
const IconBtnStyle = "bg-accent rounded-full w-11 h-11 mr-6";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F3EAD5",
    },
  },
});

export default function IconButton(props){

	return (
		<IconBtn 
			className={IconBtnStyle} 
			as={motion.button}
			whileHover={{
				scale: 1.05,
				boxShadow: "0px",
				rotate: -10
			}}
			animate={{
			    x: 0,
			    boxShadow: "3.5px 3.5px 0 #7B3F00",
			}}
			onClick={(props.onClick) ? props.onClick : null}
		>
			<ThemeProvider theme={theme}>
				{props.children}
			</ThemeProvider>
		</IconBtn>
	);
}