import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Server_URL } from "../../utils/config";
import { showSuccessToast, showErrorToast } from '../../utils/toasthelper';
import { Link } from "react-router-dom";
import BannerArea from "../commonpages/BannerArea";
import { useAuth } from "../commonpages/AuthContext";

// import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';
import { utilityFunctions } from "../../utils/module";
import { useNavigate } from "react-router-dom";
// import { MdDelete } from "react-icons/md";


export default function userLogin() {
    const { setIsAuthenticated } = useAuth();
    let [users,setUsers] = useState([])


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm()

    const navigate = useNavigate();


    async function chkUser(data) {

        try {
            const url = Server_URL+ "user-login"

        const res = await axios.post(url,data)
        const {error,message} = res.data;

        if(error){
            showErrorToast(message)        
        }
        else{
            showSuccessToast(message)
            const {token} = res.data;
            utilityFunctions.setCookie("userAuthToken", token, 24);
            setIsAuthenticated(true);  // Update context state
            navigate("/");
            // <Alert severity="success">{message}</Alert>
        }
            
        } catch (error) {
            showErrorToast(error.message);            
        }
        
        
        
        // console.log(res.data);


        // console.log(data);        
    }

   

    return (
        <>
        <BannerArea data="User Login"/>
        <div className="my-account-area pt-100 pb-70">
            <div className="container">
                <div className="login-form">
                    <form className="my-account-content" onSubmit={handleSubmit(chkUser)}>
                        <div className="section-title">
                            <h2>Log In</h2>
                            <span className="top-title">Keep Connected With Us</span>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                            <div className="form-group">
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Email Address"
                    {...register("email", { required: true })}
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
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <p className="text-danger">This field is required</p>
                  )}
                </div>
                            </div>
                            {/* <div className="col-lg-6 col-sm-6 col-md-6">
                                
                            </div> */}
                            <div className="col-lg-12 col-sm-12 col-md-12 mb-3">
                                <div className="text-account">
                                    <p><Link to="/user/forgotpassword" >Forgot Password?</Link></p>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <button type="submit" className="default-btn btn-style-fore">Login</button>
                            </div>
                        </div>
                       
                        <p>Don’t Have an Account? <Link to="/user/registeruser" >Create One</Link></p>
                    </form>
                </div>
            </div>
        </div>  
















        
      </>
    )
}








