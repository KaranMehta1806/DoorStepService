import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/AdminNavbar";
import Footer from "../components/Footer";
import { utilityFunctions } from "../utils/module";
import { ToastContainer } from 'react-toastify';

import { useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const [render, setRender] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (utilityFunctions.checkCookieExists("adminAuthToken")) {
      setRender(true);
    }
    else{
      navigate("/admin-login");
    }
  }, []);

  return (
    <>
      {render ? (
        <>
          <Navbar />
          <Outlet />
          <Footer />
        </>
      ) : null}
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
