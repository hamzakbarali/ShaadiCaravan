import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LandingPage from "./pages/landingpage/LandingPage.jsx";
import LoginPage from "./pages/loginpage/LoginPage.jsx";
import SignUpPage from "./pages/signuppage/SignUpPage.jsx";
import HomePage from "./pages/homepage/HomePage.jsx";
import FRONTEND_PATH_URLS from "./utils/frontend_path_urls.js";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={FRONTEND_PATH_URLS.landingpage} element={<LandingPage />}/>
        <Route path={FRONTEND_PATH_URLS.loginpage} element={<LoginPage />}/>
        <Route path={FRONTEND_PATH_URLS.signuppage} element={<SignUpPage />}/>
        <Route path={FRONTEND_PATH_URLS.homepage} element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}
