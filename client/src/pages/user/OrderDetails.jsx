import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Server_URL, Server_URL2 } from "../../utils/config";
import { showErrorToast, showSuccessToast } from "../../utils/toasthelper";
import { utilityFunctions } from "../../utils/module";
import "../user/OrderDetails.css"
import { useForm } from "react-hook-form";


export default function OrderDetails() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const OrdersData = location.state?.ordersData || {};
  const bookingTimes = OrdersData.bookingTimes || []
  // const [render, setRender] = useState(false);
  console.log(OrdersData);
  // console.log(bookingTimes);

  const updateBookingStatus = async (status) => {
    try {
  const token = utilityFunctions.getCookieValue('userAuthToken');
      const data ={
        bookingId: OrdersData._id, // assuming _id is the unique identifier in MongoDB
        status: status,
      }
      const response = await axios.put(`${Server_URL}userbookingstatus`, data, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ""
        }
      });
      const { message, error } = response.data;
      if (error && message === "SignIn") {
        navigate("/user-login")
      }
      else if (error) {
        console.error("Error:", message);
        showErrorToast("Failed to update booking status.");
      } else {
        showSuccessToast("Booking status updated successfully.");
        navigate("/user/myorder")
      }
    } catch (err) {
      console.error("Error:", err.message);
      showErrorToast("An error occurred while updating the status.");
    }
  };

  async function submitReviews(review) {
    try {
      const token = utilityFunctions.getCookieValue('userAuthToken');
      const data = {
        ...review,
        partnerId:OrdersData.partnerId,
        userId:OrdersData.userId


      }
          
          const response = await axios.post(`${Server_URL}submitreview`, data, {
            headers: {
              Authorization: token ? `Bearer ${token}` : ""
            }
          });
          console.log(response.data);
          const { message, error } = response.data;
          if (error && message === "SignIn") {
            navigate("/user-login")
          }
          else if (error) {
            console.error("Error:", message);
            showErrorToast("failed to submit review");
          } else {
            showSuccessToast("Review Sumbitted successfully");
            reset();
          }
        } catch (err) {
          console.error("Error:", err.message);
          showErrorToast("An error occurred while submitting the review");
        }
  }

  return (
    <>
    <div className="custom-container py-5">
    <div className="custom-time-slots mt-4">
        <div className="custom-card shadow-lg">
          <div className="custom-card-body">
            <h4 className="custom-card-title">Available Time Slots</h4>
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

      <div className="custom-col-lg-6 custom-col-md-12 custom-card-container mb-4">
          <div className="custom-card customer-card shadow-sm">
            <div className="custom-card-body">
            <h4 className="custom-card-title">Service Provider Information</h4>
            <p><strong>Name:</strong> {OrdersData.providerName}</p>
              <p><strong>Email:</strong> {OrdersData.providerEmail}</p>
              <p><strong>Mobile:</strong> {OrdersData.providerMobile}</p>
             
              <div className="custom-button-group mt-4">
                {/* <button className="custom-btn-completed" onClick={() => updateBookingStatus("completed")}>
                  Completed
                </button> */}
                {OrdersData.status === "confirmed" && (
    <button className="custom-btn-cancel" onClick={() => updateBookingStatus("cancelled")}>
      Cancel
    </button>
  )}
              </div>
            </div>
          </div>
        </div>



        {/* Service Provider Details */}
        {/* <div className="custom-col-lg-6 custom-col-md-12 custom-card-container mb-4">
          <div className="custom-card service-card shadow-sm">
            <div className="custom-card-body">
              <h4 className="custom-card-title">Service Provider Information</h4>
              <p><strong>Name:</strong> {OrdersData.providerName}</p>
              <p><strong>Email:</strong> {OrdersData.providerEmail}</p>
              <p><strong>Mobile:</strong> {OrdersData.providerMobile}</p>
            </div>
            <button className="custom-btn-cancel" onClick={() => updateBookingStatus("cancelled")}>
                  Cancel
                  </button>
          </div>
        </div> */}

        {/* Customer Details */}
        {/* <div className="custom-col-lg-6 custom-col-md-12 custom-card-container mb-4">
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
            </div>
          </div>
        </div> */}
      </div>

      {/* Uncomment when time slots data is available */}
      
      
      {/* <hr/> */}

      {OrdersData.status === "completed" && (
  <div className="col-lg-6 col-md-8 col-sm-10 mx-auto mb-4">
    <div className="card compact-review-card shadow-sm border-0">
      <div className="card-body p-3">
        <h5 className="text-center mb-3">Leave a Review</h5>

        <form onSubmit={handleSubmit(submitReviews)}>
          {/* Rating Section */}
          <div className="mb-3">
            <label htmlFor="rating" className="form-label small fw-semibold">Rating</label>
            <fieldset className="starability-slot">
              <input
                type="radio"
                id="no-rate"
                className="input-no-rate"
                {...register("rating")}
                value=""
                aria-label="No rating"
              />
              <input type="radio" id="rate1" {...register("rating")} value="1" defaultChecked />
              <label htmlFor="rate1" title="Terrible">1 star</label>

              <input type="radio" id="rate2" {...register("rating")} value="2" />
              <label htmlFor="rate2" title="Not good">2 stars</label>

              <input type="radio" id="rate3" {...register("rating")} value="3" />
              <label htmlFor="rate3" title="Average">3 stars</label>

              <input type="radio" id="rate4" {...register("rating")} value="4" />
              <label htmlFor="rate4" title="Very good">4 stars</label>

              <input type="radio" id="rate5" {...register("rating")} value="5" />
              <label htmlFor="rate5" title="Amazing">5 stars</label>
            </fieldset>
          </div>

          {/* Comments Section */}
          <div className="mb-3">
            <label htmlFor="comments" className="form-label small fw-semibold">Comments</label>
            <textarea
              {...register("comments")}
              id="comments"
              className="form-control form-control-sm"
              rows="3"
              placeholder="Share your experience..."
              required
            ></textarea>
            {errors.comments && (
              <p className="text-danger small">This field is required</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button className="btn btn-sm btn-dark px-4">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}










      
     
            {/* <hr/> */}
    </div>
    {/* <hr/> */}
    
    </>
  );








}







// <div className="review-card-container">
//   <div className="review-card shadow-sm">
//     <div className="review-card-header d-flex align-items-center">
//       {/* User Photo */}
//       <img
//          src='/photo1.png' alt="images"
//         // alt="User"
//         className="review-user-photo"
//       />
//       <div className="review-user-info ms-3">
//         <h5 className="user-name">"Anonymous"</h5>
//         <div className="user-rating starability-result" data-rating="1"></div>
//       </div>
//     </div>

//     {/* Review Comment */}
//     <div className="review-comment mt-2">
//       <p className="comment-text"> "No comments provided."</p>
//     </div>

//     {/* Optional Photo Column
//     {review.photo && (
//       <div className="review-photo mt-2">
//         <img src={review.photo} alt="Review" className="review-photo-img" />
//       </div>
//     )} */}
//   </div>
// </div>
