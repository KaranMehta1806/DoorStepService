import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { utilityFunctions } from "../../../utils/module";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from '../../../utils/toasthelper';
import { Server_URL } from "../../../utils/config";
import BannerArea from "../../commonpages/AdminBannerArea";
// import "../../../assets/css/state.css"



export default function viewState() {
  const navigate = useNavigate();

  const [state,setState] = useState([]);


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



  // const navigate = useNavigate();

//   async function onSubmit(data) {
//     try {
//       const url = Server_URL + "state-registration";
//       const response = await axios.post(url, data);
//       // console.log(response.data);
//       const { error, message } = response.data;
//       if (error) {
//         alert(message);
//       } else {
//         reset();
//         alert(message);
//         getstateData()
//         // navigate('/user/signin');
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   }

  async function deletestate(id) {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken')
      const url = Server_URL + "admin-deletestate/" + id;
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
        getstateData();
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }
  async function editState(id) {
    // console.log(id);
    navigate("/admin/editstate",{state:{id}})
  }


  useEffect(() => {
    // setFocus('FullName')
    getstateData();

  }, []);

  return (
    <>
<BannerArea data="View State"/>
    
      <div className="state-card-container mb-4">
  <div className="card shadow-sm border-0 rounded-lg">
    {/* Card Header */}
    <div className="card-header bg-dark text-center">
      <h5 className="mb-0 text-white ">State Management</h5>
    </div>

    {/* Card Body */}
    <div className="card-body p-3">
      <div className="table-responsive">
        <table className="table align-middle table-hover">
          {/* Table Head */}
          <thead className="table-dark">
            <tr>
              <th className="text-center">State Name</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {state.map((value, index) => (
              <tr key={index}>
                <td className="text-center fw-semibold">{value.stateName}</td>
                <td className="text-center">
                  <div className="btn-group action-buttons">
                    <button
                      type="button"
                      onClick={() => deletestate(value._id)}
                      className="btn btn-outline-danger btn-sm mx-1"
                    >
                      <i className="bi bi-trash"></i> Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => editState(value._id)}
                      className="btn btn-outline-primary btn-sm mx-1"
                    >
                      <i className="bi bi-pencil"></i> Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Card Footer */}
    <div className="card-footer text-muted text-center">
      <small>Total States: <span className="fw-bold">{state.length}</span></small>
    </div>
  </div>
</div>



      
      <hr/>
    </>
  );
}


