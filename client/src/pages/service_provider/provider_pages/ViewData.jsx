

import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { utilityFunctions } from "../../../utils/module";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from '../../../utils/toasthelper';
import "../../../assets/css/providerdata.css"

// import { FaTrash } from "react-icons/fa";
// import { CiEdit } from "react-icons/ci";
// import Modal from "react-bootstrap/Modal";
// import EditForm from "./users/EditForm";
// import { userContext } from "../App";
// import { useNavigate } from "react-router-dom";
import { Server_URL } from "../../../utils/config";


export default function viewData() {
  const navigate = useNavigate();

  const [provider,setprovider] = useState([]);


  async function getproviderData() {
    try {
      const token = utilityFunctions.getCookieValue('serviceProviderToken')
      const url = Server_URL + "serviceprovider/info";
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
        navigate("/serviceprovider/login")
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
      const token = utilityFunctions.getCookieValue('serviceProviderToken')
      const url = Server_URL + "serviceprovider/info/" + id;
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

  async function editProvider(id) {
    // console.log(id);
    navigate("/providerpages/editprovider",{state:{id}})
  }


  useEffect(() => {
    // setFocus('FullName')
    getproviderData();

  }, []);

  return (
    <>
    <div className="container my-4">
  <div className="card shadow-sm border-0 rounded">
    <div className="card-header   text-center py-3">
      <h4 className="mb-0 text-white">Personal Details</h4>
    </div>
    <div className="card-body p-3">
      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-secondary">
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Category</th>
              <th>Sub Category</th>
              <th>State</th>
              <th>City</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Status</th>
              <th>Price</th>
              <th>Address</th>
              {/* <th>Delete</th> */}
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {provider.map((value, index) => (
              <tr key={index}>
                <td>{value.fullName}</td>
                <td>{value.email}</td>
                <td>{value.mobile}</td>
                <td>{value.categoryInfo}</td>
                <td>{value.subCategoryInfo}</td>
                <td>{value.stateInfo}</td>
                <td>{value.cityInfo}</td>
                <td>{value.startTime}</td>
                <td>{value.endTime}</td>
                <td>
                  <span
                    className={`badge ${
                      value.status === "Active"
                        ? "bg-success"
                        : "bg-secondary"
                    }`}
                  >
                    {value.status}
                  </span>
                </td>
                <td>₹{value.price}</td>
                <td>{value.address}</td>
                {/* <td>
                  <button
                    type="button"
                    onClick={() => deleteprovider(value._id)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td> */}
                <td>
                  <button
                    type="button"
                    onClick={() => editProvider(value._id)}
                    className="btn btn-primary btn-sm"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>


      <hr/>
    </>
  );
}


