

import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { utilityFunctions } from "../../utils/module";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from '../../utils/toasthelper';
import "../../assets/css/userInfo.css"
import { Server_URL } from "../../utils/config";


export default function userInfo() {
  const navigate = useNavigate();

  const [user,setUser] = useState([]);


  async function getUserData() {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken')
      const url = Server_URL + "admin/userinfo";
      const response = await axios.get(url
        ,{
        headers:{
            Authorization:token ? `Bearer ${token}` : ""
        }
    }
);
      // console.log(response.data);
      const { error, message } = response.data;
      // console.log(error,message);
      if (error && message === "SignIn") {
        navigate("/admin-login")
      }
      else if(error) {
        alert(message);
      } else {
        const { result } = response.data;
          setUser(result);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  

  async function deleteuser(id) {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken')
      const url = Server_URL + "admin/userinfo/" + id;
      const res = await axios.delete(url
        ,{
        headers:{
            Authorization:token ? `Bearer ${token}` : ""
        }
    }
  );
      // console.log(res.data)
      const { error, message } = res.data;
      if (error && message === "SignIn") {
        navigate("/admin-login");
      }
      else if (error) {
        // alert("hlooo");
        showErrorToast(message);
      } else {
        showSuccessToast(message);
        getUserData();
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }


  useEffect(() => {
    getUserData();

  }, []);

  return (
    <>
      <div className="container py-4">
  <div className="row g-4">
    {user.map((value, index) => (
      <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
        <div className="card shadow-sm border-0 h-100">
          <div className="card-body text-center">
            <img
              src={value.photo ? value.photo : '/photo1.png'}
              alt="Provider"
              className="img-fluid rounded-circle mb-3"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <h5 className="card-title fw-bold">{value.fullName}</h5>
            <p className="text-muted small mb-3">{value.categoryInfo}</p>
            <div className="text-start">
              <p className="mb-2"><strong>Email:</strong> {value.email}</p>
              <p className="mb-2"><strong>Mobile:</strong> {value.mobile}</p>
              <p className="mb-3"><strong>Address:</strong> {value.address}</p>
            </div>
            
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
    </>
  );
}


