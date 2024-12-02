import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { utilityFunctions } from "../../../utils/module";
import { showSuccessToast, showErrorToast } from '../../../utils/toasthelper';
// const nodemailer = require('nodemailer');
// import { FaTrash } from "react-icons/fa";
// import { CiEdit } from "react-icons/ci";
// import Modal from "react-bootstrap/Modal";
// import EditForm from "./users/EditForm";
// import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
import { Server_URL } from "../../../utils/config";

export default function adminForgotPassword() {
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
      const url = Server_URL + "admin/verifyemail"
        const res = await axios.post(url,data)
        const {error,message} = res.data;

        if(error){
            showErrorToast(message)        
        }
        else{
          localStorage.setItem('email', data.email);
            showSuccessToast(message)
            // sendOTPEmail('recipient@example.com', otp);
            navigate("/admin/forgotpassword/verifyotp")
        }
      
    } catch (error) {
      showErrorToast(error.message)
      
    }
        
  }







  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-8 offset-md-2 ">
            <div className="card shadow-lg">
              <div className="card-header bg-dark text-white py-2">
                Forgot Password
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit(verifyEmail)}>
                  {/* <form> */}
                  <div >
                    <label className="form-label">Email</label>
                    <input
                      {...register("email", { required: true })}
                      className="form-control"
                      type="email"
                      placeholder="Enter your Email"
                    ></input>
                    <br />
                    {errors.email && (
                      <p className="text-danger">This field is required</p>
                    )}
                  </div>                

                  <button className="btn btn-success">Verify</button>
                  
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
}
