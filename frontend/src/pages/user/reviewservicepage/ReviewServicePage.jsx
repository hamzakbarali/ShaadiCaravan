import styled from "styled-components";
import {Link, useNavigate, useLocation, useParams} from "react-router-dom";
import {motion} from "framer-motion";
import {useState, useEffect, useRef} from "react";
import axios from "axios";
import {API_ROUTE_URL, FRONTEND_PATH_URLS, Local_Storage_Strings, USER_LEFT_PANEL_MENU_LIST, VENDOR_LEFT_PANEL_MENU_LIST, ADMIN_LEFT_PANEL_MENU_LIST} from "./../../../utils/imports.js";
import {LeftPanelMenu, SpecificNavbar, Services, ServiceTitle} from "./../../../components/common/imports.js";
import {MakeHomePageInitialRenderAPIRequest} from "./../../../api_requests/common/home/imports.js";
import {GetSpecificServiceByServiceIdAPIRequest} from "./../../../api_requests/user/specific_service/imports.js";

export default function ReviewServicePage(props){
    
}