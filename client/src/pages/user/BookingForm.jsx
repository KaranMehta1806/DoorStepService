import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { utilityFunctions } from "../../utils/module";
import { showSuccessToast, showErrorToast } from "../../utils/toasthelper";
import { Link, useLocation } from "react-router-dom";
import BannerArea from "../commonpages/BannerArea";
import { useNavigate } from "react-router-dom";
import { Server_URL } from "../../utils/config";
import {useRazorpay} from "react-razorpay";

export default function BookingForm() {
  const Razorpay = useRazorpay();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus, 
    getValues,
    setValue
  } = useForm();
  const location = useLocation();
  const providerData = location.state?.providerData;
  console.log(providerData);
  const [user, setUser] = useState([]);
  const [slots, setSlots] = useState(null);
  const [minDate, setMinDate] = useState("");

  const navigate = useNavigate();



  const GetUserInfo = async () => {
    try {
      const token = utilityFunctions.getCookieValue('userAuthToken');
      const response = await axios.get(`${Server_URL}user-registration`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" }
      });
      const { error, message, result } = response.data;
      if (error) {
        if (message === "SignIn") navigate('/user-login');
        else showErrorToast(message);
      } else {
        // console.log(result);
        setUser(result);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  async function ReadSlots(bookingDate) {
    let data = {
        bookingDate,
        serviceProviderId: providerData._id
    }

    const url = Server_URL + "check-available-slots";
    const response = await axios.post(url, data);
    // console.log(response.data);
    // console.log(response.data.slots);

    if (response.data.error) {
        alert(response.data.message)
    } else if (!response.data.error) {
        // console.log(response.data.slots);
        setSlots(response.data.slots);
    }
}

const handleFormSubmit = (data) => {

  const slotPrice = providerData.price;
  let selectedSlotsCount = 0;
  slots.forEach((slot, index) => {
    if (data[`slots${index}`]) {
      selectedSlotsCount++;
    }
  });
  const totalPrice = selectedSlotsCount * slotPrice;


  const transformedData = {
      ...data, // Include all form fields
      partnerId: providerData._id,
      categoryId: providerData.categoryId,
      subCategoryId: providerData.subCategoryId,
      totalPrice,
      slots: slots
      .map((slot, index) => {
        if (data[`slots${index}`]) {
          return {
            start: slot.start,
            end: slot.end,
            selected: true,
          };
        }
        return null;
      })
      .filter(Boolean),
  };
  onSubmit(transformedData);
};


let [slotsSelectedByUser, setSlotsSelectedByUser] = useState([]);

function calculateGrandTotal(e, index) {
    console.log(index, e.target.checked)
    if (e.target.checked) {
        setSlotsSelectedByUser((prev) => [...prev, {index: index, checked: true}]);
    } else {
        const filterSlots = slotsSelectedByUser.filter(x => x.index !== index);
        setSlotsSelectedByUser(filterSlots);
}

}











async function onSubmit(data) {

  try {

    localStorage.setItem("bookingData", JSON.stringify(data))

    // RAZORPAY Options
    let options = {
      key: "rzp_test_A3RM3Asww6uWvF",
      currency: "INR",
      amount: 0,
      name: "Razorpay Demo",
      description: "Testing Payment Gateway",
      image: "https://i.pinimg.com/originals/c1/92/9d/c1929d3492c2f64ab65b43808c072043.jpg",
      handler: paymentHandler,
      prefill: {
          name: "",
          email: "",
          // email: "user@yahoo.in",
          // contact: "1234567890",
          contact: "",
      },
      theme: {
          color: "#F46432",
      },
  };

  options.amount = (slotsSelectedByUser.length * providerData.price) * 100;

  let rzp = new window.Razorpay(options);
  rzp.open(); // Display Razorpay
  } catch (error) {
    showErrorToast(error.message);
  }
  
}

const paymentHandler = async (response) => {
  console.log(response)
  let {razorpay_payment_id} = response;
  // console.log(payment_id);

  if (razorpay_payment_id === "") {
      alert("Payment Failed");
  } 
  else {
      // alert("Payment Success");

     let data =  JSON.parse(localStorage.getItem("bookingData"));
        const token = utilityFunctions.getCookieValue('userAuthToken');

    const url = Server_URL + "user-booking";
    const response = await axios.post(url, data,{
      headers:{
          Authorization:token ? `Bearer ${token}` : ""
      }
  });
    // console.log(response.data);
    const { error, message } = response.data;
   if(error){
      showErrorToast(message);
    } else {
      reset();
      showSuccessToast(message);
      localStorage.removeItem("bookingData")
      navigate("/user/thankyou")
    }
  }
};






  

  useEffect(()=>{
    GetUserInfo();
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const tomorrow = today.toISOString().split("T")[0];
    setMinDate(tomorrow);
  },[])
  return (
    <>
      <BannerArea data="Booking Form" />
      <div className="my-account-area pt-100 pb-70">
        <div className="container">
          <div className="login-form">
          {user.map((value, index) => (
            <form
              className="my-account-content"
              onSubmit={handleSubmit(handleFormSubmit)}
              key={index}
            >
              <div className="section-title">
                <h2>Booking Form</h2>
                {/* <span className="top-title">Get Start With Us</span> */}
              </div>
              <div className="row">







              
                <div className="col-lg-12">
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      {...register("email", { required: true })}
                      defaultValue={value.email}
                    />
                    {errors.email && (
                      <p className="text-danger">This field is required</p>
                    )}
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <input
                      type="tel"
                      className="form-control"
                      {...register("mobile", { required: true })}
                      defaultValue={value.mobile}
                    />
                    {errors.mobile && (
                      <p className="text-danger">This field is required</p>
                    )}
                  </div>
                  </div>

                  <div className="col-lg-12">
                  <div className="form-group">
                  <input
                      type="text"
                      className="form-control"
                      {...register("state", { required: true })}
                      value={value.stateInfo}
                      readOnly
                    />
                    {errors.state && (
                      <p className="text-danger">This field is required</p>
                    )}
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                  <input
                      type="text"
                      className="form-control"
                      {...register("city", { required: true })}
                      value={value.cityInfo}
                      readOnly
                    />
                    {errors.city && (
                      <p className="text-danger">This field is required</p>
                    )}
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <input
                      {...register("pincode", { required: "Pincode is required" })}
                      className="form-control"
                      type="text"
                      value={value.pincode}
                      readOnly
                    />
                    {errors.pincode && <p className="text-danger">{errors.pincode.message}</p>}
                  </div>
                  </div>
                

                <div className="col-lg-12">
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      {...register("address", { required: true })}
                      defaultValue={value.address}
                    />
                    {errors.address && (
                      <p className="text-danger">This field is required</p>
                    )}
                  </div>
                </div>

                <div className="col-lg-12">
              <div className="form-group">
                <label htmlFor="date">Select Booking Date <span className="text-danger">*</span></label>
                <input
                  type="date"
                  min={minDate}
                  className="form-control p-3"
                  {...register("date", { required: true })}
                  onChange={(e) => ReadSlots(e.target.value)}
                />
                {errors.date && <p className="text-danger">This field is required</p>}
              </div>
            </div>

            {/* Slot selection table - show only when slots are available */}
            {slots && (
              <div className="col-lg-12">
                <hr />
                <h3>Slot Amount = {providerData.price}</h3>
                <label>Select Slots <span className="text-danger">*</span></label>

                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slots.map((x, i) => (
                      <tr key={x?.start}>
                        <td className="text-center">
                          {x.available ? (
                            <input type="checkbox" {...register(`slots${i}`)} 
                            onChange={(e) => calculateGrandTotal(e, i)}
                            />
                          ) : null}
                        </td>
                        <td>{x.start}</td>
                        <td>{x.end}</td>
                        <td>
                          {x.available ? (
                            <span className="badge bg-success">Available</span>
                          ) : (
                            <span className="badge bg-danger">Not Available</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h3 className="text-end">
                                    Total Amount: <span className="badge bg-primary">{providerData.price  * slotsSelectedByUser.length}</span>
                                </h3>
              </div>
              
            )}

            






                <div className="col-lg-12">
                
                  <button type="submit" className="default-btn btn-style-fore">
                    Book 
                  </button>
                </div>
              </div>
            </form>
          ))}
          </div>
        </div>
      </div>
    </>
  );
}
