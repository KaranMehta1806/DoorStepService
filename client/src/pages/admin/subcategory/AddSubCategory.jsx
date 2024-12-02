import axios from "axios"
import { useEffect, useState } from "react"
import { Server_URL } from "../../../utils/config";
import { showSuccessToast, showErrorToast } from '../../../utils/toasthelper';
import { useForm } from "react-hook-form"
import { utilityFunctions } from "../../../utils/module";
import { useNavigate } from "react-router-dom";
import BannerArea from "../../commonpages/AdminBannerArea";

export default function AddSubCategory(){

    const [category,setCategory] = useState([])
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset
    } = useForm();
    const navigate = useNavigate();

    async function getCategory(params) {
        try {
            const token = utilityFunctions.getCookieValue('adminAuthToken')
        const url =Server_URL + 'managecategory'
        const response = await axios.get(url
            ,{
                headers:{
                    Authorization:token ? `Bearer ${token}` : ""
                }
            }
        );
        const {error,message} = response.data;
        if (error && message === "SignIn") {
            navigate("/admin-login")
          }
        else if(error){
            alert(message)
        }
        else{
            const {result} = response.data;
            if(result.length===0){
                alert("no category")
            }
            else{
                setCategory(result);
            }
        }
            
        } catch (error) {
            showErrorToast(error.message);
        }
        
    }

    async function SubCategory(data) {
        try {
            const token = utilityFunctions.getCookieValue('adminAuthToken')
            const url  = Server_URL + "managesubcategory";
            const response = await axios.post(url,data
                ,{
                headers:{
                    Authorization:token ? `Bearer ${token}` : ""
                }
            }
        );
            const {error,message} = response.data;
            if (error && message === "SignIn") {
                navigate("/admin-login")
              }
            else if(error){
                showErrorToast(message)
            }
            else{
                showSuccessToast(message)
            }   
        } catch (error) {

            showErrorToast(error.message);
            
        }
        
    }

    useEffect(() => {
        getCategory();
      }, [])

    return(
        <>
    <BannerArea data="Add Sub-Category"/>

        {/* <div className="container py-5">
        <div className="row">
          <div className="col-md-8 offset-md-2 ">
            <div className="card shadow-lg">
              <div className="card-header bg-dark text-white py-2">
                Add SubCategory
              </div>
              <div className="card-body">
            <form onSubmit={handleSubmit(SubCategory)}>

            <div className="mb-3">
            <label className="form-label">Select Category</label> <br/>
            <select className="form-control" {...register('category', { required: true })}  name="category" id="category">
            {errors.category && <span>First Name is required</span>}
                <option value="">Please Select Category</option>
                {category.map(x =>
                    <option key={x._id} value={x._id}>{x.categoryName}</option>)}
            </select>
            </div>

            <div className="mb-3">
                <label htmlFor="subCategory" className="form-label">SubCategory Name</label>
                
                <input type="text" id="subCategory"  {...register('subcategoryName', { required: true })} className="form-control" placeholder="enter subcategory"/>
                {errors.subcategoryName && <span>Name is required</span>}
            </div>

            <div className="mb-3">
                <label htmlFor="subCategoryDes" className="form-label">SubCategory Description</label>
                
                <textarea {...register('description')} className="form-control shadow" placeholder="enter description" id="subCategoryDes"></textarea>
                {errors.description && <span>Description is required</span>}
            </div>
            <div className="mb-3">
                <label htmlFor="subCategoryFullDes" className="form-label">Full Description</label>
                
                <textarea {...register('fulldescription', { required: true })} className="form-control shadow" rows="4" placeholder="Enter full description" id="subCategoryFullDes"></textarea>
                {errors.fulldescription && <span>Full Description is required</span>}
            </div>

            <button className="btn btn-primary">Add SubCategory</button>
            </form>
            </div>
            </div>
            </div>
            </div>
            </div> */}
            <div className="my-account-area pt-100 pb-70">
  <div className="container">
    <div className="login-form">
      <form
        className="my-account-content"
        onSubmit={handleSubmit(SubCategory)}
      >
        <div className="section-title">
          <h2>Add SubCategory</h2>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="form-group">
              <select
                className="form-control"
                placeholder="Select Category"
                {...register('category', { required: true })}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/\s+/g, ' ').trimStart();
                  setValue("category", e.target.value);
                }}
              >
                {errors.category && (
                  <p className="text-danger">This field is required</p>
                )}
                <option value="">Please Select Category</option>
                {category.map(x => 
                  <option key={x._id} value={x._id}>{x.categoryName}</option>
                )}
              </select>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter SubCategory Name"
                {...register("subcategoryName", { required: true })}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/\s+/g, ' ').trimStart();
                  setValue("subcategoryName", e.target.value);
                }}
              />
              {errors.subcategoryName && (
                <p className="text-danger">This field is required</p>
              )}
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group">
              <textarea
                className="form-control"
                placeholder="Description"
                {...register('description', { required: true })}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/\s+/g, ' ').trimStart();
                  setValue("description", e.target.value);
                }}
              />
              {errors.description && (
                <p className="text-danger">This field is required</p>
              )}
            </div>
          </div>
          <div className="col-lg-12">
            <div className="form-group">
              <textarea
                className="form-control"
                placeholder="Full Description"
                {...register('fulldescription', { required: true })}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/\s+/g, ' ').trimStart();
                  setValue("fulldescription", e.target.value);
                }}
              />
              {errors.fulldescription && (
                <p className="text-danger">This field is required</p>
              )}
            </div>
          </div>
          <div className="col-lg-12">
            <button type="submit" className="default-btn btn-style-fore">
              Add SubCategory
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>

            
        </>
    )

}