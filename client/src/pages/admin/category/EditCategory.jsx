// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { useState, useEffect, useContext } from "react";
// import { utilityFunctions } from "../../../utils/module";
// import { showSuccessToast, showErrorToast } from '../../../utils/toasthelper';
// import { Link } from "react-router-dom";
// import { Server_URL, Server_URL2 } from "../../../utils/config";
// import BannerArea from "../../commonpages/BannerArea";
// import { useNavigate,useLocation } from "react-router-dom";
// import {Container, Row, Col} from 'react-bootstrap'
// import Modal from "react-bootstrap/Modal"
// import { FaUserEdit } from "react-icons/fa";
// import { FiUpload } from "react-icons/fi";




// export default function EditCategory() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     setFocus,
//   } = useForm();

//   const navigate = useNavigate();

//   const location = useLocation();
//   const id = location.state?.id;
//   // console.log(id)

//   const [category, setCategory] = useState(null);

//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);


//   async function getSingleCategory() {
//     try {
//       const token = utilityFunctions.getCookieValue('adminAuthToken');
//       const url = Server_URL + "view-single-category/" + id;
//       const response = await axios.get(url, {
//         headers: {
//           Authorization: token ? `Bearer ${token}` : ""
//         }
//       });
//       const { error, message } = response.data;
//       if (error && message === "SignIn") {
//         navigate('/admin-login')
//       }
//       else if (error) {
//         showErrorToast(message);
//       } else {
//         const { result } = response.data;
//         console.log(result[0].photo);
        
//         setCategory(result[0]);
//         console.log("Full photo URL:", Server_URL2 + result[0].photo);

//         // console.log(category)
//       }
//     } catch (error) {
//       showErrorToast(error.message);
//     }
//   }

//   useEffect(() => {
//     getSingleCategory();
//   }, []);

//   // async function editAdmin(id) {
//   //   try {
//   //     const token = utilityFunctions.getCookieValue('adminAuthToken');
//   //     const url = Server_URL + "manage-admin/" + id;
//   //     const res = await axios.post(url, {
//   //       headers: {
//   //         Authorization: token ? Bearer ${token} : ""
//   //       }
//   //     });
//   //     // console.log(res.data)
//   //     const { error, message } = res.data;
//   //     if (error && message === "SignIn") {
//   //       navigate('/admin-login')
//   //     }
//   //     else if (error) {
//   //       showErrorToast(message);
//   //     } else {
//   //       showSuccessToast(message);
//   //       getAdminData();
//   //     }
//   //   } catch (error) {
//   //     showErrorToast(error.message);
//   //   }
//   // }

//   async function onSubmit(data) {
//     try {
//       console.log(data)
//       const formData = new FormData();
//       formData.append("photo", data.photo[0]);

//       const token = utilityFunctions.getCookieValue('adminAuthToken');
//       const url = Server_URL + "category-photo-update/" + id;
//       const res = await axios.post(url, formData, {
//         headers: {
//           Authorization: token ? `Bearer ${token}` : ""
//         }
//       });
//       const { error, message } = res.data;
//       if (error && message === "SignIn") {
//         navigate('/admin-login');
//       } else if (error) {
//         showErrorToast(message);
//       } else {
//         getSingleCategory();
//         reset();
//         handleClose();
//       }
//     } catch (error) {
//       showErrorToast(error.message)
//     }
//   }


//   return (
//     <>
    
//       <Container fluid className="d-flex justify-content-center align-items-center min-vh-100" style={styles.background}>
//         <Row className="w-100 d-flex justify-content-center align-items-center">
//           <Col md={8} lg={6} className="d-flex justify-content-center align-items-center">
//             {/* <div style={styles.formContainer}> */}
//             <div className="col-md-9">
//               {category &&
//                 <table className="table">
//                   <tbody>
//                     <tr>
//                       <td>
//                         <h3 style={{ color: 'blue' }}><b>Category Info</b></h3>
//                       </td>
//                       <td className="text-end">
//                         <button className="btn btn-primary">Edit<span>     </span><FaUserEdit /></button>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td colSpan={2} className="text-center">
//                       {/* <img src={category.photo ? `${Server_URL2}/images/${category.photo}` : '/photo1.png'} alt="Category" style={{ height: 100, borderRadius: 10 }} /> */}

