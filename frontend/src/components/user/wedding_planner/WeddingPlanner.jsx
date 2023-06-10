import styled from "styled-components";
import {motion} from "framer-motion";
import {useRef, useEffect, useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import axios from "axios";
import {API_ROUTE_URL, FRONTEND_PATH_URLS, Local_Storage_Strings} from "./../../../utils/imports.js";
import {WeddingPlannerCard} from "./imports.js";

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

const ServicesSection = styled.div``;
const ServicesSectionStyle = "w-full h-fit flex flex-row items-center justify-center gap-3 flex-wrap px-5 py-4";

export default function WeddingPlanner(props){
	return (
		<Container className={ContainerStyle}>
			<Title 
				className={TitleStyle}
				
			>
				Wedding Planner
			</Title>
			<ServicesSection className={ServicesSectionStyle}>
				<WeddingPlannerCard service="Wedding Hall"/>
				<WeddingPlannerCard service="Catering"/>
				<WeddingPlannerCard service="Clothes"/>
				<WeddingPlannerCard service="Decoration"/>
				<WeddingPlannerCard service="Jewelry"/>
				<WeddingPlannerCard service="Furniture"/>
			</ServicesSection>
		</Container>
	);
}