import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { utilityFunctions } from "../../utils/module";
import { Server_URL } from "../../../utils/config";
import { showErrorToast, showSuccessToast } from "../../utils/Toasthelper";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { Container, Row, Col } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './BookingPage.css';

function BookingPage() {
  const { register, handleSubmit, formState: { errors }, reset, setFocus, setValue } = useForm();
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(""); // Add a state for the selected date

  const location = useLocation();
  const id = location.state?.id;

  useEffect(() => {
    GetUserInfo();
    setFocus('FullName');
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchBookedSlots(selectedDate); // Fetch slots for the selected date
    }
  }, [selectedDate]);

  const fetchBookedSlots = async (date) => {
    try {
      console.log(date);
      const token = utilityFunctions.getCookieValue('userAuthToken');
      const response = await axios.get(`${Server_URL}check-time-slot/${id}/date=${date}`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" }
      });
      const { error, message, result } = response.data;
      if (error) {
        if (message === "SignIn") navigate('/user-login');
        else showErrorToast(message);
      } else {
        setBookedSlots(result);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  };

  const GetUserInfo = async () => {
    try {
      const token = utilityFunctions.getCookieValue('userAuthToken');
      const response = await axios.get(`${Server_URL}manage-user`, {
        headers: { Authorization: token ? `Bearer ${token}` : "" }
      });
      const { error, message, result } = response.data;
      if (error) {
        if (message === "SignIn") navigate('/user-login');
        else showErrorToast(message);
      } else {
        setUser(result);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const generateTimeSlots = () => {
    const timeSlots = [];
    for (let hour = 9; hour < 17; hour++) {
      const startTime = `${hour < 10 ? "0" + hour : hour}:00`;
      const endTime =` ${(hour + 1) < 10 ? "0" + (hour + 1) : hour + 1}:00`;
      timeSlots.push({ slot: `${startTime}-${endTime}` }); // Store the slot as a single string
    }
    return timeSlots;
  };

  // Check if a time slot is booked on the selected date
  const isSlotBooked = (slot) => {
    return bookedSlots.some(slotData =>
      slotData.date === selectedDate &&
      slotData.timeslot === slot // Check against the combined timeslot format
    );
  };

  const onSubmit = async (data) => {
    try {
      console.log(data)
      const token = utilityFunctions.getCookieValue('userAuthToken');
      const response = await axios.post(`${Server_URL}add-booking-details/${id}`, data, {
        headers: { Authorization: token ? `Bearer ${token}` : "" }
      });
      const { error, message } = response.data;
      if (error) {
        if (message === "SignIn") navigate('/user-login');
        else showErrorToast(message);
      } else {
        showSuccessToast(message);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  return (

    <Container fluid className="container-background d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} className="d-flex justify-content-center">
          <div className="form-container">
            <h3 className="text-center mb-4 header-text">Add Booking Details</h3>
            {user.map((value, index) => (

              <form onSubmit={handleSubmit(onSubmit)} key={index}>
                <div className="mb-3">
                  <label>Select a date:</label>
                  <div className="input-group">
                    <span className="input-group-text icon-container"><FaCalendarAlt /></span>
                    <input
                      type="date"
                      min={getMinDate()}
                      className="form-control date-input"
                      {...register("date", { required: true })}
                      onChange={(e) => {
                        setSelectedDate(e.target.value); // Update selected date
                        setValue('date', e.target.value);
                      }}
                    />
                  </div>
                  {errors.date && <p className="text-danger">This field is required</p>}
                </div>

                <div className="mb-3">
                  <label>Select Time Slot:</label>
                  <div className="input-group">
                    <span className="input-group-text icon-container"><FaClock /></span>
                    <select {...register("timeslot", { required: true })} className="form-control">
                      <option value="">Select a time slot</option>
                      {generateTimeSlots().map(({ slot }) => (
                        <option
                          key={slot}
                          value={slot}
                          className={isSlotBooked(slot) ? 'booked' : 'available'}
                          disabled={isSlotBooked(slot)}
                        >
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.timeslot && <p className="text-danger">This field is required</p>}
                </div>

                <div className="mb-3">
                  <label>Contact Information:</label>
                  <div className="input-group">
                    <span className="input-group-text icon-container"><FaEnvelope /></span>
                    <input
                      {...register("email", { required: true })}
                      className="form-control input"
                      type="email"
                      defaultValue={value.email}
                    />
                  </div>
                  {errors.email && <p className="text-danger">This field is required</p>}
                </div>

                <div className="mb-3">
                  <label>Mobile Number:</label>
                  <div className="input-group">
                    <span className="input-group-text icon-container"><FaPhone /></span>
                    <input
                      {...register("mobile", { required: true })}
                      className="form-control input"
                      type="tel"
                      defaultValue={value.mobile}
                    />
                  </div>
                  {errors.mobile && <p className="text-danger">This field is required</p>}
                </div>

                <div className="mb-3">
                  <label>State:</label>
                  <div className="input-group">
                    <span className="input-group-text icon-container"><FaMapMarkerAlt /></span>
                    <input
                      {...register("state", { required: true })}
                      className="form-control input"
                      type="text"
                      value={value.stateInfo}
                      readOnly
                    />
                  </div>
                  {errors.state && <p className="text-danger">This field is required</p>}
                </div>

                <div className="mb-3">
                  <label>City:</label>
                  <div className="input-group">
                    <span className="input-group-text icon-container"><FaMapMarkerAlt /></span>
                    <input
                      {...register("city", { required: true })}
                      className="form-control input"
                      type="text"
                      value={value.cityInfo}
                      readOnly
                    />
                  </div>
                  {errors.city && <p className="text-danger">This field is required</p>}
                </div>

                <div className="mb-3">
                  <label>Pincode:</label>
                  <div className="input-group">
                    <span className="input-group-text icon-container"><FaMapMarkerAlt /></span>
                    <input
                      {...register("pincode", { required: true })}
                      className="form-control input"
                      type="text"
                      value={value.pincode}
                      readOnly
                    />
                  </div>
                  {errors.pincode && <p className="text-danger">This field is required</p>}
                </div>

                <div className="mb-3">
                  <label>Address:</label>
                  <div className="input-group">
                    <span className="input-group-text icon-container"><FaMapMarkerAlt /></span>
                    <textarea
                      {...register('address')}
                      className="form-control shadow text-area"
                      defaultValue={value.address}
                    ></textarea>
                  </div>
                  {errors.address && <p className="text-danger">This field is required</p>}
                </div>

                <button className="btn w-100 button">Register</button>
              </form>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default BookingPage;