import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { utilityFunctions } from "../../utils/module";
import { showSuccessToast, showErrorToast } from "../../utils/toasthelper";

import { Server_URL } from "../../utils/config";
import axios from "axios";

export default function UserChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm();

  async function ChangePassword(data) {
    try {
      const token = utilityFunctions.getCookieValue("userAuthToken");
      const url = Server_URL + "user/changepassword";
      const res = await axios.put(url, data, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      const { error, message } = res.data;
      if (error && message === "SignIn") {
        navigate("/user-login")
      }
      else if (error) {
        showErrorToast(message);
      } else {
        reset();
        showSuccessToast(message);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  return (
    <>
      {/* <div className="container py-5">
        <div className="row">
          <div className="col-md-8 offset-md-2 ">
            <div className="card shadow-lg">
              <div className="card-header bg-dark text-white py-2">
                Change Password
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit(ChangePassword)}>
                  <div className="mb-2">
                  <label className="form-label">Current Password</label>
                <input
                  {...register("currentpassword", { required: true })}
                  className="form-control"
                  type="password"
                  placeholder="Enter your current password"
                />
                {errors.currentpassword && (
                  <p className="text-danger">This field is required</p>
                )}
                  </div>
                  <div className="mb-3">
                <label className="form-label">New Password</label>
                <input
                  {...register("password", { required: true })}
                  className="form-control"
                  type="password"
                  placeholder="Enter your new password"
                />
                {errors.password && (
                  <p className="text-danger">This field is required</p>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  {...register("confirmpassword", { required: true })}
                  className="form-control"
                  type="password"
                  placeholder="Repeat your password"
                />
                {errors.confirmpassword && (
                  <p className="text-danger">This field is required</p>
                )}
              </div>
                 

                  <button className="btn btn-success mt-2">Update</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>       */}

<div className="my-account-area pt-100 pb-70">
  <div className="container">
    <div className="login-form">
      <form
        className="my-account-content"
        onSubmit={handleSubmit(ChangePassword)}
      >
        <div className="section-title">
          <h3>Change Password</h3>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="form-group">
              {errors.currentpassword && (
                <p className="text-danger">{errors.currentpassword.message}</p>
              )}
              <input
                {...register("currentpassword", {
                  required: "This field is required",
                  pattern: {
                    value: /^\S*$/,
                    message: "No spaces are allowed",
                  },
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 15,
                    message: "Password cannot exceed 15 characters",
                  },
                })}
                className="form-control"
                type="password"
                placeholder="Enter your current password"
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group">
              {errors.password && (
                <p className="text-danger">{errors.password.message}</p>
              )}
              <input
                {...register("password", {
                  required: "This field is required",
                  pattern: {
                    value: /^\S*$/,
                    message: "No spaces are allowed",
                  },
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 15,
                    message: "Password cannot exceed 15 characters",
                  },
                })}
                className="form-control"
                type="password"
                placeholder="Enter your new password"
              />
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group">
              {errors.confirmpassword && (
                <p className="text-danger">{errors.confirmpassword.message}</p>
              )}
              <input
                {...register("confirmpassword", {
                  required: "This field is required",
                  pattern: {
                    value: /^\S*$/,
                    message: "No spaces are allowed",
                  },
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 15,
                    message: "Password cannot exceed 15 characters",
                  },
                })}
                className="form-control"
                type="password"
                placeholder="Repeat your password"
              />
            </div>
          </div>

          <div className="col-lg-12">
            <button type="submit" className="default-btn btn-style-fore">
              Change
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