//                       {/* <img src={ category.photo ? `http://localhost:5000${category.photo}` : '/photo1.png' } alt="Category" style={{ height: 100, borderRadius: 10 }} /> */}
//                         <img src={category.photo ? (Server_URL2 + category.photo) : '/photo1.png'} alt="hloo" style={{ height: 100, borderRadius: 10 }} />
//                         <br /><br />
//                         <button type="button" className=" btn btn-warning" onClick={handleShow}>Upload <span>   </span> <FiUpload /></button>
//                       </td>
//                     </tr>
//                     <tr>
//                       <th className="text-end" style={{ color: 'blue' }}>Category :</th>
//                       <td style={{ color: 'blue' }}>{category.categoryName}</td>
//                     </tr>
//                     <tr>
//                       <th className="text-end" style={{ color: 'blue' }}>Description :</th>
//                       <td style={{ color: 'blue' }}>{category.description}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               }
//             </div>
//             {/* </div> */}
//           </Col>
//         </Row>
//       </Container>

//       <Modal show={show} onHide={handleClose} centered >
//         <Modal.Header closeButton>
//           <Modal.Title>Upload Image</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="mb-3">
//               <label htmlFor="photo">photo</label>
//               <input type="file" {...register('photo')} className="form-control" />
//             </div>
//             <button className="btn btn-primary">Upload</button>
//           </form>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }

// const styles = {
//   background: {
//     background: 'linear-gradient(135deg, #193e40, #132e4f)', // Gradient background
//     height: '100vh',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   formContainer: {
//     backgroundColor: 'rgba(0, 40, 72)', // Translucent background
//     borderRadius: '10px',
//     padding: '60px 40px', // Increased padding for larger form
//     width: '100%',
//     maxWidth: '500px', // Increased max width for larger form
//     backdropFilter: 'blur(10px)', // Blurring the background for effect
//     boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
//   },
//   headerText: {
//     color: 'blue',
//     fontWeight: 'bold',
//     fontSize: '28px', // Increased font size for more prominence
//   },
//   iconContainer: {
//     backgroundColor: 'blue',
//     border: 'none',
//   },
//   input: {
//     border: 'none',
//     paddingLeft: '10px',
//     fontSize: '16px', // Slightly larger text for better readability
//   },
//   button: {
//     background: 'linear-gradient(135deg, #4E54C8, #132e4f)',
//     color: 'blue',
//     border: 'none',
//     padding: '12px',
//     fontSize: '18px', // Larger button size
//   }
// }
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




export default function EditCategory() {
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

  const [category, setCategory] = useState(null);
  const [upload , setUpload] = useState(true);

  



  async function handleShow() {
    setUpload(false);
  }

  async function getSingleCategory() {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken');
      const url = Server_URL + "view-single-category/" + id;
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
        // console.log(result[0].photo);
        
        setCategory(result[0]);
        // console.log("Full photo URL:", Server_URL2 + result[0].photo);

        // console.log(category)
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  useEffect(() => {
    getSingleCategory();
  }, []);



  async function onSubmit(data) {
    try {
      const formData = new FormData();
      formData.append("photo", data.photo[0]);

      const token = utilityFunctions.getCookieValue('adminAuthToken');
      const url = Server_URL + "category-photo-update/" + id;
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
        getSingleCategory();
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
      const url = Server_URL + "updatecategory/" + id ;
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
        navigate("/admin/view-category")
        // console.log(category)
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
    <>{
      upload ? 
      <>{category &&
        <form onSubmit={handleSubmit(updateData)}>
       <div style={styles.container}>
        <div>
          <img onClick={handleShow} cursor="pointer" src={category.photo ? (Server_URL2 + category.photo) : '/photo1.png'} alt="Uploaded" style={{...styles.profilePic ,cursor: "pointer" }} /><br/>
          {/* <button style={styles.button1}>Upload</button> */}
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Category</label>
          <input type="text" defaultValue={category.categoryName} {...register("categoryName", { required: true })}  placeholder="Category" style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Description</label>
          <textarea  style={styles.textArea} {...register("description", { required: true })} defaultValue={category.description}></textarea>
        </div>
        <button type="submit" style={styles.button}>Update</button>
      </div>
      </form>
  }</>: <>
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
    </>
  );
}

