import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { utilityFunctions } from "../../../utils/module";
import { showSuccessToast, showErrorToast } from '../../../utils/toasthelper';
import { useNavigate } from "react-router-dom";
// import { FaTrash } from "react-icons/fa";
// import { CiEdit } from "react-icons/ci";
// import Modal from "react-bootstrap/Modal";
// import EditForm from "./users/EditForm";
// import { userContext } from "../App";
import { Server_URL, Server_URL2 } from "../../../utils/config";
import BannerArea from "../../commonpages/AdminBannerArea";

export default function viewSubsubCategory() {
    const navigate = useNavigate();

  const [subCategory, setSubCategory] = useState([]);

  async function getsubCategory() {
    try {
        const token = utilityFunctions.getCookieValue('adminAuthToken')
      const url = Server_URL + "managesubCategory";
      const response = await axios.get(
        url
            ,{
            headers:{
                Authorization:token ? `Bearer ${token}` : ""
            }
        }
      );
      const { error, message } = response.data;
      //   // console.log(error,message);
        if (error && message === "SignIn") {
          navigate("/admin-login")
        }
      else if (error) {
        alert(message);
      } else {
        const { result } = response.data;
        console.log(result);
        // alert("data fetched")
        setSubCategory(result);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  // const navigate = useNavigate();

  //   async function onSubmit(data) {
  //     try {
  //       const url = Server_URL + "subCategory-registration";
  //       const response = await axios.post(url, data);
  //       // console.log(response.data);
  //       const { error, message } = response.data;
  //       if (error) {
  //         alert(message);
  //       } else {
  //         reset();
  //         alert(message);
  //         getsubCategory()
  //         // navigate('/user/signin');
  //       }
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   }

  async function deletesubCategory(id) {
    try {
      const token = utilityFunctions.getCookieValue('adminAuthToken')
      const url = Server_URL + "managesubCategory/" + id;
      const res = await axios.delete(
        url
            ,{
            headers:{
                Authorization:token ? `Bearer ${token}` : ""
            }
        }
      );
      const { error, message } = res.data;
        if (error && message === "SignIn") {
          navigate("/admin-login");
        }
      else if (error) {
        showErrorToast(message);
      } else {
        showSuccessToast(message);
        getsubCategory();
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  async function editSubCategory(id) {
    navigate("/admin/editsubcategory",{state:{id}})
  }

  useEffect(() => {
    // setFocus('FullName')
    getsubCategory();
  }, []);

  return (
    <>
<BannerArea data="View Sub-Categories"/>

    <div className="services-area pt-100 pb-100">
            <div className="container">
                
                <div className="row " >
                {subCategory.map((x, index) => (
                    
                    <div className="col-lg-4 col-sm-6 col-md-6" key={index}>
<div className="single-blog-card  rounded p-4 shadow-sm" datacue="fadeIn" dataduration="1000">
    <div className="blog-img" style={{ height: '200px', overflow: 'hidden' }}>
            <img src={x.photo? x.photo : '/photo1.png'} alt="subcategory"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
    </div>
        <h2 className="mt-4 text-center">{x.categoryInfo}</h2>
        <h6 className="mt-3 text-center">{x.subCategoryName}</h6>
        <p className="mt-3 text-center">{x.subCategoryDescription}</p>
        <div className="mt-3 text-center"><button
                        type="button"
                        onClick={() => deletesubCategory(x._id)}
                        className="btn btn-danger  me-5 "
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => editSubCategory(x._id)}
                        className="btn btn-primary  ms-5"
                      >
                        Edit
                      </button>
                      </div>

</div>
</div>    
            ))}
            </div>
                               
            </div>
        </div>  
    </>
  );
}
