import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {HomePage, LandingPage, LoginPage, SignUpPage, ServicesPage} from "./pages/common/imports.js";
import {SpecificServicePage, BookServicePage, ReviewServicePage} from "./pages/user/imports.js";
import {CreateServicePage} from "./pages/vendor/imports.js";
import {AdminUserPage} from './pages/admin/import';
import {FRONTEND_PATH_URLS} from "./utils/imports.js";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={FRONTEND_PATH_URLS.landingpage} element={<LandingPage />}/>
        <Route path={FRONTEND_PATH_URLS.loginpage} element={<LoginPage />}/>
        <Route path={FRONTEND_PATH_URLS.signuppage} element={<SignUpPage />}/>
        <Route path={FRONTEND_PATH_URLS.homepage} element={<HomePage />} />
        <Route path={FRONTEND_PATH_URLS.servicespage} element={<ServicesPage />} />
        <Route path={FRONTEND_PATH_URLS.specificservicepage} element={<SpecificServicePage />} />
        <Route path={FRONTEND_PATH_URLS.bookservicepage} element={<BookServicePage />} />
        <Route path={FRONTEND_PATH_URLS.createservicepage} element={<CreateServicePage />} />
        <Route path={FRONTEND_PATH_URLS.reviewservicepage} element={<ReviewServicePage />} />
        <Route path={FRONTEND_PATH_URLS.user_list} element={<AdminUserPage />}/>
      </Routes>
    </BrowserRouter>
  )
}
