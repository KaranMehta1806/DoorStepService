import React, { useEffect, useState } from "react";
import { utilityFunctions } from "../../../utils/module";
import { Server_URL } from "../../../utils/config";
import axios from "axios";
// import "../../../assets/css/adminDashboard.css"



export default function ServiceProviders() {
  const [provider,setProvider] = useState([]);



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
            // console.log(result)
            // const totalRecords = result.length;
            setProvider(result);
          }
        } catch (error) {
          console.log(error.message);
        }
      }
//   const providers = [
//     { name: "John Doe", contact: "john@example.com", status: "Active" },
//     { name: "Jane Smith", contact: "jane@example.com", status: "Inactive" },
//   ];

useEffect(()=>{
    getproviderData()
},[])

  return (
    <div className="management-section">
      <h2>Service Providers</h2>
      {/* <button className="add-button">Add New Provider</button> */}
      <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>SubCategory</th>
            <th>Start Time:</th>
            <th>End Time:</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {provider.map((provider, index) => (
            <tr key={index}>
              <td>{provider.fullName}</td>
              <td>{provider.email}</td>
              <td>{provider.subCategoryInfo}</td>
              <td>{provider.startTime}</td>
              <td>{provider.endTime}</td>
              <td>{provider.price}</td>
              <td>{provider.status}</td>
              {/* <td>
                <button>Edit</button>
                <button>Delete</button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      
    </div>
  );
};


{/* <p className="mb-2"><strong>Email:</strong> {value.email}</p>
<p className="mb-2"><strong>Mobile:</strong> {value.mobile}</p>
<p className="mb-2"><strong>SubCategory:</strong> {value.subCategoryInfo}</p>
<p className="mb-2"><strong>State:</strong> {value.stateInfo}</p>
<p className="mb-2"><strong>City:</strong> {value.cityInfo}</p>
<p className="mb-2"><strong>Start Time:</strong> {value.startTime}</p>
<p className="mb-2"><strong>End Time:</strong> {value.endTime}</p>
<p className="mb-2"><strong>Price:</strong> ₹{value.price}</p>
<p className="mb-3"><strong>Address:</strong> {value.address}</p> */}
