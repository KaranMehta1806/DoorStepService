import { useEffect, useState } from "react"
import { utilityFunctions } from "../../../utils/module";
import { Server_URL } from "../../../utils/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./completedStatus.css"



export default function CancelledStatus(){
    const [booking, setBooking] = useState([]);
    const navigate = useNavigate();


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
            // console.log(result);
            setBooking(result);
            // showSuccessToast(message);
          }
        } catch (error) {
          showErrorToast(error.message);
        }
      }

      async function More_details(bookingDetails) {
        // console.log(data);
        navigate("/admin/confirmed/details",{state:{bookingDetails}})
      }

      useEffect(()=>{
        getBookingData();
      },[])
    return(
        <>
        {/* <div>
        <table className="table table-dark">
            <thead>
                <tr>
                    <th>Category</th>
                    <th>SubCategory</th>
                    <th>Total Price</th>
                    <th>Date</th>
                    <th>Provider Name</th>
                    <th>Provider Email</th>
                    <th>User Name</th>
                    <th>User Email</th>
                    <th>More-Details</th>
                </tr>
            </thead>
            <tbody>
                {booking
                .filter(value => value.status === "cancelled")
                .map((value,index)=>{
                    return(
                    <tr key={index}>
                        <td>
                        {value.categoryName}
                        </td>
                        <td>
                        {value.subCategoryName}
                        </td>
                        <td>
                        {value.total}
                        </td>
                        <td>
                        {value.date}
                        </td>
                        <td>
                        {value.providerName}
                        </td>
                        <td>
                        {value.providerEmail}
                        </td>
                        <td>
                        {value.userName}
                        </td>
                        <td>
                        {value.userEmail
                        }
                        </td>
                        
                        
                        <td>
                  {
                    <button
                      type="button"
                      onClick={() => More_details(value)}
                      className="btn btn-outline-secondary btn-sm me-5"
                    >
                      More Details
                    </button>
                  }
                </td>
                    </tr>
                )
                })}

            </tbody>

        </table>
      </div> */}
      <div className="custom-col-lg-12 custom-col-md-12 custom-card-container mb-4">
  <div className="custom-card shadow-sm">
    <div className="custom-card-body">
      <h4 className="custom-card-title">Booking Details</h4>
      <div className="custom-table-scroll">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Category</th>
              <th>SubCategory</th>
              <th>Total Price</th>
              <th>Date</th>
              <th>Provider Name</th>
              <th>Provider Email</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>More Details</th>
            </tr>
          </thead>
          <tbody>
            {booking
              .filter((value) => value.status === "cancelled")
              .map((value, index) => (
                <tr key={index}>
                  <td>{value.categoryName}</td>
                  <td>{value.subCategoryName}</td>
                  <td>{value.total}</td>
                  <td>{value.date}</td>
                  <td>{value.providerName}</td>
                  <td>{value.providerEmail}</td>
                  <td>{value.userName}</td>
                  <td>{value.userEmail}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => More_details(value)}
                      className="custom-btn"
                    >
                      More Details
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
        </>
    )
}