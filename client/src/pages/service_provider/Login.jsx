import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { utilityFunctions } from "../../utils/module";
import { showSuccessToast, showErrorToast } from '../../utils/toasthelper';
import { Link } from "react-router-dom";
import BannerArea from "../commonpages/BannerArea";
import { useNavigate } from "react-router-dom";
import { Server_URL } from "../../utils/config";

export default function signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm();
  const navigate = useNavigate();

  



  async function chkServiceProvider(data) {

    try {
      const url = Server_URL+ "serviceproviderlogin"
        const res = await axios.post(url,data)
        const {error,message} = res.data;

        if(error){
            showErrorToast(message)        
        }
        else{
            showSuccessToast(message)
            const {token} = res.data;
            utilityFunctions.setCookie('serviceProviderToken', token , 24) 
            navigate("/providerpages")
            // <Alert severity="success">{message}</Alert>
        }
      
    } catch (error) {
      showErrorToast(error.message)
      
    }

        
  }







  return (
    <>
<BannerArea data="Service Provider Login"/>


<div className="my-account-area pt-100 pb-70">
            <div className="container">
                <div className="login-form">
                    <form className="my-account-content" onSubmit={handleSubmit(chkServiceProvider)}>
                        <div className="section-title">
                            <h2>Log In</h2>
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
                                    <p><Link to="/provider/forgotpassword" >Forgot Password?</Link></p>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <button type="submit" className="default-btn btn-style-fore">Login</button>
                            </div>
                        </div>
                        {/* <div className="border-or">
                            <span>Or Login With</span>
                        </div>
                        <div className="my-account-list">
                            <ul>
                                <li>
                                    <a href="https://www.facebook.com/" target="_blank"> 
                                        <i className='bx bxl-facebook'></i>
                                    </a>
                                </li>   
                                <li>
                                    <a href="https://twitter.com/" target="_blank">
                                        <i className='bx bxl-twitter' ></i>
                                    </a>
                                </li>    
                                <li>
                                    <a href="https://www.linkedin.com/" target="_blank">
                                        <i className='bx bxl-linkedin' ></i>
                                    </a>  
                                </li> 
                                <li>
                                    <a href="https://www.google.com/" target="_blank">
                                        <i className='bx bxl-google' ></i>
                                    </a>  
                                </li> 
                            </ul>
                        </div> */}
                        <p>Don’t Have an Account? <Link to="/serviceprovider" >Create One</Link></p>
                    </form>
                </div>
            </div>
        </div> 
    </>
  );
}
