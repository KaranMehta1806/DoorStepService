import React, { useEffect, useState } from "react";
import { Server_URL } from "../../../utils/config";
import { utilityFunctions } from "../../../utils/module";
import axios from "axios";
import { toast } from "react-toastify";
import { showErrorToast } from "../../../utils/toasthelper";
// import "../../../assets/css/adminDashboard.css"

export default function OverviewCards() {
  const [clients, setClients] = useState({ total: 0, active: 0 });
  const [booking, setBooking] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  async function getBookingData() {
    try {
      const token = utilityFunctions.getCookieValue("serviceProviderToken");
      const url = Server_URL + "providerbookingdata";
      const response = await axios.get(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      // console.log(response.data);
      const { error, message } = response.data;
      // console.log(error,message);
      if (error && message === "SignIn") {
        navigate("/serviceprovider/login");
      } else if (error) {
        showErrorToast(message);
      } else {
        const { result } = response.data;
        // console.log(result);
        const totalRecords = result.length;
        const activeClients = result.filter(
          (booking) => booking.status === "confirmed"
        ).length;
        const totalPrice = result
          .filter((record) => record.status === "completed")
          .reduce((acc, record) => acc + (record.total || 0), 0);

        setClients({ total: totalRecords, active: activeClients });
        setTotalPrice(totalPrice);

        // setClients(totalRecords);
        // showSuccessToast(message);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  useEffect(() => {
    getBookingData();
  }, []);

  return (
    <div className="overview-cards">
      {/* {stats.map((stat, index) => ( */}
      <div
        //   key={index}
        className="card"
        style={{ borderLeft: "5px solid #FF9800" }}
      >
        <h3>Total Clients</h3>
        <p>{clients.total}</p>
      </div>
      <div className="card" style={{ borderLeft: "5px solid #F44336" }}>
        <h3>Active Clients</h3>
        <p>{clients.active}</p>
      </div>
      <div className="card" style={{ borderLeft: "5px solid #FF9800" }}>
        <h3>Revenue Generated</h3>
        <p>{totalPrice}</p>
      </div>
      {/* <div
          className="card"
          style={{ borderLeft: '5px solid #4CAF50' }}
        >
          <h3>Total SubServies</h3>
          <p>{subCategory}</p>
        </div> */}
      {/* <div
          className="card"
          style={{ borderLeft: '5px solid #2196F3' }}
        >
          <h3>Total Bookings</h3>
          <p>booking</p>
        </div> */}
      {/* <div
          className="card"
          style={{ borderLeft: '5px solid #2CAAC1' }}
        >
          <h3>Total Revenue</h3>
          <p>{totalPrice}</p>
        </div> */}
    </div>
  );
}

// export default OverviewCards;
