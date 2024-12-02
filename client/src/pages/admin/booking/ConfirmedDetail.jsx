import { useLocation } from "react-router-dom";

export default function ConfirmedDetails() {
  const location = useLocation();
  const BookingDetails = location.state?.bookingDetails || {};
  const bookingTimes = BookingDetails.bookingTimes || []
  console.log(bookingTimes);


  console.log(BookingDetails);

  return (
    <div className="custom-container py-5">
      <div className="custom-row">
        {/* Service Provider Details */}
        <div className="custom-col-lg-6 custom-col-md-12 custom-card-container mb-4">
          <div className="custom-card service-card shadow-sm">
            <div className="custom-card-body">
              <h4 className="custom-card-title">Service Provider Information</h4>
              <p><strong>Name:</strong> {BookingDetails.providerName}</p>
              <p><strong>Email:</strong> {BookingDetails.providerEmail}</p>
              <p><strong>Mobile:</strong> {BookingDetails.providerMobile}</p>
            </div>
          </div>
        </div>

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
            </div>
          </div>
        </div>
      </div>

      {/* Uncomment when time slots data is available */}
      
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
     
    </div>
  );
}





{/* <tr>
<td>abc</td>
<td>abc</td>
</tr>
<tr>
<td>abc</td>
<td>abc</td>
</tr>
<tr>
<td>abc</td>
<td>abc</td>
</tr> */}
