import axios from "axios";
import { useEffect, useState } from "react";
import { Server_URL } from "../../../utils/config";
import { showSuccessToast, showErrorToast } from "../../../utils/toasthelper";
import { useForm } from "react-hook-form";
import { utilityFunctions } from "../../../utils/module";
import { useNavigate } from "react-router-dom";
import BannerArea from "../../commonpages/AdminBannerArea";

export default function AddSubCategory() {
  const [category, setCategory] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  async function getCategory(params) {
    try {
      const token = utilityFunctions.getCookieValue("adminAuthToken");
      const url = Server_URL + "managecategory";
      const response = await axios.get(url, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      const { error, message } = response.data;
      if (error && message === "SignIn") {
        navigate("/admin-login");
      } else if (error) {
        alert(message);
      } else {
        const { result } = response.data;
        if (result.length === 0) {
          alert("no category");
        } else {
          setCategory(result);
        }
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  async function SubCategory(data) {
    try {
      const token = utilityFunctions.getCookieValue("adminAuthToken");
      const url = Server_URL + "managesubcategory";
      const response = await axios.post(url, data, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      const { error, message } = response.data;
      if (error && message === "SignIn") {
        navigate("/admin-login");
      } else if (error) {
        showErrorToast(message);
      } else {
        showSuccessToast(message);
        reset();
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <BannerArea data="Add Sub-Category" />
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
                      {...register("category", { required: true })}
                      onChange={(e) => {
                        e.target.value = e.target.value
                          .replace(/\s+/g, " ")
                          .trimStart();
                        setValue("category", e.target.value);
                      }}
                    >
                      {errors.category && (
                        <p className="text-danger">This field is required</p>
                      )}
                      <option value="">Please Select Category</option>
                      {category.map((x) => (
                        <option key={x._id} value={x._id}>
                          {x.categoryName}
                        </option>
                      ))}
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
                        e.target.value = e.target.value
                          .replace(/\s+/g, " ")
                          .trimStart();
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
                      {...register("description", { required: true })}
                      onChange={(e) => {
                        e.target.value = e.target.value
                          .replace(/\s+/g, " ")
                          .trimStart();
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
                      {...register("fulldescription", { required: true })}
                      onChange={(e) => {
                        e.target.value = e.target.value
                          .replace(/\s+/g, " ")
                          .trimStart();
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
  );
}
