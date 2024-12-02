import React, { useEffect, useState } from "react";
import { utilityFunctions } from "../../../utils/module";
import { Server_URL } from "../../../utils/config";
import axios from "axios";
// import "../../../assets/css/adminDashboard.css"



export default function Clients() {
  const [clients,setClients] = useState([]);



  async function getBookingData() {
    try {
        const token = utilityFunctions.getCookieValue('serviceProviderToken')
      const url = Server_URL + "providerbookingdata";
      const response = await axios.get(
        url
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
      else if (error) {
        showErrorToast(message);
      } else {
        const { result } = response.data;

        console.log("result to show in table");
        console.log(result);
        setClients(result);
        // const totalRecords = result.length;

        setClients(result);
        // showSuccessToast(message);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }
//   const providers = [
//     { name: "John Doe", contact: "john@example.com", status: "Active" },
//     { name: "Jane Smith", contact: "jane@example.com", status: "Inactive" },
//   ];

useEffect(()=>{
    getBookingData()
},[])

  return (
    <div className="management-section">
      <h2>Clients</h2>
      {/* <button className="add-button">Add New Provider</button> */}
      <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Service</th>
            <th>Sub-Service</th>
            <th>State</th>
            <th>City</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={index}>
              <td>{client.userName}</td>
              <td>{client.userEmail}</td>
              <td>{client.categoryName}</td>
              <td>{client.subCategoryName}</td>
              <td>{client.state}</td>
              <td>{client.city}</td>
              <td>{client.status}</td>
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
