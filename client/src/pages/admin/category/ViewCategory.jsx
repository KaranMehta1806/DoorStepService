import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { utilityFunctions } from "../../../utils/module";
import { useNavigate } from "react-router-dom";
import { showSuccessToast, showErrorToast } from '../../../utils/toasthelper';
import BannerArea from "../../commonpages/AdminBannerArea";

// import { FaTrash } from "react-icons/fa";
// import { CiEdit } from "react-icons/ci";
// import Modal from "react-bootstrap/Modal";
// import EditForm from "./users/EditForm";
// import { userContext } from "../App";
import { Server_URL, Server_URL2 } from "../../../utils/config";

export default function viewCategory() {
    const navigate = useNavigate();

  const [category, setCategory] = useState([]);

  async function getCategory() {
    try {
        const token = utilityFunctions.getCookieValue('adminAuthToken')
      const url = Server_URL + "managecategory";
      const response = await axios.get(
        url
            ,{
            headers:{
                Authorization:token ? `Bearer ${token}` : ""
            }
        }
      );
      // console.log(response.data);
      const { error, message } = response.data;
      // console.log(error,message);
        if (error && message === "SignIn") {
          navigate("/admin-login")
        }
      else if (error) {
        showErrorToast(message);
      } else {
        const { result } = response.data;
        setCategory(result);
        // showSuccessToast(message);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  async function deleteCategory(id) {
    try {
      const token = utilityFunctions.getCookieValue("adminAuthToken");
      const url = Server_URL + "managecategory/" + id;
      const res = await axios.delete(
        url
            ,{
            headers:{
                Authorization:token ? `Bearer ${token}` : ""
            }
        }
      );
      // console.log(res.data)
      const { error, message } = res.data;
        if (error && message === "SignIn") {
          navigate("/admin-login")
        }
      else if (error) {
        // alert("hlooo");
        showErrorToast(message);
      } else {
        showSuccessToast(message);
        getCategory();
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  async function editCategory(id) {
    // console.log(id);
    navigate("/admin/editcategory",{state:{id}})
  }


  useEffect(() => {
    // setFocus('FullName')
    getCategory();
  }, []);

  return (
    <>

<BannerArea data="View Categories"/>
        <div className="services-area pt-100 pb-100">
            <div className="container">
                
                <div className="row " >
                {category.map((x, index) => (
                    
                    <div className="col-lg-4 col-sm-6 col-md-6" key={index}>
<div className="single-blog-card  rounded p-4 shadow-sm" datacue="fadeIn" dataduration="1000">
    <div className="blog-img" style={{ height: '200px', overflow: 'hidden' }}>
            <img src={x.photo? x.photo : '/photo1.png'} alt="category"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
    </div>
        <h2 className="mt-4 text-center">{x.categoryName}</h2>
        <p className="mt-3 text-center">{x.description}</p>
        <div className="mt-3 text-center"><button
                        type="button"
                        onClick={() => deleteCategory(x._id)}
                        className="btn btn-danger  me-5 "
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={() => editCategory(x._id)}
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



        







      {/* <div>
        <table className="table table-dark">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Category Description</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {category.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{value.categoryName}</td>
                  <td>{value.description}</td>

                  <td>
                    {
                      <button
                        type="button"
                        onClick={() => deleteCategory(value._id)}
                        className="btn btn-outline-danger btn-sm me-5"
                      >
                        Delete
                      </button>
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <hr /> */}
    </>
  );
}
