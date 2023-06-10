import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {useState, useEffect, useRef} from "react";
import axios from "axios";

import {API_ROUTE_URL, FRONTEND_PATH_URLS, Local_Storage_Strings} from "./../../../utils/imports.js";
import ServiceCard from "./service_card/ServiceCard.jsx";
import {DefaultImg, HallImg, HallImg2} from "./../../../images/imports.js";
import {Couple, Peacock, Doli, DoliIcon} from "./../../../assets/imports.js";

const ContainerForServices = styled.div``;
const ContainerForServicesStyle = "grid grid-cols-4 gap-5 w-11/12 min-h-screen max-h-full mb-10";

const ContainerWithoutServices = styled.div``;
const ContainerWithoutServicesStyle = "w-full h-full flex flex-row items-center justify-center mt-4";
const NoServiceText = styled.p``;
const NoServiceTextStyle = "font-secondary text-2xl text-chocolate font-medium";

export default function Services(props){
	return (
		<>
			{(props.services.length > 0) ? 
				(<ContainerForServices className={ContainerForServicesStyle}>
					{props.services.map((service) => {
						return (
							<Link 
								to={FRONTEND_PATH_URLS.specificservice + service._id} 
								key={service._id}
							>
								<ServiceCard key={service._id} businessName={service.businessName.replace(/-/g, " ")} img={HallImg} location="Karachi" rating="3.7/5" reviews="(43)"/>
							</Link>
						);
					})}

					
				</ContainerForServices>)
				:
				<ContainerWithoutServices className={ContainerWithoutServicesStyle}>
					<NoServiceText className={NoServiceTextStyle}>
						No Services In This Category
					</NoServiceText>
				</ContainerWithoutServices>
			}
		</>
	);
}