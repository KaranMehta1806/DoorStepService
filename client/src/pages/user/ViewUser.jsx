import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { utilityFunctions } from "../../utils/module";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from '../../utils/toasthelper';
import { Server_URL } from "../../utils/config";


export default function viewUser() {
  const navigate = useNavigate();

  const [admin,setAdmin] = useState([]);


  async function getUserData() {
    try {
      const token = utilityFunctions.getCookieValue('userAuthToken')
      const url = Server_URL + "user-registration";
      const response = await axios.get(url,{
        headers:{
            Authorization:token ? `Bearer ${token}` : ""
        }
    });
      const { error, message } = response.data;
      if (error && message === "SignIn") {
        navigate("/user/login")
      }
      else if(error) {
        showErrorToast(message);
      } else {
        const { result } = response.data;
          setAdmin(result);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }





  async function deleteUser(id) {
    try {
      const token = utilityFunctions.getCookieValue('userAuthToken')
      const url = Server_URL + "user-registration/" + id;
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
        getUserData();
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }


  useEffect(() => {
    // setFocus('FullName')
    getUserData();

  }, []);

  return (
    <>
      <div>
        <table className="table table-dark">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile number</th>
                    <th>Address</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {admin.map((value,index)=>{
                    return(
                    <tr key={index}>
                        <td>
                        {value.fullName}
                        </td>
                        <td>
                        {value.email}
                        </td>
                        <td>
                        {value.mobile}
                        </td>
                        <td>
                        {value.address}
                        </td>
                        <td>
                  {
                    <button
                      type="button"
                      onClick={() => deleteUser(value._id)}
                      className="btn btn-outline-danger btn-sm me-5"
                    >
                      Delete
                    </button>
                  }
                </td>
                    </tr>
                )
                })}

            </tbody>

        </table>
      </div>
      <hr/>
    </>
  );
}













