import styled from "styled-components";
import { motion } from "framer-motion";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import GroupsIcon from "@mui/icons-material/Groups";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

const Card = styled.div``;
const CardStyle =
  "border-4 border-accent rounded-xl flex flex-col h-fit w-8/12 mx-2 mb-3 shadow-2xl items-center";
const CardMotion = {
  hover: {
    scale: 1.02,
    outline: "2px solid #d4b76d",
    boxShadow: "4px 4px 0 #7B3F00",
  },
};

const InfoNameContainer = styled.div``;
const InfoNameContainerStyle =
  "border-b-4 border-accent w-fit flex flex-row justify-center my-2";
const InfoName = styled.p``;
const InfoNameStyle =
  "font-primary text-chocolate font-medium text-lg";
const InfoNameMotion = {
  hover: {
    textShadow: "2px 2px 0 #d4b76d",
  },
};

const InfoContainer = styled.div``;
const InfoContainerStyle = "w-11/12 h-full";

const InfoDetailContainer = styled.div``;
const InfoDetailContainerStyle =
  "flex flex-row items-center gap-2 w-full mb-4 justify-center"; // Modified style

const InfoDetailIconContainer = styled.div``;
const InfoDetailIconContainerStyle =
  "rounded-full h-8 w-8 flex flex-row justify-center items-center bg-accent mx+1";
const InfoDetailIcon = styled.span``;
const InfoDetailIconStyle = "";
const theme = createTheme({
  palette: {
    primary: {
      main: "#F3EAD5",
    },
  },
});

const InfoStatus = styled.p``;
const InfoStatusStyle = "font-secondary text-chocolate font-bold text-xl";

export default function DashboardWindowCard(props) {
  return (
    <Card
      className={CardStyle}
      as={motion.div}
      variants={CardMotion}
      whileHover="hover"
    >
      <InfoNameContainer className={InfoNameContainerStyle}>
        <InfoName
          className={InfoNameStyle}
          as={motion.p}
          variants={InfoNameMotion}
        >
          {props.infoName}
        </InfoName>
      </InfoNameContainer>

      <InfoContainer className={InfoContainerStyle}>
        <InfoDetailContainer className={InfoDetailContainerStyle}>
          <InfoDetailIconContainer className={InfoDetailIconContainerStyle}>
            <InfoDetailIcon className={InfoDetailIconStyle}>
              <ThemeProvider theme={theme}>
                <ThumbUpOffAltIcon color="primary" fontSize="small" />
              </ThemeProvider>
            </InfoDetailIcon>
          </InfoDetailIconContainer>

          <InfoStatus className={InfoStatusStyle}>{props.info}</InfoStatus>
        </InfoDetailContainer>
      </InfoContainer>
    </Card>
  );
}