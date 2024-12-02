import React, { useEffect, useState } from "react";
import { utilityFunctions } from "../../../utils/module";
import { Server_URL } from "../../../utils/config";
import axios from "axios";
// import "../../../assets/css/adminDashboard.css"


export default function Bookings(){
  const [booking, setBooking] = useState([]);

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
        // console.log(result);
        setBooking(result);
        // showSuccessToast(message);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

    useEffect(()=>{
      getBookingData()
    },[])

  return (
    <div className="management-section">
      <h2>Booking</h2>
      {/* <button className="add-button">Add Subservice</button> */}
      <div className="table-container">

      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Category</th>
            <th>SubCategory</th>
            <th>Booking Date</th>
            {/* <th>SubCategory</th>
            <th>SubCategory</th> */}
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {booking.map((booking, index) => (
            <tr key={index}>
              <td>{booking.userName}</td>
              <td>{booking.categoryName}</td>
              <td>{booking.subCategoryName}</td>
              <td>{booking.date}</td>
              <td>{booking.status}</td>
              <td>{booking.total}</td>
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

;
