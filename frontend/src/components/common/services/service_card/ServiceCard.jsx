import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {useState, useEffect, useRef} from "react";
import axios from "axios";
import {API_ROUTE_URL, FRONTEND_PATH_URLS, Local_Storage_Strings} from "./../../../../utils/imports.js";

import { createTheme, ThemeProvider  } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';

const Container = styled.div``;
const ContainerStyle = "border-2 border-accent w-full h-64 rounded-xl mt-5 flex flex-col shadow-xl bg-white";
const ContainerMotion = {
	hover: {
		scale: 1.02
	}
}

const ImageContainer = styled.div``;
const ImageContainerStyle = "h-40 rounded-t-xl overflow-hidden";

const Image = styled.img``;
const ImageStyle = "rounded-t-lg object-cover"; 
const ImageMotion = {
	hover: {
		scale: 1.1
	}
}

const BusinessNameContainer = styled.div``;
const BusinessNameContainerStyle = "mt-2";

const BusinessName = styled.p``;
const BusinessNameStyle = "font-secondary text-accent font-bold text-xl pl-1";

const LocationAndRatingContainer = styled.div``;
const LocationAndRatingContainerStyle = "w-full flex flex-row justify-between items-center";

const Location = styled.p``;
const LocationStyle = "pl-1 font-primary text-base text-chocolate font-medium";

const RatingContainer = styled.div``;
const RatingContainerStyle = "flex flex-row items-center gap-1 justify-center";

const Star = styled.span``;
const theme = createTheme({
  palette: {
    primary: {
      main: "#F43F64",
    },
  },
});

const Rating = styled.p``;
const RatingStyle = "text-sm font-primary text-chocolate font-medium";

const ReviewCount = styled.p``;
const ReviewCountStyle = "text-sm font-primary text-chocolate font-medium";

export default function ServiceCard(props){
	return (
		<Container 
			className={ContainerStyle}
			as={motion.div}
			variants={ContainerMotion}
			whileHover="hover"
		>
			<ImageContainer className={ImageContainerStyle}>
				<Image 
					className={ImageStyle}
					as={motion.img}
					variants={ImageMotion}
					src={props.img}
				/>
			</ImageContainer>

			<BusinessNameContainer className={BusinessNameContainerStyle}>
				<BusinessName className={BusinessNameStyle}>
					{props.businessName}
				</BusinessName>
			</BusinessNameContainer>

			<LocationAndRatingContainer className={LocationAndRatingContainerStyle}>
				<Location className={LocationStyle}>
					{props.location}
				</Location>

				<RatingContainer className={RatingContainerStyle}>
					<ThemeProvider theme={theme}>
						<Star><StarIcon fontSize="small" color="primary"/></Star>
					</ThemeProvider>

					<Rating className={RatingStyle}>
						{props.rating}
					</Rating>

					<ReviewCount className={ReviewCountStyle}>
						{props.reviews}
					</ReviewCount>
				</RatingContainer>
			</LocationAndRatingContainer>
		</Container>
	);
}