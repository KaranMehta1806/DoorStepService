import { useForm } from "react-hook-form";
import { Server_URL } from "../../utils/config";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../../utils/toasthelper";
import { Link, useNavigate } from "react-router-dom";


export default function ContactUs(){

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        setFocus,
      } = useForm();

  const navigate = useNavigate();


      async function onSubmit(data) {
        try {
          const url = Server_URL + "contact";
          const response = await axios.post(url, data);
          // console.log(response.data);
          const { error, message } = response.data;
          if (error) {
            showErrorToast(message);
          } else {
            reset();
            showSuccessToast(message);
          }
        } catch (error) {
          showErrorToast(error.message);
        }
      }



    return(
        <>
        <div className="contact-area pt-100 pb-100">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5" datacue="slideInRight" dataduration="1500">
                        <div className="single-contact-card">
                            <div className="contact-box">
                                <i className="flaticon-pin"></i>
                                <h3>Office Address</h3>
                                <p>28 Benin, South of Niger #, San Francisco, USA</p>
                            </div>
                            <div className="contact-box">
                                <i className="flaticon-phone-call"></i>
                                <h3>Get in Touch</h3>
                                <span>Telephone:<Link to="/contactus">+1(800)123-4566</Link></span>
                                <span className="mail">Email:<Link to="/contactus"><span className="__cf_email__" >homeassist@gmail.com</span></Link></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7" datacue="slideInRight" dataduration="1500">
                        <div className="contact-form-content">
                            <div className="section-title section-title-left">
                                <span className="top-title">Contact Us</span>
                                <h2>Request A Quote</h2>
                            </div>
                            <form id="contactForm" onSubmit={handleSubmit(onSubmit)}> 
                                <div className="row">
                                    <div className="col-lg-12 col-md-6">
                                        <div className="form-group">
        {errors.fullName && <p className="text-danger">{errors.fullName.message}</p>}

                                            <input type="text" className="form-control" placeholder="Name" {...register("fullName", {
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
            e.target.value = e.target.value.trim();
            setValue("fullName", e.target.value); 
          }} />
                                            {/* <div className="help-block with-errors"></div>  */}
                                        </div>
                                    </div>
        
                                    <div className="col-lg-6 col-md-6">  
                                        <div className="form-group">
                                        {errors.email && (
          <p className="text-danger">{errors.email.message}</p>
        )}
                                            <input type="email" placeholder="Email"  className="form-control" 
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
                                                e.target.value = e.target.value.trim();
                                                setValue("email", e.target.value); 
                                              }}
                                            />
                                        </div>
                                    </div> 
                    
                                    <div className="col-lg-6 col-md-12">
                                        <div className="form-group">
                                        {errors.mobile && (
          <p className="text-danger">{errors.mobile.message}</p>
        )}
                                            <input type="number" className="form-control" placeholder="Phone"
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
                                                e.target.value = e.target.value.trim();
                                                setValue("mobile", e.target.value); 
                                              }}
                                            
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group"> 
                                        {errors.message && (
      <p className="text-danger">{errors.message.message}</p>
    )}
                                            <textarea className="form-control" cols="5" rows="7" placeholder="Message" 
                                             {...register("message", {
                                                required: "Message is required",
                                                minLength: {
                                                  value: 10,
                                                  message: "Message must be at least 10 characters long",
                                                },
                                                validate: {
                                                  noLeadingOrTrailingSpaces: (value) =>
                                                    value.trim() === value || "No leading or trailing spaces allowed",
                                                },
                                              })}
                                              onBlur={(e) => {
                                                e.target.value = e.target.value.trim();
                                                setValue("message", e.target.value); 
                                              }}                                                                                                                                    
                                            ></textarea>
                                        </div>
                                    </div>

                                    {/* <div className="col-lg-12">
                                        <div className="form-group">
                                            <div className="form-check">
                                                <input
                                                    name="gridCheck"
                                                    value="I agree to the terms and privacy policy."
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id="gridCheck"
                                                    required
                                                />
                                                <label className="form-check-label" htmlFor="gridCheck">
                                                    I Agree To The <a href="terms-conditions.html">Terms & Conditions</a> And <a href="privacy-policy.html">Privacy Policy</a>
                                                </label> 
                                                <div className="help-block with-errors gridCheck-error"></div>
                                            </div>
                                        </div>
                                    </div> */}

                                    <div className="col-lg-12 col-md-12">
                                        <button type="submit" className="default-btn">    
                                            Send Message
                                        </button>
                                        <div id="msgSubmit" className="h3 text-center hidden"></div>
                                        <div className="clearfix"></div>
                                    </div>

                                </div> 
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
        <div className="google-map-area">
            <div className="container-fluid">
                <div className="map">
                    <iframe className="maps" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4084411.0093602007!2d30.058401399112643!3d1.3671055328826824!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1771a69f6499f945%3A0x874155ce43014549!2sUganda!5e0!3m2!1sen!2sbd!4v1661595038526!5m2!1sen!2sbd"></iframe>
                </div>
            </div>
        </div>



        
        </>
    )
}


{/* <div className="my-account-area pt-100 pb-70">
      <div className="container">
        <div className="login-form">
        <form className="my-account-content" onSubmit={handleSubmit(onSubmit)}>
  <div className="section-title">
    <h2>Register</h2>
    <span className="top-title">Get Started With Us</span>
  </div>
  <div className="row">
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
            e.target.value = e.target.value.trim();
            setValue("fullName", e.target.value); 
          }}
        />
      </div>
    </div>
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
            e.target.value = e.target.value.trim();
            setValue("email", e.target.value); 
          }}
        />
      </div>
    </div>

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
        const trimmedValue = e.target.value.trim();
        setValue("password", trimmedValue);
      }}
    />
  </div>
</div>


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
            e.target.value = e.target.value.trim();
            setValue("mobile", e.target.value); 
          }}
        />
      </div>
    </div>

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
        e.target.value = e.target.value.trim();
        setValue("address", e.target.value); 
      }}
    />
  </div>
</div>


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
    </div> */}