import styled from "styled-components";
import {motion} from "framer-motion";
import {useRef, useEffect, useState, useReducer} from "react";
import {useNavigate, Link} from "react-router-dom";
import axios from "axios";
import {API_ROUTE_URL, FRONTEND_PATH_URLS, Local_Storage_Strings} from "./../../../utils/imports.js";
import {WindowItemCard} from "./imports.js";

const Container = styled.div``;
const ContainerStyle = "border-4 border-chocolate w-11/12 h-fit rounded-xl flex flex-col items-center justify-center my-10 shadow-2xl";

const Title = styled.p``;
const TitleStyle = "font-secondary text-accent text-2xl font-black mt-3";
const TitleMotion = {
	hover: {
		scale: 1.05,
		textShadow: "0px",
	},
	animate: {
		textShadow: "1px 1px 0 #7B3F00",
	}
}

const InformationWindowContainer = styled.div``;
const InformationWindowContainerStyle = "w-full h-full flex flex-col items-center justify-center";

const InformationWindow = styled.div``;
const InformationWindowStyle = "w-full h-fit flex flex-col items-center justify-center gap-3 flex-wrap px-5 py-4 border-2 border-pink";

export default function VendorInfoWindow(props){
	return (
		<Container className={ContainerStyle}>
			<Title 
				className={TitleStyle}
				
			>
				Information Window
			</Title>
			<InformationWindowContainer className={InformationWindowContainerStyle}>
				<InformationWindow className={InformationWindowStyle}>
					<WindowItemCard 
						infoName="Bookings"
						info={`You have ${props.bookings} Bookings.`} // This has to be made dynamic
					/>
					<WindowItemCard 
						infoName="Appointments"
						info="You have 3 Appointments."  
					/>
					<WindowItemCard 
						infoName="Messages"
						info="You have 9 new Messages."  
					/>
				</InformationWindow>
			</InformationWindowContainer>
		</Container>
	);
}