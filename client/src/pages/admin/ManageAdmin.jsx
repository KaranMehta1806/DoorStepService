import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { utilityFunctions } from "../../utils/module";
import { showSuccessToast, showErrorToast } from "../../utils/toasthelper";
import { Link } from "react-router-dom";
import BannerArea from "../commonpages/AdminBannerArea";

// import { FaTrash } from "react-icons/fa";
// import { CiEdit } from "react-icons/ci";
// import Modal from "react-bootstrap/Modal";
// import EditForm from "./users/EditForm";
// import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
import { Server_URL } from "../../utils/config";

export default function manageAdmin() {
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
      const token = utilityFunctions.getCookieValue("adminAuthToken");
      const url = Server_URL + "admin-registration";
      const response = await axios.post(url, data, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      // console.log(response.data);
      const { error, message } = response.data;
      if (error && message === "SignIn") {
        navigate("/admin-login");
      } else if (error) {
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
    setFocus("fullName");
  }, []);

  return (
    <>
    <BannerArea data="Admin Register"/>
    <div className="my-account-area pt-100 pb-70">
  <div className="container">
    <div className="login-form">
      <form
        className="my-account-content"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="section-title">
          <h2>Register</h2>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Full Name"
                {...register("fullName", { 
                  required: "Full Name is required", 
                  minLength: { value: 3, message: "Full Name must be at least 3 characters long" }
                })}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/\s+/g, ' ').trimStart();
                  setValue("fullName", e.target.value); // Update value with modified input
                }}
              />
              {errors.fullName && (
                <p className="text-danger">{errors.fullName.message}</p>
              )}
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                {...register("email", { 
                  required: "Email is required",
                  minLength: { value: 5, message: "Email must be at least 5 characters long" }
                })}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/\s+/g, ' ').trimStart();
                  setValue("email", e.target.value); // Update value with modified input
                }}
              />
              {errors.email && (
                <p className="text-danger">{errors.email.message}</p>
              )}
            </div>
          </div>
          <div className="col-lg-12">
  <div className="form-group">
    <input
      type="password"
      className="form-control"
      placeholder="Enter Password"
      {...register("password", { 
        required: "Password is required",
        minLength: { value: 6, message: "Password must be at least 6 characters long" }
      })}
      onChange={(e) => {
        // Remove all spaces from the password
        e.target.value = e.target.value.replace(/\s/g, '');
        setValue("password", e.target.value); // Update value with modified input
      }}
    />
    {errors.password && (
      <p className="text-danger">{errors.password.message}</p>
    )}
  </div>
</div>

          <div className="col-lg-12">
            <div className="form-group">
              <input
                type="tel"
                className="form-control"
                placeholder="Enter Mobile Number"
                {...register("mobile", { 
                  required: "Mobile number is required", 
                  minLength: { value: 10, message: "Mobile number must be at least 10 digits long" }
                })}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/\s+/g, ' ').trimStart();
                  setValue("mobile", e.target.value); // Update value with modified input
                }}
              />
              {errors.mobile && (
                <p className="text-danger">{errors.mobile.message}</p>
              )}
            </div>
          </div>

          <div className="col-lg-12">
            <div className="form-group">
              <select
                className="form-control"
                {...register("userRole", { 
                  required: "Please select a role" 
                })}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/\s+/g, ' ').trimStart();
                  setValue("userRole", e.target.value); // Update value with modified input
                }}
              >
                <option value="">Please Select Category</option>
                <option value="admin">Admin</option>
                <option value="subAdmin">Sub-Admin</option>
              </select>
              {errors.userRole && (
                <p className="text-danger">{errors.userRole.message}</p>
              )}
            </div>
          </div>

          <div className="col-lg-12">
            <div className="form-group">
              <textarea
                className="form-control"
                placeholder="Enter Address"
                {...register("address", { 
                  required: "Address is required", 
                  minLength: { value: 5, message: "Address must be at least 5 characters long" }
                })}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/\s+/g, ' ').trimStart();
                  setValue("address", e.target.value); // Update value with modified input
                }}
              />
              {errors.address && (
                <p className="text-danger">{errors.address.message}</p>
              )}
            </div>
          </div>

          <div className="col-lg-12">
            <button type="submit" className="default-btn btn-style-fore">
              Register
            </button>
          </div>
        </div>
        <p>
          Already Have an Account? <Link to="/admin-login">Login</Link>
        </p>
      </form>
    </div>
  </div>
</div>


    </>
  );
}
