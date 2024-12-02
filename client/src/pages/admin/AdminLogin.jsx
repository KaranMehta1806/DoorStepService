import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Server_URL } from "../../utils/config";
import { showSuccessToast, showErrorToast } from '../../utils/toasthelper';
import { ToastContainer } from 'react-toastify';

import { Link } from "react-router-dom";
import BannerArea from "../commonpages/BannerArea";
// import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';
import { utilityFunctions } from "../../utils/module";
import { useNavigate } from "react-router-dom";
// import { MdDelete } from "react-icons/md";


export default function SignIn() {

    let [users,setUsers] = useState([])


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm()

    const navigate = useNavigate();


    async function chkAdmin(data) {
        try {
            const url = Server_URL+ "admin-login"

            const res = await axios.post(url,data)
            console.log(res.data);
            const {error,message} = res.data;
            console.log(error)
            console.log(message)
    
            if(error){
                showErrorToast("no such user")        
            }
            else{
                showSuccessToast(message)
                const {token} = res.data;
                utilityFunctions.setCookie('adminAuthToken', token , 24) 
                navigate("/admin/dashboard")
                // <Alert severity="success">{message}</Alert>
            }
        } catch (error) {
            showErrorToast(error.message)
        }
       
        
        
        // console.log(res.data);


        // console.log(data);        
    }

   

    return (

        <>

<BannerArea data="Admin Login"/>
<div className="my-account-area pt-100 pb-70">
            <div className="container">
                <div className="login-form">
                    <form className="my-account-content" onSubmit={handleSubmit(chkAdmin)}>
                        <div className="section-title">
                            <h2>Sign In</h2>
                            {/* <span className="top-title">Keep Connected With Us</span> */}
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                            <div className="form-group">
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Email Address"
                    {...register('email', { required: true })}
                  />
                  {errors.email && (
                    <p className="text-danger">This field is required</p>
                  )}
                </div>
                                
                            </div>
                            <div className="col-lg-12">
                            <div className="form-group">
                  <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Password"
                    {...register('password', { required: true })}
                  />
                  {errors.password && (
                    <p className="text-danger">This field is required</p>
                  )}
                </div>
                            </div>
                            {/* <div className="col-lg-6 col-sm-6 col-md-6">
                                
                            </div> */}
                            {/* <div className="col-lg-12 col-sm-12 col-md-12 mb-3">
                                <div className="text-account">
                                    <p><Link to="/admin/forgotpassword" >Forget Password?</Link></p>
                                </div>
                            </div> */}
                            <div className="col-lg-12">
                                <button type="submit" className="default-btn btn-style-fore">Login</button>
                            </div>
                        </div>
                       
                        
                    </form>
                </div>
            </div>
        </div> 
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
    
    )
}