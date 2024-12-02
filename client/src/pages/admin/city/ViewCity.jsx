import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { utilityFunctions } from "../../../utils/module";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from '../../../utils/toasthelper';
import { Server_URL } from "../../../utils/config";
import "../../../assets/css/location.css"
import BannerArea from "../../commonpages/AdminBannerArea";


export default function viewCity() {
  const navigate = useNavigate();

  const [city,setCity] = useState([]);


  async function getCityData() {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken')
      const url = Server_URL + "admin-readcity";
      const response = await axios.get(url,{
        headers:{
            Authorization:token ? `Bearer ${token}` : ""
        }
    });
      // console.log(response.data);
      const { error, message } = response.data;
      // console.log(error,message);
      if (error && message === "SignIn") {
        navigate("/city-login")
      }
      else if(error) {
        showErrorToast(message);
      } else {
        const { result } = response.data;
          setCity(result);
          // alert("Data Fetched Successfully")
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }



  // const navigate = useNavigate();

//   async function onSubmit(data) {
//     try {
//       const url = Server_URL + "city-registration";
//       const response = await axios.post(url, data);
//       // console.log(response.data);
//       const { error, message } = response.data;
//       if (error) {
//         alert(message);
//       } else {
//         reset();
//         alert(message);
//         getCityData()
//         // navigate('/user/signin');
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   }

  async function deletecity(id) {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken')
      const url = Server_URL + "admin-deletecity/" + id;
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
        getCityData();
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  async function editCity(id) {
    // console.log(id);
    navigate("/admin/editcity",{state:{id}})
  }


  useEffect(() => {
    getCityData();

  }, []);

  return (
    <>
<BannerArea data="View City"/>

    <div className="city-card-container mb-4">
  <div className="card shadow-sm border-0 rounded-lg">
    <div className="card-header bg-dark  text-center">
      <h5 className="mb-0 text-white">City Management</h5>
    </div>
    <div className="card-body p-0">
      <div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>State Name</th>
              <th>City Name</th>
              <th>Pincode</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {city.map((value, index) => (
              <tr key={index}>
                <td>{value.stateInfo}</td>
                <td>{value.cityName}</td>
                <td>{value.pincode}</td>
                <td>
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => deletecity(value._id)}
                    >
                      <i className="bi bi-trash"></i> Delete
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => editCity(value._id)}
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
    <div className="card-footer text-muted text-center">
      <small>Total Records: {city.length}</small>
    </div>
  </div>
</div>




      <hr/>
    </>
  );
}


