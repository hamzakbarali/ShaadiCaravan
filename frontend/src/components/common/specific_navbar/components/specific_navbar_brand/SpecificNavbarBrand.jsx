import styled from "styled-components";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import {FRONTEND_PATH_URLS} from "./../../../../../utils/imports.js";

const Brand = styled.p``;
const BrandStyle = "text-xl cursor-pointer font-semibold text-chocolate font-primary ml-6";

export default function SpecificNavbarBrand(props){
	return (
		<Brand 
			className={BrandStyle}
			as={motion.p}
			whileHover={{
				scale: 1.05,
				textShadow: "0px",
			}}
			animate={{
			    x: 0,
			    textShadow: "1.9px 1.9px 0 #d4b76d",
			}}
		>
			<Link to={FRONTEND_PATH_URLS.homepage}>
				{props.children}
			</Link>
		</Brand>
	);
}