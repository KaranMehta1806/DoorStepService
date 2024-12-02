import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { utilityFunctions } from "../../../utils/module";
import { showSuccessToast, showErrorToast } from '../../../utils/toasthelper';
import { useNavigate } from "react-router-dom";
// import { FaTrash } from "react-icons/fa";
// import { CiEdit } from "react-icons/ci";
// import Modal from "react-bootstrap/Modal";
// import EditForm from "./users/EditForm";
// import { userContext } from "../App";
import { Server_URL } from "../../../utils/config";
import BannerArea from "../../commonpages/AdminBannerArea";


export default function addCategory() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
    setValue,
  } = useForm();
  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken')
      const url = Server_URL + "managecategory";
      const response = await axios.post(url, data,{
        headers:{
            Authorization:token ? `Bearer ${token}` : ""
        }
    }
);
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
        // getAdminData()
        // navigate('/user/signin');
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  // useEffect(() => {
  //   setFocus('categoryName')
  // }, []);

  return (
    <>
    <BannerArea data="Add Category"/>

      {/* <div className="container py-5">
        <div className="row">
          <div className="col-md-8 offset-md-2 ">
            <div className="card shadow-lg">
              <div className="card-header bg-dark text-white py-2">
                Create Category
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-2">
                    <label>Enter Category Name</label>
                    <input
                      {...register("categoryName", { required: true })}
                      className="form-control"
                      type="text"
                      placeholder="Enter category"
                    ></input>
                    <br />
                    {errors.categoryName && (
                      <p className="text-danger">This field is required</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea {...register('description' , { required: true })} className="form-control shadow" placeholder="Enter Description"></textarea>
                    {errors.description && (
                      <p className="text-danger">This field is required</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Full Description</label>
                    <textarea {...register('fullDescription' , { required: true })} className="form-control shadow" placeholder="Enter Full Description"></textarea>
                    {errors.fullDescription && (
                      <p className="text-danger">This field is required</p>
                    )}
                  </div>
                  
                  

                  <button className="btn btn-success mt-2">Add category</button>
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
          <h2>Add Service</h2>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Service Name"
                {...register("categoryName", { 
                  required: "Category Name is required",
                  minLength: {
                    value: 3,
                    message: "Category Name must be at least 3 characters long"
                  },
                })}
                onChange={(e) => {
                  // Replace multiple spaces with a single space and trim the start
                  e.target.value = e.target.value.replace(/\s+/g, ' ').trimStart();
                  setValue("categoryName", e.target.value); // Update value with modified input
                }}
              />
              {errors.categoryName && (
                <p className="text-danger">{errors.categoryName.message}</p>
              )}
            </div>
          </div>

          <div className="col-lg-12">
            <div className="form-group">
              <textarea
                className="form-control"
                placeholder="Description"
                {...register('description', { 
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters long"
                  },
                })}
                onChange={(e) => {
                  // Replace multiple spaces with a single space and trim the start
                  e.target.value = e.target.value.replace(/\s+/g, ' ').trimStart();
                  setValue("description", e.target.value); // Update value with modified input
                }}
              />
              {errors.description && (
                <p className="text-danger">{errors.description.message}</p>
              )}
            </div>
          </div>

          <div className="col-lg-12">
            <div className="form-group">
              <textarea
                className="form-control"
                placeholder="Full Description"
                {...register('fullDescription', { 
                  required: "Full Description is required",
                  minLength: {
                    value: 20,
                    message: "Full Description must be at least 20 characters long"
                  },
                })}
                onChange={(e) => {
                  // Replace multiple spaces with a single space and trim the start
                  e.target.value = e.target.value.replace(/\s+/g, ' ').trimStart();
                  setValue("fullDescription", e.target.value); // Update value with modified input
                }}
              />
              {errors.fullDescription && (
                <p className="text-danger">{errors.fullDescription.message}</p>
              )}
            </div>
          </div>

          <div className="col-lg-12">
            <button type="submit" className="default-btn btn-style-fore">
              Add Category
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

