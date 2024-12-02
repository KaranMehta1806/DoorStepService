import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { utilityFunctions } from "../../../utils/module";
import { showSuccessToast, showErrorToast } from '../../../utils/toasthelper';
// import { FaTrash } from "react-icons/fa";
// import { CiEdit } from "react-icons/ci";
// import Modal from "react-bootstrap/Modal";
// import EditForm from "./users/EditForm";
// import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
import { Server_URL } from "../../../utils/config";

export default function userVerifyOTP() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm();
  const navigate = useNavigate();

  



  async function verifyOtp(data) {

    try {
        const otp = data.otp;
        const email = localStorage.getItem('email');
        const data2 = { email, otp };
        // console.log(data);

        const url = Server_URL + "user/verifyotp"
          const res = await axios.post(url,data2)
          const {error,message} = res.data;
  
          if(error){
              // showErrorToast(message)   
              
              if (message === 'OTP expired') {
                // Optionally navigate to the resend OTP page
                navigate("/user/forgotpassword"); // Replace with your actual path
            }
            else{
              showErrorToast(message);
            }
          }
          else{
              showSuccessToast(message)
              navigate("/user/forgotpassword/updatepassword")
          }
        
      } catch (error) {
        showErrorToast(error.message)
        
      }
         

        
  }







  return (
    <>
    <div className="my-account-area pt-100 pb-70">
            <div className="container">
                <div className="login-form">
                    <form className="my-account-content" onSubmit={handleSubmit(verifyOtp)}>
                        <div className="section-title">
                            <h3>OTP Verification</h3>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                            <div className="form-group">
                  <input
                    type="number"
                    className="form-control" 
                    placeholder="Enter OTP"
                    {...register("otp", { required: true })}
                  />
                  {errors.otp && (
                      <p className="text-danger">This field is required</p>
                    )}
                </div>
                                
                            </div>
                            
                            
                            
                            <div className="col-lg-12">
                                <button type="submit" className="default-btn btn-style-fore">Verify OTP</button>
                            </div>
                        </div>
                       
                        
                    </form>
                </div>
            </div>
        </div> 
    </>
  );
}
