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
import BannerArea from "../../commonpages/AdminBannerArea";


export default function addState() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
    setValue
  } = useForm();
  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken')
      const url = Server_URL + "admin-addstate";
      const response = await axios.post(url, data,{
        headers:{
            Authorization:token ? `Bearer ${token}` : ""
        }
    });
      // console.log(response.data);
      const { error, message } = response.data;
      if (error && message === "SignIn") {
        navigate("/admin-login")
      } 
     else if(error){
        showErrorToast(message);
      } else {
        reset();
        showSuccessToast(message);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }


  useEffect(() => {
    setFocus('statename')
  }, []);

  return (
    <>
<BannerArea data="Add State"/>

      {/* <div className="container py-5">
        <div className="row">
          <div className="col-md-8 offset-md-2 ">
            <div className="card shadow-lg">
              <div className="card-header bg-dark text-white py-2">
                Admin Add State
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label className="form-label">State Name </label>
                    <input
                      {...register("stateName", { required: true })}
                      className="form-control"
                      type="text"
                      placeholder="Enter State Name"
                    ></input>
                    <br />
                    {errors.statename && (
                      <p className="text-danger">This field is required</p>
                    )}
                  </div>
                 
                  

                  <button className="btn btn-primary mt-2">Add State</button>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div> */}
      <hr />
      <div className="my-account-area pt-100 pb-70">
  <div className="container">
    <div className="login-form">
      <form
        className="my-account-content"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="section-title">
          <h2>Add State</h2>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="form-group">
              {errors.stateName && (
                <p className="text-danger">{errors.stateName.message}</p>
              )}
              <input
                type="text"
                className="form-control"
                placeholder="Enter State Name"
                {...register("stateName", { 
                  required: "StateName is required",
                  minLength: {
                    value: 3,
                    message: "State Name must be at least 3 characters long"
                  },
                })}
                onBlur={(e) => {
                  // Remove extra spaces between words and trim both ends on blur
                  e.target.value = e.target.value.replace(/\s+/g, ' ').trim();
                  setValue("stateName", e.target.value); // Update value with modified input
                }}
              />
            </div>
          </div>
          <div className="col-lg-12">
            <button type="submit" className="default-btn btn-style-fore">
              Add State
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>


     
    </>
  );
}

