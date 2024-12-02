import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { utilityFunctions } from "../../utils/module";
import { showSuccessToast, showErrorToast } from "../../utils/toasthelper";
import { Link } from "react-router-dom";
import BannerArea from "../commonpages/BannerArea";
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
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState([]);

  async function onSubmit(data) {
    try {
      const url = Server_URL + "user-registration";
      const response = await axios.post(url, data);
      // console.log(response.data);
      const { error, message } = response.data;
      if (error) {
        showErrorToast(message);
      } else {
        reset();
        showSuccessToast(message);
        navigate("/user-login")
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  async function readState() {
    try {
      const url = Server_URL + "provider/state";
      const response = await axios.get(url);
      // console.log(response.data);
  
      const { error, message } = response.data;
      if (error) {
        showErrorToast(message);
      } else {
        const { result } = response.data;
        // console.log(result)
        setState(result);
      }
    } catch (error) {
      showErrorToast(error.message)
    }
   
  }

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
    const selectedCity = city.find((city) => city._id === cityId);
    if (selectedCity) {
      setPincode(selectedCity.pincode);
      setValue("pincode", selectedCity.pincode); // Set pincode in form
    }
  }

  useEffect(() => {
    setFocus("FullName");
    readState();
  }, []);

  return (
    <>
      {/* <BannerArea data="User Register"/> */}

      <div className="my-account-area pt-100 pb-70">
      <div className="container">
        <div className="login-form">
        <form className="my-account-content" onSubmit={handleSubmit(onSubmit)}>
  <div className="section-title">
    <h2>Register</h2>
    <span className="top-title">Get Started With Us</span>
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
          {...register("fullName", {
            required: "Full Name is required",
            minLength: {
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
            // Remove leading and trailing spaces
            e.target.value = e.target.value.trim();
            setValue("fullName", e.target.value); // Update value with modified input
          }}
        />
      </div>
    </div>

    {/* Email */}
    <div className="col-lg-12">
      <div className="form-group">
        {errors.email && (
          <p className="text-danger">{errors.email.message}</p>
        )}
        <input
          type="email"
          className="form-control"
          placeholder="Enter Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@gmail\.com$/,
              message: "Email must be a valid Gmail address (e.g., user@gmail.com)",
            },
            validate: {
              noLeadingOrTrailingSpaces: (value) =>
                value.trim() === value || "No leading or trailing spaces allowed",
            },
          })}
          onBlur={(e) => {
            // Remove leading and trailing spaces
            e.target.value = e.target.value.trim();
            setValue("email", e.target.value); // Update value with modified input
          }}
        />
      </div>
    </div>

    {/* Password */}
    <div className="col-lg-12">
  <div className="form-group">
    {errors.password && (
      <p className="text-danger">{errors.password.message}</p>
    )}
    <input
      type="password"
      className="form-control"
      placeholder="Enter Password"
      {...register("password", {
        required: "Password is required",
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters",
        },
        validate: {
          noSpacesAllowed: (value) =>
            !/\s/.test(value) || "Password must not contain spaces",
        },
      })}
      onBlur={(e) => {
        // Trim spaces and update the value
        const trimmedValue = e.target.value.trim();
        setValue("password", trimmedValue);
      }}
    />
  </div>
</div>


    {/* State */}
    <div className="col-lg-12">
      <div className="form-group">
        {errors.stateId && (
          <p className="text-danger">{errors.stateId.message}</p>
        )}
        <select
          {...register("stateId", { required: "State is required" })}
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

    {/* City */}
    <div className="col-lg-12">
      <div className="form-group">
        {errors.cityId && (
          <p className="text-danger">{errors.cityId.message}</p>
        )}
        <select
          className="form-control"
          {...register("cityId", { required: "City is required" })}
          onChange={handleCityChange}
        >
          <option value="">Please Select City</option>
          {city.map((x) => (
            <option key={x._id} value={x._id}>
              {x.cityName}
            </option>
          ))}
        </select>
      </div>
    </div>

    {/* Pincode */}
    <div className="col-lg-12">
      <div className="form-group">
        {errors.pincode && (
          <p className="text-danger">{errors.pincode.message}</p>
        )}
        <input
          {...register("pincode", {
            required: "Pincode is required",
          })}
          className="form-control"
          type="text"
          placeholder="Pincode"
          value={pincode}
          readOnly
        />
      </div>
    </div>

    {/* Mobile Number */}
    <div className="col-lg-12">
      <div className="form-group">
        {errors.mobile && (
          <p className="text-danger">{errors.mobile.message}</p>
        )}
        <input
          type="tel"
          className="form-control"
          placeholder="Enter Mobile Number"
          {...register("mobile", {
            required: "Mobile number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Invalid mobile number",
            },
            validate: {
              noLeadingOrTrailingSpaces: (value) =>
                value.trim() === value || "No leading or trailing spaces allowed",
            },
          })}
          onBlur={(e) => {
            // Remove leading and trailing spaces
            e.target.value = e.target.value.trim();
            setValue("mobile", e.target.value); // Update value with modified input
          }}
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
    Already Have an Account? <Link to="/user-login">Login</Link>
  </p>
</form>

        </div>
      </div>
    </div>
    </>
  );
}
