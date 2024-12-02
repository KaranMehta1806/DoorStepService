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

export default function userUpdatePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm();
  const navigate = useNavigate();

  



  async function updatePassword(data) {

    try {
        const newPassword = data.newPassword;
        const confirmPassword = data.confirmPassword;
        if(newPassword === confirmPassword){
            const email = localStorage.getItem('email');
           const data2 = { email, newPassword };
           console.log(data2);
           const url = Server_URL + "user/updatePassword"
          const res = await axios.post(url,data2)
          const {error,message} = res.data;
  
          if(error){            
              showErrorToast(message) 
              setTimeout(() => {
                navigate("/user-login");
            }, 1000); 
              
          }
          else{
            localStorage.removeItem('email');
            showSuccessToast("passowrd updated Successfully")
            setTimeout(() => {
                navigate("/user-login");
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
    <div className="my-account-area pt-100 pb-70">
            <div className="container">
                <div className="login-form">
                    <form className="my-account-content"  onSubmit={handleSubmit(updatePassword)}>
                        <div className="section-title">
                            <h3>Update Password</h3>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                            <div className="form-group">
                  <input
                    className="form-control" 
                    placeholder="New Password"
                    {...register("newPassword", { required: true })}
                  />
                  {errors.newPassword && (
                      <p className="text-danger">This field is required</p>
                    )}
                </div>
                <div className="form-group">
                  <input
                    className="form-control" 
                    placeholder="Confirm Password"
                    {...register("confirmPassword", { required: true })}
                  />
                  {errors.confirmPassword && (
                      <p className="text-danger">This field is required</p>
                    )}
                </div>
                                
                            </div>
                            
                            
                            
                            <div className="col-lg-12">
                                <button type="submit" className="default-btn btn-style-fore">Update Password</button>
                            </div>
                        </div>
                       
                        
                    </form>
                </div>
            </div>
        </div> 

    </>
  );
}
