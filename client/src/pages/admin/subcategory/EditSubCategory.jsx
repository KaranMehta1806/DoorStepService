import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { utilityFunctions } from "../../../utils/module";
import { showSuccessToast, showErrorToast } from '../../../utils/toasthelper';
import { Link } from "react-router-dom";
import { Server_URL, Server_URL2 } from "../../../utils/config";
import BannerArea from "../../commonpages/BannerArea";
import { useNavigate,useLocation } from "react-router-dom";
import {Container, Row, Col} from 'react-bootstrap'
import Modal from "react-bootstrap/Modal"
import { FaUserEdit } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";




export default function EditSubsubCategory() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
    setValue,
  } = useForm();

  const navigate = useNavigate();

  const location = useLocation();
  const id = location.state?.id;
  // console.log(id)

  const [subcategory, setSubCategory] = useState(null);
  const [upload , setUpload] = useState(true);

  const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);


  async function handleShow() {
    setUpload(false);
  }

  async function getSinglesubCategory() {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken');
      const url = Server_URL + "view-single-subcategory/" + id;
      const response = await axios.get(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ""
        }
      });
      const { error, message } = response.data;
      if (error && message === "SignIn") {
        navigate('/admin-login')
      }
      else if (error) {
        showErrorToast(message);
      } else {
        const { result } = response.data;
        // console.log(result);
        // console.log(result[0].photo);
        
        setSubCategory(result[0]);
        // console.log("Full photo URL:", Server_URL2 + result[0].photo);

        // console.log(subcategory)
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  useEffect(() => {
    getSinglesubCategory();
  }, []);

  // async function editAdmin(id) {
  //   try {
  //     const token = utilityFunctions.getCookieValue('adminAuthToken');
  //     const url = Server_URL + "manage-admin/" + id;
  //     const res = await axios.post(url, {
  //       headers: {
  //         Authorization: token ? Bearer ${token} : ""
  //       }
  //     });
  //     // console.log(res.data)
  //     const { error, message } = res.data;
  //     if (error && message === "SignIn") {
  //       navigate('/admin-login')
  //     }
  //     else if (error) {
  //       showErrorToast(message);
  //     } else {
  //       showSuccessToast(message);
  //       getAdminData();
  //     }
  //   } catch (error) {
  //     showErrorToast(error.message);
  //   }
  // }

  async function onSubmit(data) {
    try {
      // console.log(data)
      const formData = new FormData();
      formData.append("photo", data.photo[0]);

      const token = utilityFunctions.getCookieValue('adminAuthToken');
      const url = Server_URL + "subcategory-photo-update/" + id;
      const res = await axios.post(url, formData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ""
        }
      });
      const { error, message } = res.data;
      if (error && message === "SignIn") {
        navigate('/admin-login');
      } else if (error) {
        showErrorToast(message);
      } else {
        getSinglesubCategory();
        reset();
        setUpload(true);
      }
    } catch (error) {
      showErrorToast(error.message)
    }
  }

  async function updateData(data) {

    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken');
      const url = Server_URL + "updatesubcategory/" + id ;
      const response = await axios.put(url,data, {
        headers: {
          Authorization: token ? `Bearer ${token}` : ""
        }
      });
      const { error, message } = response.data;
      if (error && message === "SignIn") {
        navigate('/admin-login')
      }
      else if (error) {
        showErrorToast(message);
      } else {
        showSuccessToast(message)
        navigate("/admin/view-subcategory")
        // console.log(subcategory)
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }


  const styles = {
    container: {
      maxWidth: '600px',
      margin: '80px auto',
      padding: '30px',
      backgroundColor: '#fff',
      boxShadow: '0px 0px 15px rgba(0,0,0,0.1)',
      borderRadius: '10px',
      textAlign: 'center',
    },
    formGroup: {
      marginBottom: '20px',
      textAlign: 'left',
    },
    label: {
      display: 'block',
      fontSize: '14px',
      color: '#333',
      marginBottom: '8px',
    },
    

    input: {
      width: '100%',
      padding: '10px',
      fontSize: '14px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    textArea: {
      width: '100%',
      padding: '10px',
      fontSize: '14px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      resize: 'vertical',
    },
    button1: {
      width: '30%',
      padding: '10px',
      fontSize: '16px',
      color: '#fff',
      backgroundColor: '#fe6930', // Template button color
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    button: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      color: '#fff',
      backgroundColor: '#fe6930', // Template button color
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '20px',
    },
    profilePic: {
      width: '230px',
      height: '200px',
      objectFit: 'cover',
      marginBottom: '20px',
      border: '3px solid #fe6930', // Matching color scheme
    },
  };


  return (
    <>
    {
      upload ? 
      <>
      {subcategory &&
        <form onSubmit={handleSubmit(updateData)}>
       <div style={styles.container}>
        <div>
          <img onClick={handleShow} cursor="pointer" src={subcategory.photo ? (Server_URL2 + subcategory.photo) : '/photo1.png'} alt="Uploaded" style={{...styles.profilePic ,cursor: "pointer" }} /><br/>
          {/* <button style={styles.button1}>Upload</button> */}
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>subCategory</label>
          <input type="text" defaultValue={subcategory.subCategoryName} {...register("subCategoryName", { required: true })}  placeholder="subCategory" style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Description</label>
          <textarea  style={styles.textArea} {...register("subCategoryDescription", { required: true })} defaultValue={subcategory.subCategoryDescription}></textarea>
        </div>
        <button type="submit" style={styles.button}>Update</button>
      </div>
      </form>
  }
  </>
  : <>
  <form onSubmit={handleSubmit(onSubmit)}>
    <div style={styles.container}>
      <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="photo">photo</label>
              <input type="file" {...register('photo')} className="form-control" style={styles.input}/>
              </div>
              <button style={styles.button} >Upload</button>
            </div>
            
  </form>
  </>
    }

    
      

      {/* <Modal show={show} onHide={handleClose} centered >
        <Modal.Header closeButton>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="photo">photo</label>
              <input type="file" {...register('photo')} className="form-control" />
            </div>
            <button className="btn btn-primary">Upload</button>
          </form>
        </Modal.Body>
      </Modal> */}
    </>
  );
}

