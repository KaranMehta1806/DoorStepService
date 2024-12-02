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

export default function adminUpdatePassword() {
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
        const newPassword = data.newPassword;
        const confirmPassword = data.confirmPassword;
        if(newPassword === confirmPassword){
            const email = localStorage.getItem('email');
           const data2 = { email, newPassword };
           console.log(data2);
           const url = Server_URL + "admin/updatePassword"
          const res = await axios.post(url,data2)
          const {error,message} = res.data;
  
          if(error){            
              showErrorToast(message) 
              setTimeout(() => {
                navigate("/admin-login");
            }, 1000); 
              
          }
          else{
            localStorage.removeItem('email');
            showSuccessToast("passowrd updated Successfully")
            setTimeout(() => {
                navigate("/admin-login");
            }, 1000);
          }

        }
        else{
            showErrorToast("Confirm and New Password Does not match")
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
                Update Password
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit(chkServiceProvider)}>
                  {/* <form> */}
                  <div >
                    <label className="form-label">New Password</label>
                    <input
                      {...register("newPassword", { required: true })}
                      className="form-control"
                      placeholder="New Password"
                    ></input>
                    <br />
                    {errors.newPassword && (
                      <p className="text-danger">This field is required</p>
                    )}
                  </div> 

                  <div >
                    <label className="form-label">Confirm Password</label>
                    <input
                      {...register("confirmPassword", { required: true })}
                      className="form-control"
                      placeholder="Enter Confirm Password"
                    ></input>
                    <br />
                    {errors.confirmPassword && (
                      <p className="text-danger">This field is required</p>
                    )}
                  </div>    
                  
                              

                  <button className="btn btn-success">Submit</button>
                  
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
