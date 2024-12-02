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




export default function EditCity() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
    setValue
  } = useForm();

  const navigate = useNavigate();

  const location = useLocation();
  const id = location.state?.id;
  // console.log(id)

  const [city, setCity] = useState(null);
//   const [upload , setUpload] = useState(true);

  async function getSingleCity() {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken');
      const url = Server_URL + "view-single-city/" + id;
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
        console.log(result);
        // console.log(result[0].photo);
        
       setCity(result[0]);
        // console.log("Full photo URL:", Server_URL2 + result[0].photo);

        // console.log(state)
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  
  
  
  async function updateData(data) {
      
      try {
          const token = utilityFunctions.getCookieValue('adminAuthToken');
          const url = Server_URL + "updatecity/" + id ;
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
            navigate("/admin/view-city")
            // console.log(state)
        }
    } catch (error) {
        showErrorToast(error.message);
    }
}


useEffect(() => {
  getSingleCity();
}, []);


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
    <>{
      city &&
      <form onSubmit={handleSubmit(updateData)}>
  <div style={styles.container}>
    <div style={styles.formGroup}>
      <label style={styles.label}>City Name</label>
      <input 
        type="text" 
        defaultValue={city.cityName} 
        {...register("cityName", { required: true })}
        placeholder="city"
        style={styles.input}
        onChange={(e) => {
          // Replace multiple spaces with a single space and trim both ends
          e.target.value = e.target.value.replace(/\s+/g, ' ').trim();
          setValue("cityName", e.target.value); // Update value with modified input
        }}
      />
    </div>
    <div style={styles.formGroup}>
      <label style={styles.label}>Pincode</label>
      <input 
        type="text" 
        defaultValue={city.pincode} 
        {...register("pincode", { required: true })}
        placeholder="pincode"
        style={styles.input}
        onChange={(e) => {
          // Replace multiple spaces with a single space and trim both ends
          e.target.value = e.target.value.replace(/\s+/g, ' ').trim();
          setValue("pincode", e.target.value); // Update value with modified input
        }}
      />
    </div>
    <button type="submit" style={styles.button}>Update</button>
  </div>
</form>

    
 
//   <form onSubmit={handleSubmit(onSubmit)}>
//     <div style={styles.container}>
//       <div style={styles.formGroup}>
//               <label style={styles.label} htmlFor="photo">photo</label>
//               <input type="file" {...register('photo')} className="form-control" style={styles.input}/>
//               </div>
//               <button style={styles.button} >Upload</button>
//             </div>
            
//   </form>
 
    }
    </>
  );
}