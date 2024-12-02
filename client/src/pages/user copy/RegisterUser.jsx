import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { utilityFunctions } from "../../utils/module";
import { showSuccessToast, showErrorToast } from '../../utils/toasthelper';
import { Link } from "react-router-dom";
import BannerArea from "../commonpages/BannerArea";

// import { FaTrash } from "react-icons/fa";
// import { CiEdit } from "react-icons/ci";
// import Modal from "react-bootstrap/Modal";
// import EditForm from "./users/EditForm";
// import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
import { Server_URL } from "../../utils/config";


export default function registerUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setFocus,
  } = useForm();
  const navigate = useNavigate();
  const [city, setCity] = useState([]);
  const [pincode , setPincode] = useState([])
  const [state, setState] = useState([]);

  async function onSubmit(data) {
    try {
      const url = Server_URL + "user-registration";
      const response = await axios.post(url, data);
      // console.log(response.data);
      const { error, message } = response.data;
     if(error){
        showErrorToast(message);
      } else {
        reset();
        showSuccessToast(message);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  async function readState() {
    const url = Server_URL + "provider/state";
    const response = await axios.get(url);
    // console.log(response.data);

    const { error, message } = response.data;
    if (error) {
      alert(message);
    } else {
      const { result } = response.data;
      // console.log(result)
      setState(result);
    }
  }

  // useEffect(() => {
  //   readState();
  // }, []);

  async function readCity(catId) {
    const url = Server_URL + "provider/city/" + catId;
    const response = await axios.get(url);
    // console.log(response.data);

    const { error, message } = response.data;
    if (error) {
      alert(message);
    } else {
      const { result } = response.data;
      console.log(result);
      setCity(result);
    }
  }
  function handleCityChange(e) {
    const cityId = e.target.value;
    console.log(cityId);
    const selectedCity = city.find(city => city._id === cityId);
    if (selectedCity) {
      setPincode(selectedCity.pincode);
      setValue("pincode", selectedCity.pincode); // Set pincode in form
    }
  }


  useEffect(() => {
    setFocus('FullName')
    readState();

  }, []);

  return (
    <>
    <BannerArea data="User Register"/>


<div className="my-account-area pt-100 pb-70">
            <div className="container">
                <div className="login-form">
                    <form className="my-account-content" onSubmit={handleSubmit(onSubmit)}>
                        <div className="section-title">
                            <h2>Register</h2>
                            <span className="top-title">Get Start With Us</span>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                            <div className="form-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Full Name"
                    {...register("fullName", { required: true })}
                  />
                  {errors.fullName && (
                    <p className="text-danger">This field is required</p>
                  )}
                            </div>
                                
                            </div>
                            <div className="col-lg-12">
                            <div className="form-group">
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Enter Email"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <p className="text-danger">This field is required</p>
                  )}
                </div>








                            </div>
                            <div className="col-lg-12">
                            <div className="form-group">
                  <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Enter Password"
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <p className="text-danger">This field is required</p>
                  )}
                            </div>
                                
                            </div>
                            
                            <div className="col-lg-12">
                  <div className="form-group">
                  <select
                    {...register("stateId", { required: true })}
                      onChange={(e) => readCity(e.target.value)}
                      className="form-control"
                      
                    >
                      <option value="">Please Select State</option>
                      {state.map((x) => (
                        <option key={x._id} value={x._id}>
                          {x.stateName}
                        </option>
                      ))}
                    </select>
                    {errors.stateId && (
                      <p className="text-danger">This field is required</p>
                    )}
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                  {city && (
                      <>
                        <select className="form-control" {...register("cityId", { required: true })}
                        onChange={handleCityChange}
                        >
                          <option value="">Please Select City</option>
                          {city.map((x) => (
                            <option key={x._id} value={x._id}>
                              {x.cityName}
                            </option>
                          ))}
                        </select>
                      </>
                      )}
                    {errors.cityId && (
                      <p className="text-danger">This field is required</p>
                    )}
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <input
                      {...register("pincode", { required: "Pincode is required" })}
                      className="form-control"
                      type="text"
                      placeholder="Pincode"
                      value={pincode}
                      readOnly
                    />
                    {errors.pincode && <p className="text-danger">{errors.pincode.message}</p>}
                  </div>
                  </div>






                            <div className="col-lg-12">
                            <div className="form-group">
                  <input 
                    type="tel" 
                    className="form-control" 
                    placeholder="Enter Mobile Number"
                    {...register("mobile", { required: true })}
                  />
                  {errors.mobile && (
                    <p className="text-danger">This field is required</p>
                  )}
                            </div>
                                
                            </div>
                            <div className="col-lg-12">
                            <div className="form-group">
                  <textarea 
                    className="form-control" 
                    placeholder="Enter  Address"
                    {...register('address', { required: true })}
                  />
                  {errors.address && (
                    <p className="text-danger">This field is required</p>
                  )}
                            </div>
                                
                            </div>
                            {/* <div className="col-lg-6 col-sm-6 col-md-6">
                                
                            </div> */}
                            
                            <div className="col-lg-12">
                                <button type="submit" className="default-btn btn-style-fore">Register</button>
                            </div>
                        </div>
                        {/* <div className="border-or">
                            <span>Or Login With</span>
                        </div>
                        <div className="my-account-list">
                            <ul>
                                <li>
                                    <a href="https://www.facebook.com/" target="_blank"> 
                                        <i className='bx bxl-facebook'></i>
                                    </a>
                                </li>   
                                <li>
                                    <a href="https://twitter.com/" target="_blank">
                                        <i className='bx bxl-twitter' ></i>
                                    </a>
                                </li>    
                                <li>
                                    <a href="https://www.linkedin.com/" target="_blank">
                                        <i className='bx bxl-linkedin' ></i>
                                    </a>  
                                </li> 
                                <li>
                                    <a href="https://www.google.com/" target="_blank">
                                        <i className='bx bxl-google' ></i>
                                    </a>  
                                </li> 
                            </ul>
                        </div> */}
                        <p>Already Have an Account? <Link to="/user-login" >Login</Link></p>
                    </form>
                </div>
            </div>
        </div>      
    </>
  );
}

