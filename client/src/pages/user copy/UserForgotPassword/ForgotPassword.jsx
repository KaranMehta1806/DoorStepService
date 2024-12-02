import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { utilityFunctions } from "../../../utils/module";
import { showSuccessToast, showErrorToast } from '../../../utils/toasthelper';
import { Link } from "react-router-dom";

// const nodemailer = require('nodemailer');
// import { FaTrash } from "react-icons/fa";
// import { CiEdit } from "react-icons/ci";
// import Modal from "react-bootstrap/Modal";
// import EditForm from "./users/EditForm";
// import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
import { Server_URL } from "../../../utils/config";

export default function userForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm();
  const navigate = useNavigate();

  // function generateOTP() {
  //   const otp = Math.floor(100000 + Math.random() * 900000);
  //   return otp.toString(); 
  // }


  // async function sendOTPEmail(email, otp) {
  //   // Create a transporter object
  //   let transporter = nodemailer.createTransport({
  //     service: 'Gmail', // You can use other services like Outlook, Yahoo, etc.
  //     auth: {
  //       user: 'your-email@gmail.com', // Your email
  //       pass: 'your-email-password'   // Your email password or app password
  //     }
  //   });
  
  //   // Mail options
  //   let mailOptions = {
  //     from: 'your-email@gmail.com',
  //     to: email, // Recipient's email
  //     subject: 'Your OTP Code',
  //     text: `Your OTP code is: ${otp}` // The message content, containing the OTP
  //   };
  
  //   // Send the email
  //   try {
  //     let info = await transporter.sendMail(mailOptions);
  //     console.log('Email sent: ' + info.response);
  //   } catch (error) {
  //     console.error('Error sending email:', error);
  //   }
  // }
  // const otp = generateOTP();
  






  



  async function verifyEmail(data) {
    try {
      const url = Server_URL + "user/verifyemail"
        const res = await axios.post(url,data)
        const {error,message} = res.data;

        if(error){
            showErrorToast(message)        
        }
        else{
          localStorage.setItem('email', data.email);
            showSuccessToast(message)
            navigate("/user/forgotpassword/verifyotp")
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
                    <form className="my-account-content" onSubmit={handleSubmit(verifyEmail)}>
                        <div className="section-title">
                            <h3>Email Verification</h3>
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
                                <button type="submit" className="default-btn btn-style-fore">Verify Email</button>
                            </div>
                        </div>
                       
                        
                    </form>
                </div>
            </div>
        </div> 


























      
    </>
  );
}
