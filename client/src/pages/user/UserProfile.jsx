import style from "../../css_modules/profile.module.css";
import React from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Server_URL, Server_URL2 } from "../../utils/config";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../../utils/toasthelper";
import { utilityFunctions } from "../../utils/module";
import "../../assets/css/userprofile.css";

export default function UserProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    setFocus,
  } = useForm();

  const navigate = useNavigate();

  // const location = useLocation();
  // const id = location.state?.id;
  // console.log(id)

  const [userdata, setUserData] = useState(null);
  const [upload, setUpload] = useState(true);
  // const [city, setCity] = useState([]);
  // const [pincode, setPincode] = useState([]);
  // const [state, setState] = useState([]);

  // async function readState() {
  //   const url = Server_URL + "provider/state";
  //   const response = await axios.get(url);
  //   // console.log(response.data);

  //   const { error, message } = response.data;
  //   if (error) {
  //     alert(message);
  //   } else {
  //     const { result } = response.data;
  //     // console.log(result)
  //     setState(result);
  //   }
  // }

  // useEffect(() => {
  //   readState();
  // }, []);

  // async function readCity(catId) {
  //   const url = Server_URL + "provider/city/" + catId;
  //   const response = await axios.get(url);
  //   // console.log(response.data);

  //   const { error, message } = response.data;
  //   if (error) {
  //     alert(message);
  //   } else {
  //     const { result } = response.data;
  //     console.log(result);
  //     setCity(result);
  //   }
  // }
  // function handleCityChange(e) {
  //   const cityId = e.target.value;
  //   console.log(cityId);
  //   const selectedCity = city.find((city) => city._id === cityId);
  //   if (selectedCity) {
  //     setPincode(selectedCity.pincode);
  //     setValue("pincode", selectedCity.pincode); // Set pincode in form
  //   }
  // }

  async function handleShow() {
    setUpload(false);
  }

  async function getSingleuserdata() {
    try {
      const token = utilityFunctions.getCookieValue("userAuthToken");
      const url = Server_URL + "view-single-user";
      const response = await axios.get(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      const { error, message } = response.data;
      if (error && message === "SignIn") {
        navigate("/user-login");
      } else if (error) {
        showErrorToast(message);
      } else {
        const { result } = response.data;
        console.log(result);

        // console.log(result[0].photo);

        setUserData(result[0]);
        // console.log("Full photo URL:", Server_URL2 + result[0].photo);

        // console.log(userdata)
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  useEffect(() => {
    getSingleuserdata();
    // readState();
  }, []);

  async function onSubmit(data) {
    try {
      const formData = new FormData();
      formData.append("photo", data.photo[0]);
      const token = utilityFunctions.getCookieValue("userAuthToken");
      const url = Server_URL + "user-photo-update" ;
      const res = await axios.post(url, formData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      const { error, message } = res.data;
      if (error && message === "SignIn") {
        navigate("/user-login");
      } else if (error) {
        showErrorToast(message);
      } else {
        getSingleuserdata();
        reset();
        setUpload(true);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  async function updateData(data) {
    try {
      const token = utilityFunctions.getCookieValue("userAuthToken");
      const url = Server_URL + "updateuser";
      const response = await axios.put(url, data, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      const { error, message } = response.data;
      if (error && message === "SignIn") {
        navigate("/user-login");
      } else if (error) {
        showErrorToast(message);
      } else {
        showSuccessToast(message);
        // navigate("/userdatapages/info");
        // console.log(userdata)
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  const styles = {
    back:{
      display:"flex",
      marginBottom:"10px",
      backgroundColor:"#fe6930",
      color:"white",

    },
    container: {
      maxWidth: '600px',
      margin: '80px auto',
      padding: '30px',
      backgroundColor: '#fff',
      boxShadow: '0px 0px 15px rgba(0,0,0,0.1)',
      borderRadius: '10px',
      textAlign: 'center',
    },
    formGroup: {
      marginBottom: '20px',
      textAlign: 'left',
    },
    label: {
      display: 'block',
      fontSize: '14px',
      color: '#333',
      marginBottom: '8px',
    },
    

    input: {
      width: '100%',
      padding: '10px',
      fontSize: '14px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    textArea: {
      width: '100%',
      padding: '10px',
      fontSize: '14px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      resize: 'vertical',
    },
    button1: {
      width: '30%',
      padding: '10px',
      fontSize: '16px',
      color: '#fff',
      backgroundColor: '#fe6930', // Template button color
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    button: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      color: '#fff',
      backgroundColor: '#fe6930', // Template button color
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '20px',
    },
    profilePic: {
      width: '230px',
      height: '200px',
      objectFit: 'cover',
      marginBottom: '20px',
      border: '3px solid #fe6930', // Matching color scheme
    },
  };
  return (
    <>


      {upload?
      (<>
      {userdata && ( 
        <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 col-sm-12">
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body p-4">
                <div className="row">
                  {/* Photo Column */}

                  {/* User Info Column */}
                  <div className="col-md-8">
                    <h4 className="fw-bold mb-4">Profile Information</h4>
                    <form onSubmit={handleSubmit(updateData)}>
                      <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                          Username
                        </label>
                        <input
                    type="text"
                    className="form-control"
                    defaultValue={userdata.fullName}
                    {...register("fullName", { required: true })}
                    placeholder="Full Name"
                  />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          
                          defaultValue={userdata.email}
                          {...register("email", { required: true })}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="mobile" className="form-label">
                          Mobile
                        </label>
                        <input
                          type="text"
                          id="mobile"
                          className="form-control"
                          defaultValue={userdata.mobile}
                          {...register("mobile", { required: true })}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="address" className="form-label">
                          Address
                        </label>
                        <textarea
                          id="address"
                          className="form-control"
                          rows="3"
                          {...register("address", { required: true })}
                          defaultValue={userdata.address}
                        >
                        </textarea>
                      </div>
                      <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary">
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-4 text-center right">
                    <div
                      className="rounded-circle mx-auto mb-4"
                      style={{
                        width: "150px",
                        height: "150px",
                        cursor: "pointer",
                        overflow: "hidden",
                        border: "2px solid #eaeaea",
                      }}
                      onClick={handleShow}
                    >
                      <img

                        src={userdata.photo ? userdata.photo : '/photo1.png'}
                        alt="Profile"
                        className="img-fluid w-100 h-100 object-fit-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>)}
      </>)
      
      
       : 
       (<>
          <form onSubmit={handleSubmit(onSubmit)}>
            
    <div style={styles.container}>
      <button style={styles.back}>back</button>
      <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="photo">photo</label>
              <input type="file" {...register('photo')} className="form-control" style={styles.input}/>
              </div>
              <button style={styles.button} >Upload</button>
            </div>
            
  </form>
        </>)
        }
      
    </>
  );
}
