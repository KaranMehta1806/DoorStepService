import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { utilityFunctions } from "../../utils/module";
import { showSuccessToast, showErrorToast } from '../../utils/toasthelper';
import { Link } from "react-router-dom";
import { Server_URL } from "../../utils/config";
import BannerArea from "../commonpages/BannerArea";

export default function signup() {
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [city, setCity] = useState([]);
  const [state, setState] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
    setValue,
    watch
  } = useForm();

  useEffect(() => {
    ReadCategory();
    readState();
  }, []);


  async function readState() {
    const url = Server_URL + "provider/state";
    const response = await axios.get(url);

    const { error, message } = response.data;
    if (error) {
      alert(message);
    } else {
      const { result } = response.data;
      setState(result);
    }
  }

  async function readCity(catId) {
    const url = Server_URL + "provider/city/" + catId;
    const response = await axios.get(url);

    const { error, message } = response.data;
    if (error) {
      alert(message);
    } else {
      const { result } = response.data;
      console.log(result);
      setCity(result);
    }
  }




















  async function ReadCategory() {
    const url = Server_URL + "provider/managecategory";
    const response = await axios.get(url);

    const { error, message } = response.data;
    if (error) {
      alert(message);
    } else {
      const { result } = response.data;
      setCategory(result);
    }
  }

  

  async function ReadSubCategory(catId) {
    const url = Server_URL + "managesubcategory/" + catId;
    const response = await axios.get(url);

    const { error, message } = response.data;
    if (error) {
      alert(message);
    } else {
      const { result } = response.data;
      console.log(result);
      setSubCategory(result);
    }
  }



  async function registerServiceProvider(data) {
    try {
      const url = Server_URL + "serviceprovider";
      const response = await axios.post(url, data
  );
      const { error, message } = response.data;
      if(error){
        showErrorToast(message);
      } else {
        showSuccessToast(message);
        reset();
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }


  
  return (
    <>
<BannerArea data="Service Provider Register" route =""/>
<div className="my-account-area pt-100 pb-70">
  <div className="container">
    <div className="login-form">
      <form
        className="my-account-content"
        onSubmit={handleSubmit(registerServiceProvider)}
      >
        <div className="section-title">
          <h2>Register</h2>
          <span className="top-title">Get Start With Us</span>
        </div>
        <div className="row">
          {/* Full Name */}
          <div className="col-lg-12">
  <div className="form-group">
  {errors.fullName && <p className="text-danger">{errors.fullName.message}</p>}

    <input
      type="text"
      className="form-control"
      placeholder="Full Name"
      {...register("fullName", {  required: "Full Name is required", minLength: {
        value: 3,
        message: "Full Name must be at least 3 characters",
      },
      validate: {
        noLeadingOrTrailingSpaces: (value) =>
          value.trim() === value || "No leading or trailing spaces allowed",
        noSpecialChars: (value) =>
          /^[a-zA-Z\s]+$/.test(value) || "Full Name can only contain letters and spaces",
      },
    })}
    onBlur={(e) => {
      e.target.value = e.target.value.trim();
      setValue("fullName", e.target.value); 
    }}
    />
  </div>
</div>



          {/* Email */}
          <div className="col-lg-12">
            <div className="form-group">
            {errors.email && (
                <p className="text-danger">
                  {errors.email.type === "pattern" ? "Email must be a valid Gmail address" : "This field is required"}
                </p>
              )}
            <input
  type="email"
  className="form-control"
  placeholder="Enter Email"
  {...register("email", {
    required: true,
    pattern: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
  })}
  onBlur={(e) => (e.target.value = e.target.value.trim())}
/>

              
            </div>
          </div>

          {/* Password */}
          <div className="col-lg-12">
            <div className="form-group">
            {errors.password && (
  <p className="text-danger">
    {errors.password.type === "minLength"
      ? "Password must be at least 6 characters"
      : errors.password.message || "This field is required"}
  </p>
)}
            <input
  type="password"
  className="form-control"
  placeholder="Enter Password"
  {...register("password", {
    required: true,
    minLength: 6,
    validate: (value) =>
      !/\s/.test(value) || "Password should not contain spaces",
  })}
  onBlur={(e) => (e.target.value = e.target.value.trim())}
/>


             
            </div>
          </div>

          {/* Mobile */}
          <div className="col-lg-12">
            <div className="form-group">
            {errors.mobile && (
                <p className="text-danger">
                  {errors.mobile.type === "pattern" ? "Mobile number must be 10 digits" : "This field is required"}
                </p>
              )}
            <input
  type="tel"
  className="form-control"
  placeholder="Enter Mobile Number"
  {...register("mobile", {
    required: true,
    pattern: /^[0-9]{10}$/,
  })}
  onBlur={(e) => (e.target.value = e.target.value.trim())}
/>

              
            </div>
          </div>

          <div className="col-lg-12">
                  <div className="form-group">
                  {errors.stateId && (
                      <p className="text-danger">This field is required</p>
                    )}
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
                    
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                  {errors.cityId && (
                      <p className="text-danger">This field is required</p>
                    )}
                  {city && (
                      <>
                        <select className="form-control" {...register("cityId", { required: true })}>
                          <option value="">Please Select City</option>
                          {city.map((x) => (
                            <option key={x._id} value={x._id}>
                              {x.cityName}
                            </option>
                          ))}
                        </select>
                      </>
                      )}
                   
                  </div>
                </div>
                
                <div className="col-lg-12">
                  <div className="form-group">
                  {errors.categoryId && (
                      <p className="text-danger">This field is required</p>
                    )}
                  <select
                    {...register("categoryId", { required: true })}
                      onChange={(e) => ReadSubCategory(e.target.value)}
                      className="form-control"
                      
                    >
                      <option value="">Please Select Category</option>
                      {category.map((x) => (
                        <option key={x._id} value={x._id}>
                          {x.categoryName}
                        </option>
                      ))}
                    </select>
                    
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                  {errors.subCategoryId && (
                      <p className="text-danger">This field is required</p>
                    )}
                  {subCategory && (
                      <>
                        <select className="form-control" {...register("subCategoryId", { required: true })}>
                          <option value="">Please Select SubCategory</option>
                          {subCategory.map((x) => (
                            <option key={x._id} value={x._id}>
                              {x.subCategoryName}
                            </option>
                          ))}
                        </select>
                      </>
                    )}
                    
                  </div>
                </div>
          {/* Start Time */}
          <div className="col-lg-12">
            <div className="form-group">
            {errors.startTime && <p className="text-danger">This field is required</p>}

              <input
                type="time"
                step="1"
                className="form-control"
                placeholder="Select Start Time"
                {...register("startTime", { required: true })}
              />
            </div>
          </div>

          {/* End Time */}
          <div className="col-lg-12">
            <div className="form-group">
            {errors.endTime && (
                <p className="text-danger">
                  {errors.endTime.message || "This field is required"}
                </p>
              )}
              <input
                type="time"
                step="1"
                className="form-control"
                placeholder="Select End Time"
                {...register("endTime", {
                  required: true,
                  validate: (value) => value > watch("startTime") || "End time must be after start time",
                })}
              />
              
            </div>
          </div>

          {/* Price */}
          <div className="col-lg-12">
            <div className="form-group">
            {errors.price && (
                <p className="text-danger">
                  {errors.price.type === "min" ? "Price must be greater than 0" : "This field is required"}
                </p>
              )}
              <input
                type="number"
                className="form-control"
                placeholder="Enter Per Hour Price"
                {...register("price", { required: true, min: 1 })}
                onChange={(e) => e.target.value = e.target.value.trim()}
              />
              
            </div>
          </div>

          {/* Address */}
          <div className="col-lg-12">
  <div className="form-group">
  {errors.address && (
      <p className="text-danger">{errors.address.message}</p>
    )}
  <textarea
  className="form-control"
  placeholder="Enter Address"
  {...register("address", {
    required: "Address is required",
    minLength: {
      value: 10,
      message: "Address must be at least 10 characters long",
    },
    validate: {
      noLeadingOrTrailingSpaces: (value) =>
        value.trim() === value || "No leading or trailing spaces allowed",
    },
  })}
  onBlur={(e) => {
    // Remove leading and trailing spaces
    e.target.value = e.target.value.trim();
    setValue("address", e.target.value); // Update value with modified input
  }}
/>

    
  </div>
</div>


          {/* Submit Button */}
          <div className="col-lg-12">
            <button type="submit" className="default-btn btn-style-fore">
              Register
            </button>
          </div>
        </div>

        <p>
          Already Have an Account? <Link to="/serviceprovider/login">Login</Link>
        </p>
      </form>
    </div>
  </div>
</div>






























      
    </>
  );
}
