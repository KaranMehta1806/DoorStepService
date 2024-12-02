import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { utilityFunctions } from "../../utils/module";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from '../../utils/toasthelper';
// import { FaTrash } from "react-icons/fa";
// import { CiEdit } from "react-icons/ci";
// import Modal from "react-bootstrap/Modal";
// import EditForm from "./users/EditForm";
// import { userContext } from "../App";
// import { useNavigate } from "react-router-dom";
import { Server_URL } from "../../utils/config";
import "../../assets/css/viewadmin.css"


export default function viewAdmin() {
  const navigate = useNavigate();

  const [admin,setAdmin] = useState([]);


  async function getAdminData() {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken')
      const url = Server_URL + "admin-registration";
      const response = await axios.get(url,{
        headers:{
            Authorization:token ? `Bearer ${token}` : ""
        }
    });
      // console.log(response.data);
      const { error, message } = response.data;
      // console.log(error,message);
      if (error && message === "SignIn") {
        navigate("/admin-login")
      }
      else if(error) {
        showErrorToast(message);
      } else {
        const { result } = response.data;
          setAdmin(result);
          // alert("Data Fetched Successfully")
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }



  // const navigate = useNavigate();

//   async function onSubmit(data) {
//     try {
//       const url = Server_URL + "admin-registration";
//       const response = await axios.post(url, data);
//       // console.log(response.data);
//       const { error, message } = response.data;
//       if (error) {
//         alert(message);
//       } else {
//         reset();
//         alert(message);
//         getAdminData()
//         // navigate('/user/signin');
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   }

  async function deleteAdmin(id) {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken')
      const url = Server_URL + "admin-registration/" + id;
      const res = await axios.delete(url,{
        headers:{
            Authorization:token ? `Bearer ${token}` : ""
        }
    });
      // console.log(res.data)
      const { error, message } = res.data;
      if (error && message === "SignIn") {
        showErrorToast(message);
      }
      else if (error) {
        // alert("hlooo");
        showErrorToast(message);
      } else {
        showSuccessToast(message);
        getAdminData();
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }


  useEffect(() => {
    // setFocus('FullName')
    getAdminData();

  }, []);

  return (
    <>
      <div className="card shadow-sm border-0 rounded-lg mb-4">
  {/* Card Header */}
  <div className="card-header   text-center">
    <h5 className="mb-0 ">Admin Management</h5>
  </div>

  {/* Card Body */}
  <div className="card-body p-3">
    <div className="table-responsive">
      <table className="table table-striped table-bordered table-hover">
        {/* Table Head */}
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Category</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {admin.map((value, index) => (
            <tr key={index}>
              <td>{value.fullName}</td>
              <td>{value.email}</td>
              <td>{value.mobile}</td>
              <td>{value.userRole}</td>
              <td>{value.address}</td>
              <td>
                <button
                  type="button"
                  onClick={() => deleteAdmin(value._id)}
                  className="btn btn-outline-danger btn-sm"
                >
                  <i className="bi bi-trash"></i> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  {/* Card Footer */}
  <div className="card-footer text-muted text-center">
    <small>Total Admins: {admin.length}</small>
  </div>
</div>

      <hr/>
    </>
  );
}


