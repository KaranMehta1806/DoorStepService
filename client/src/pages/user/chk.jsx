import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { utilityFunctions } from "../../../utils/Module";
import { Server_URL, Server_URL2 } from "../../../utils/config";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { Container, Row, Col } from 'react-bootstrap';
import './Updateserviceprovider.css'; 

function Updateserviceprovider() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?.id;

  const [category, setCategory] = useState(null);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const getSingleprovider = useCallback(async () => {
    try {
      const token = utilityFunctions.getCookieValue('providerAuthToken');
      const url = $`{Server_URL}view-single-provider/${id}`;
      const response = await axios.get(url, {
        headers: { Authorization: token ? `Bearer ${token}` : "" }
      });
      const { error, message } = response.data;
      if (error && message === "SignIn") {
        navigate('/provider-login');
      } else if (error) {
        showErrorToast(message);
      } else {
        const { result } = response.data;
        setCategory(result[0]);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }, [id, navigate]);

  useEffect(() => {
    getSingleprovider();
  }, [getSingleprovider]);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  useEffect(() => {
    if (category) {
      reset(category);
    }
  }, [category, reset]);

  const editPartner = async (Info) => {
    try {
      const token = utilityFunctions.getCookieValue('providerAuthToken');
      const url = $`{Server_URL}manage-partner`;
      const { data } = await axios.put(url, Info, {
        headers: { Authorization: token ? `Bearer ${token}` : "" }
      });
      if (data.error) {
        if (data.message === "SignIn") navigate('/provider-login');
        else showErrorToast(data.message);
      } else {
        getSingleprovider();
        showSuccessToast(data.message);
        handleClose1();
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("photo", data.photo[0]);

      const token = utilityFunctions.getCookieValue('providerAuthToken');
      const url = $`{Server_URL}provider-photo-update/${id}`;
      const res = await axios.post(url, formData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ""
        }
      });
      const { error, message } = res.data;
      if (error && message === "SignIn") {
        navigate('/provider-login');
      } else if (error) {
        showErrorToast(message);
      } else {
        getSingleprovider();
        reset();
        handleClose();
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  return (
    <>
      <Container fluid className="d-flex justify-content-center align-items-center min-vh-100">
        <Row className="w-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} className="d-flex justify-content-center align-items-center">
            <div className="col-md-9">
              {category &&
                <div className="profile-container">
                  <div className="profile-header">
                    <h3>Provider Info</h3>
                    <button className="btn btn-primary" onClick={handleShow1}>
                      Edit <FaUserEdit />
                    </button>
                  </div>
                  <div className="profile-image-section">
                    <img src={category.photo ? $`{Server_URL2}${category.photo} `: '/laptop4.jpeg'} alt="Provider" className="profile-image" /> <br />
                    <button type="button" className="btn btn-warning" onClick={handleShow}>
                      Upload <FiUpload />
                    </button>
                  </div>
                  <div className="profile-details">
                    <div className="detail-row">
                      <span className="label">Provider Name:</span>
                      <span>{category.fullName}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Mobile NO:</span>
                      <span>{category.mobile}</span>
                    </div>
                  </div>
                </div>
              }
            </div>
          </Col>
        </Row>
      </Container>

      {/* Modal for Image Upload */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="photo">Choose Photo</label>
              <input type="file" {...register('photo')} className="form-control" />
            </div>
            <button className="btn btn-primary">Upload</button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Modal for Info Update */}
      <Modal show={show1} onHide={handleClose1} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Update Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(editPartner)}>
            <div className="mb-3">
              <label>Full Name</label>
              <input {...register("fullName", { required: true })}  type="text" placeholder="Enter Full Name" />
              {errors.fullName && <p className="text-danger">This field is required</p>}
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input {...register("email", { required: true })}  type="email" placeholder="Enter Email" />
              {errors.email && <p className="text-danger">This field is required</p>}
            </div>
            <div className="mb-3">
              <label>Mobile Number</label>
              <input {...register("mobile", { required: true })}  type="text" placeholder="Enter Mobile Number" />
              {errors.mobile && <p className="text-danger">This field is required</p>}
            </div>
            <div className="mb-3">
              <label>Address</label>
              <textarea {...register("address", { required: true })}  placeholder="Enter Address"></textarea>
              {errors.address && <p className="text-danger">This field is required</p>}
            </div>
            <div className="mb-3">
              <button className="btn btn-primary">Save</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Updateserviceprovider;