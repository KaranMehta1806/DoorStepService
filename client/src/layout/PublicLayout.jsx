import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/PublicNavbar";
import UserNavbar from "../components/UserNavbar";
import Footer from "../components/Footer"
import { ToastContainer } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { utilityFunctions } from "../utils/module";
import { useAuth } from "../pages/commonpages/AuthContext";

export default function PublicLayout() {
  const { isAuthenticated } = useAuth();
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // useEffect(() => {
  //   const getToken = () => {
  //     // First, try to get the token from local storage
  //     let token = localStorage.getItem("userAuthToken");
  //     // If not found, check cookies
  //     if (!token) {
  //       token = utilityFunctions.getCookieValue("userAuthToken");
  //     }
  //     return token; // Returns the token or null
  //   };
  //   const token = getToken();
  //   setIsAuthenticated(!!token); // Check if token exists
  // }, []); 
  return (
    <>
       {/* {isAuthenticated ? <UserNavbar /> :  */}
       <Navbar />
      
      <Outlet/>
      <Footer/>
      <ToastContainer
position="top-right"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition: Bounce
/>
    </>
  );
}
