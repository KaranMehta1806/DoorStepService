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

export default function adminVerifyOTP() {
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
        const otp = data.otp;
        const email = localStorage.getItem('email');
        const data2 = { email, otp };
        // console.log(data);

        const url = Server_URL + "admin/verifyotp"
          const res = await axios.post(url,data2)
          const {error,message} = res.data;
  
          if(error){
              // showErrorToast(message)   
              
              if (message === 'otp expired') {
                // Optionally navigate to the resend OTP page
                navigate("/admin/forgotpassword"); // Replace with your actual path
            }
            else{
              showErrorToast(message);
            }
          }
          else{
              showSuccessToast(message)
              navigate("/admin/forgotpassword/updatepassword")
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
                Verify OTP
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit(chkServiceProvider)}>
                  {/* <form> */}
                  <div >
                    <label className="form-label">OTP</label>
                    <input
                      {...register("otp", { required: true })}
                      className="form-control"
                      placeholder="Enter your OTP"
                    ></input>
                    <br />
                    {errors.otp && (
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
