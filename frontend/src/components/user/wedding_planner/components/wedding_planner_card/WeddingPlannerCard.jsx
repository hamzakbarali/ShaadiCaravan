import styled from "styled-components";
import {motion} from "framer-motion";
import {useRef, useEffect, useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import { createTheme, ThemeProvider  } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
import GroupsIcon from '@mui/icons-material/Groups';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';


const Card = styled.div``;
const CardStyle = "border-4 border-accent rounded-xl flex flex-col h-fit w-56 mx-2 mb-3 shadow-2xl items-center";
const CardMotion = {
	hover: {
		scale: 1.02,
		outline: "2px solid #d4b76d",
		boxShadow: "4px 4px 0 #7B3F00"
	}
}

const ServiceNameContainer = styled.div``;
const ServiceNameContainerStyle = "border-b-4 border-accent w-fit flex flex-row justify-center my-2";
const ServiceName = styled.p``;
const ServiceNameStyle = "font-primary text-chocolate font-medium text-lg";
const ServiceNameMotion = {
	hover: {
		textShadow: "2px 2px 0 #d4b76d",
	}
}

const ServiceBookingContainer = styled.div``;
const ServiceBookingContainerStyle = "flex flex-row h-10 items-center gap-2 w-full";

const ServiceBookingIconContainer = styled.div``;
const ServiceBookingIconContainerStyle = "rounded-full h-8 w-8 flex flex-row justify-center items-center bg-accent mx-1";
const ServiceBookingIcon = styled.span``;
const ServiceBookingIconStyle = "";
const theme = createTheme({
  palette: {
    primary: {
      main: "#F3EAD5",
    },
  },
});

const BookingStatus = styled.p``;
const BookingStatusStyle = "font-secondary text-accent font-bold text-lg";

const AppointmentContainer = styled.div``;
const AppointmentContainerStyle = "w-full h-20 mt-1 pl-1 flex flex-row gap-1";

const AppointmentIconContainer = styled.div``;
const AppointmentIconContainerStyle = "rounded-full h-8 w-8 flex flex-row justify-center items-center bg-accent mr-2";
const AppointmentIcon = styled.span``;
const AppointmentIconStyle = ""; 

const AppointmentStatusContainer = styled.div``;
const AppointmentStatusContainerStyle = "w-40";
const AppointmentStatus = styled.p``;
const AppointmentStatusStyle = "font-primary text-chocolate text-base font-medium";

const AppointmentActionIconContainer = styled.div``;
const AppointmentActionIconContainerStyle = "w-full h-11 flex flex-row items-center justify-center gap-5 mb-2";

const AppointmentActionButton = styled.button``;
const AppointmentAcceptIconButtonStyle = "rounded-full h-8 w-8 flex flex-row justify-center items-center bg-accent";
const AppointmentAcceptIconMotion = {
	hover: {
		scale: 1.05,
		boxShadow: "0px",
		rotate: -10
	},
	animate: {
	    x: 0,
	    boxShadow: "3.5px 3.5px 0 #7B3F00",
	}
}
const AppointmentRejectIconButtonStyle = "rounded-full h-8 w-8 flex flex-row justify-center items-center bg-chocolate";
const AppointmentRejectIconMotion = {
	hover: {
		scale: 1.05,
		boxShadow: "0px",
		rotate: -10
	},
	animate: {
	    x: 0,
	    boxShadow: "3.5px 3.5px 0 #d4b76d",
	}
}


export default function WeddingPlannerCard(props){
	return (
		<Card 
			className={CardStyle}
			as={motion.div}
			variants={CardMotion}
			whileHover="hover"
		>
			<ServiceNameContainer className={ServiceNameContainerStyle}>
				<ServiceName 
					className={ServiceNameStyle}
					as={motion.p}
					variants={ServiceNameMotion}
				>
					{props.service}
				</ServiceName>
			</ServiceNameContainer>
			
			<ServiceBookingContainer className={ServiceBookingContainerStyle}>
				<ServiceBookingIconContainer className={ServiceBookingIconContainerStyle}>
					<ServiceBookingIcon className={ServiceBookingIconStyle}>
						<ThemeProvider theme={theme}>
							<ClearIcon color="primary" fontSize="small"/>
						</ThemeProvider>
					</ServiceBookingIcon>
				</ServiceBookingIconContainer>

				<BookingStatus className={BookingStatusStyle}>
					Not Booked
				</BookingStatus>
			</ServiceBookingContainer>

			<AppointmentContainer className={AppointmentContainerStyle}>

				<AppointmentIconContainer className={AppointmentIconContainerStyle}>
					<AppointmentIcon className={AppointmentIconStyle}>
						<ThemeProvider theme={theme}>
							<GroupsIcon color="primary" fontSize="small"/>
						</ThemeProvider>
					</AppointmentIcon>
				</AppointmentIconContainer>
				
				<AppointmentStatusContainer className={AppointmentStatusContainerStyle}>
					<AppointmentStatus className={AppointmentStatusStyle}>
						No appointment
					</AppointmentStatus>
				</AppointmentStatusContainer>
			</AppointmentContainer>

			<AppointmentActionIconContainer className={AppointmentActionIconContainerStyle}>
				<AppointmentActionButton 
					className={AppointmentAcceptIconButtonStyle}
					as={motion.button}
					variants={AppointmentAcceptIconMotion}
					whileHover="hover"
					animate="animate"
				>
					<ThemeProvider theme={theme}>
						<ThumbUpOffAltIcon color="primary" fontSize="small"/>
					</ThemeProvider>
				</AppointmentActionButton>

				<AppointmentActionButton 
					className={AppointmentRejectIconButtonStyle}
					as={motion.button}
					variants={AppointmentRejectIconMotion}
					whileHover="hover"
					animate="animate"
				>
					<ThemeProvider theme={theme}>
						<ThumbDownOffAltIcon color="primary" fontSize="small"/>
					</ThemeProvider>
				</AppointmentActionButton>
			</AppointmentActionIconContainer>

		</Card>
	);
}