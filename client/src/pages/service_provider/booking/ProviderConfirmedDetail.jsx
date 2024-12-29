import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Server_URL } from "../../../utils/config";
import { showErrorToast, showSuccessToast } from "../../../utils/toasthelper";
import { utilityFunctions } from "../../../utils/module";

export default function ProviderConfirmedDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const BookingDetails = location.state?.bookingDetails || {};
  const bookingTimes = BookingDetails.bookingTimes || []
  // console.log(bookingTimes);


  console.log(BookingDetails);
 


  const updateBookingStatus = async (status) => {
    try {
  const token = utilityFunctions.getCookieValue('serviceProviderToken');
      const data ={
        bookingId: BookingDetails._id, // assuming _id is the unique identifier in MongoDB
        status: status,
      }
      const response = await axios.put(`${Server_URL}updateBookingStatus`, data, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ""
        }
      });
      const { message, error } = response.data;
      if (error) {
        console.error("Error:", message);
        showErrorToast("Failed to update booking status.");
      } else {
        showSuccessToast("Booking status updated successfully.");
        navigate("/providerpages/confirmed")
        
      }
    } catch (err) {
      console.error("Error:", err.message);
      showErrorToast("An error occurred while updating the status.");
    }
  };

  return (
    <div className="custom-container py-5">
      <div className="custom-time-slots mt-4">
        <div className="custom-card shadow-lg">
          <div className="custom-card-body">
            <h4 className="custom-card-title">Time Slots</h4>
            <table className="custom-table table-striped">
              <thead>
                <tr>
                  <th>Start Time</th>
                  <th>End Time</th>
                </tr>
              </thead>
              <tbody>
              {bookingTimes.map((slot, index) => (
                  <tr key={index}>
                    <td>{slot.start_time}</td>
                    <td>{slot.end_time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="custom-row">
        

        {/* Customer Details */}
        <div className="custom-col-lg-6 custom-col-md-12 custom-card-container mb-4">
          <div className="custom-card customer-card shadow-sm">
            <div className="custom-card-body">
              <h4 className="custom-card-title">Customer Information</h4>
              <p><strong>Name:</strong> {BookingDetails.userName}</p>
              <p><strong>Email:</strong> {BookingDetails.userEmail}</p>
              <p><strong>Mobile:</strong> {BookingDetails.userMobile}</p>
              <div className="custom-address mt-3">
                <h5 className="text-muted mb-1">Address</h5>
                <p><strong>State:</strong> {BookingDetails.state}</p>
                <p><strong>City:</strong> {BookingDetails.city}</p>
                <p><strong>Pincode:</strong> {BookingDetails.pincode}</p>
              </div>
              <div className="custom-button-group mt-4">
                <button className="custom-btn-completed" onClick={() => updateBookingStatus("completed")}>
                  Completed
                </button>
                <button className="custom-btn-cancel" onClick={() => updateBookingStatus("cancelled")}>
                  Cancel
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Uncomment when time slots data is available */}
      
      
     
    </div>
  );
}






