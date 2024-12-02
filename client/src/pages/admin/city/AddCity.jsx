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


export default function addCity() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
    setValue
  } = useForm();
  const [state , setState] = useState([])
  const navigate = useNavigate();
  async function getstateData() {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken')
      const url = Server_URL + "admin-readstate";
      const response = await axios.get(url,{
        headers:{
            Authorization:token ? `Bearer ${token}` : ""
        }
    });
      // console.log(response.data);
      const { error, message } = response.data;
      // console.log(error,message);
      if (error && message === "SignIn") {
        navigate("/state-login")
      }
      else if(error) {
        showErrorToast(message);
      } else {
        const { result } = response.data;
          setState(result);
          // alert("Data Fetched Successfully")
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  async function onSubmit(data) {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken')
      const url = Server_URL + "admin-addcity";
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
    getstateData();
  }, []);

  return (
    <>
<BannerArea data="Add City"/>

      {/* <div className="container py-5">
        <div className="row">
          <div className="col-md-8 offset-md-2 ">
            <div className="card shadow-lg">
              <div className="card-header bg-dark text-white py-2">
                Add City
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3" >
            <label className="form-label" htmlFor="state">Select State</label> <br/>
            <select className="form-control" {...register('stateId', { required: true })}  id="state">
            {errors.stateId && <span>First Name is required</span>}
                <option value="">Please Select State</option>
                {state.map(x =>
                    <option key={x._id} value={x._id}>{x.stateName}
                    </option>
                )}
            </select>
            </div>

                  <div className="mb-3">
                    <label className="form-label">City Name </label>
                    <input
                      {...register("cityName", { required: true })}
                      className="form-control"
                      type="text"
                      placeholder="Enter City Name"
                    ></input>
                    <br />
                    {errors.cityName && (
                      <p className="text-danger">This field is required</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Enter Pincode</label>
                    <input
                      {...register("pincode", { required: true })}
                      className="form-control"
                      placeholder="Enter Pincode"
                    ></input>
                    <br />
                    {errors.pincode && (
                      <p className="text-danger">This field is required</p>
                    )}
                  </div>
                 

                  
                  
                  <button className="btn btn-success mt-2">Add City</button>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div> */}
      {/* <hr /> */}

      <div className="my-account-area pt-100 pb-70">
  <div className="container">
    <div className="login-form">
      <form
        className="my-account-content"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="section-title">
          <h2>Add City</h2>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="form-group">
            {errors.stateId && (
                  <p className="text-danger">{errors.stateId.message}</p>
                )}
              <select
                className="form-control"
                placeholder="Select State"
                {...register('stateId', { required: "Select State" })}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/\s+/g, ' ').trimStart();
                  setValue("stateId", e.target.value);
                }}
              >
                
                <option value="">Please Select State</option>
                {state.map(x => 
                  <option key={x._id} value={x._id}>{x.stateName}</option>
                )}
              </select>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group">
            {errors.cityName && (
                <p className="text-danger">{errors.cityName.message}</p>
              )}
              <input
                type="text"
                className="form-control"
                placeholder="Enter City Name"
                {...register("cityName", { required: "City Name is required" })}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/\s+/g, ' ').trimStart();
                  setValue("cityName", e.target.value);
                }}
              />
              
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group">
            {errors.pincode && (
                <p className="text-danger">{errors.pincode.message}</p>
              )}
              <input
                type="text"
                className="form-control"
                placeholder="Enter Pincode"
                {...register("pincode", { 
                  required: "Pincode is required",
                  // minLength: {
                  //   value: 6,
                  //   message: "Category Name must be at least 6 characters long"
                  // },
                })}
                onChange={(e) => {
                  // Replace multiple spaces with a single space and trim the start
                  e.target.value = e.target.value.replace(/\s+/g, ' ').trimStart();
                  setValue("pincode", e.target.value); // Update value with modified input
                }}
              />
              
            </div>
          </div>
          <div className="col-lg-12">
            <button type="submit" className="default-btn btn-style-fore">
              Add City
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

