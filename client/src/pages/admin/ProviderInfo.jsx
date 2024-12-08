

import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { utilityFunctions } from "../../utils/module";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from '../../utils/toasthelper';
import "../../assets/css/providerInfo.css"

// import { FaTrash } from "react-icons/fa";
// import { CiEdit } from "react-icons/ci";
// import Modal from "react-bootstrap/Modal";
// import EditForm from "./users/EditForm";
// import { userContext } from "../App";
// import { useNavigate } from "react-router-dom";
import { Server_URL } from "../../utils/config";


export default function providerInfo() {
  const navigate = useNavigate();

  const [provider,setprovider] = useState([]);
  const [loading,setLoading] = useState(false);

  async function setStatus(id,status) {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken')
      setLoading(true);
      console.log(status);
      const newStatus = status === "active" ? "inactive" : "active"
      console.log(newStatus);
      const url = Server_URL + "provider-status/" + id;
      const response = await axios.put(url,{status:newStatus}
        ,{
          headers:{
              Authorization:token ? `Bearer ${token}` : ""
          }
      }
      )       
      const { error, message } = response.data;
      // console.log(response.data);   
      if (error && message === "SignIn") {
        navigate("/admin-login")
      }
      else if(error) {
        showErrorToast(message);
      } else {
        showSuccessToast(message);   
        setprovider((prev) => 
          prev.map((x) => 
            x._id === id ? {...x ,status: newStatus} : x          
          )
        ) 
        getproviderData()    
      }  
    } catch (error) {
      showErrorToast(error.message);
    }    finally {
      setLoading(false);
    }
  }


  async function getproviderData() {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken')
      const url = Server_URL + "admin/providerinfo";
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
          setprovider(result);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  

  async function deleteprovider(id) {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken')
      const url = Server_URL + "admin/providerinfo/" + id;
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
        getproviderData();
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }


  useEffect(() => {
    // setFocus('FullName')
    getproviderData();

  }, []);

  return (
    <>
      <div className="container py-4">
  <div className="row g-4">
    {provider.map((value, index) => (
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
              <p className="mb-2"><strong>SubCategory:</strong> {value.subCategoryInfo}</p>
              <p className="mb-2"><strong>State:</strong> {value.stateInfo}</p>
              <p className="mb-2"><strong>City:</strong> {value.cityInfo}</p>
              <p className="mb-2"><strong>Start Time:</strong> {value.startTime}</p>
              <p className="mb-2"><strong>End Time:</strong> {value.endTime}</p>
              <p className="mb-2"><strong>Price:</strong> ₹{value.price}</p>
              <p className="mb-3"><strong>Address:</strong> {value.address}</p>
            </div>
            <div className="d-flex justify-content-center gap-3">
              <button
                type="button"
                onClick={() => setStatus(value._id, value.status)}
                className={`btn btn-sm ${
                  value.status === "inactive" ? "btn-success" : "btn-warning"
                }`}
                disabled={loading}
              >
                {loading
                  ? "Updating..."
                  : value.status === "inactive"
                  ? "Activate"
                  : "Deactivate"}
              </button>
              {/* <button
                type="button"
                onClick={() => deleteprovider(value._id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button> */}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


      <hr/>
    </>
  );
}


