import React, { useEffect, useState } from "react";
import { Server_URL } from "../../../utils/config";
import { utilityFunctions } from "../../../utils/module";
import axios from "axios";
import { toast } from "react-toastify";
// import "../../../assets/css/adminDashboard.css"

export default function OverviewCards() {
  const [user,setUser] = useState([]);
  const [provider,setProvider] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [booking,setBooking] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);


//   const stats = [
//     { title: "Total Service Providers", count: 120, color: "#4CAF50" },
//     { title: "Total Users", count: 450, color: "#2196F3" },
//     { title: "Total Subservices", count: 35, color: "#FF9800" },
//     { title: "Active Bookings", count: 80, color: "#F44336" },
//     { title: "Active Bookings", count: 80, color: "#F44336" },
//   ];

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
        const totalRecords = result.length;
          setUser(totalRecords);
      }
    } catch (error) {
      console.log(error.message);
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
        const totalRecords = result.length;
        setProvider(totalRecords);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async function getCategory() {
    try {
        const token = utilityFunctions.getCookieValue('adminAuthToken')
      const url = Server_URL + "managecategory";
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
          navigate("/admin-login")
        }
      else if (error) {
        showErrorToast(message);
      } else {
        const { result } = response.data;
        const totalRecords = result.length;

        setCategory(totalRecords);
        // showSuccessToast(message);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  async function getsubCategory() {
    try {
        const token = utilityFunctions.getCookieValue('adminAuthToken')
      const url = Server_URL + "managesubCategory";
      const response = await axios.get(
        url
            ,{
            headers:{
                Authorization:token ? `Bearer ${token}` : ""
            }
        }
      );
      const { error, message } = response.data;
      //   // console.log(error,message);
        if (error && message === "SignIn") {
          navigate("/admin-login")
        }
      else if (error) {
        alert(message);
      } else {
        const { result } = response.data;
        const totalRecords = result.length;
        setSubCategory(totalRecords);
      }
    } catch (error) {
      console.log(error.message);
    }
  }


  async function getBookingData() {
    try {
        const token = utilityFunctions.getCookieValue('adminAuthToken')
      const url = Server_URL + "adminbookingdata";
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
          navigate("/admin-login")
        }
      else if (error) {
        showErrorToast(message);
      } else {
        const { result } = response.data;
        const totalRecords = result.length;
        const totalPrice = result.reduce((acc, record) => {
          return record.status === 'completed' ? acc + (record.total || 0) : acc;
      }, 0);
        setBooking(totalRecords);
        setTotalPrice(totalPrice);
        // showSuccessToast(message);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }





useEffect(()=>{
    getUserData(),
    getproviderData(),
    getCategory(),
    getsubCategory(),
    getBookingData()
},[])


  return (
    <div className="overview-cards">
      {/* {stats.map((stat, index) => ( */}
        <div
        //   key={index}
          className="card"
          style={{ borderLeft: '5px solid #FF9800' }}
        >
          <h3>Registered Users</h3>
          <p>{user}</p>
        </div>
        <div
        //   key={index}
          className="card"
          style={{ borderLeft: '5px solid #F44336' }}
        >
          <h3>Service Providers</h3>
          <p>{provider}</p>
        </div>
        <div
        //   key={index}
          className="card"
          style={{ borderLeft: '5px solid #FF9800' }}
        >
          <h3>Available Services</h3>
          <p>{category}</p>
        </div>
        <div
        //   key={index}
          className="card"
          style={{ borderLeft: '5px solid #4CAF50' }}
        >
          <h3>Total SubServies</h3>
          <p>{subCategory}</p>
        </div>
        <div
        //   key={index}
          className="card"
          style={{ borderLeft: '5px solid #2196F3' }}
        >
          <h3>Total Bookings</h3>
          <p>{booking}</p>
        </div>
        <div
        //   key={index}
          className="card"
          style={{ borderLeft: '5px solid #2CAAC1' }}
        >
          <h3>Total Revenue</h3>
          <p>{totalPrice}</p>
        </div>
      {/* ))} */}
    </div>
  );
};

// export default OverviewCards;
