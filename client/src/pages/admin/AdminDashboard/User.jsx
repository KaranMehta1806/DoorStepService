import React, { useEffect, useState } from "react";
import { utilityFunctions } from "../../../utils/module";
import { Server_URL } from "../../../utils/config";
import axios from "axios";
// import "../../../assets/css/adminDashboard.css"


export default function Users() {
    const [user,setUser] = useState([]);


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
          console.log(result)
            setUser(result);
        }
      } catch (error) {
        console.log(error.message);
      }
    }

    useEffect(()=>{
        getUserData();
    },[])

  return (
    <div className="management-section">
      <h2>Users</h2>
      <div className="table-container">

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>mobile</th>
            <th>State</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user, index) => (
            <tr key={index}>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{user.stateInfo}</td>
              <td>{user.cityInfo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

