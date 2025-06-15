import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect } from "react";
import { utilityFunctions } from "../../utils/module";
import { showSuccessToast, showErrorToast } from '../../utils/toasthelper';
import { Link, useNavigate } from "react-router-dom";
import { Server_URL } from "../../utils/config";
import BannerArea from "../commonpages/BannerArea";

export default function ViewAllCategory() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  async function ReadCategory() {
    try {
      setLoading(true); 
      const url = Server_URL + "provider/managecategory";
      const response = await axios.get(url);
      const { error, message } = response.data;
      if (error) {
        showErrorToast(message);
      } else {
        const { result } = response.data;
        setCategory(result);
      }
    } catch (error) {
      showErrorToast(error.message);
    } finally {
      setLoading(false); 
    }
  }

  function showSubcategory(id) {
    navigate("/allsubcategory", { state: { id } });
  }

  function learnMore(data) {
    navigate("/categoryDetailPage", { state: { data } });
  }

  useEffect(() => {
    ReadCategory();
  }, []);

  return (
    <>
      <BannerArea data="Services" />
      <div className="services-area pt-100 pb-100">
        <div className="container">
          {loading ? (
           
            <div className="text-center my-5">
              <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row">
              {category.map((x, index) => (
                <div className="col-lg-4 col-sm-6 col-md-6" key={index}>
                  <div className="single-blog-card rounded p-4 shadow-sm" datacue="fadeIn" dataduration="1000">
                    <div className="blog-img" style={{ height: '200px', overflow: 'hidden' }}>
                      <img
                        src={x.photo ? x.photo : '/photo1.png'}
                        alt="category"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <h2 onClick={() => showSubcategory(x._id)} className="mt-4 text-center">
                      <Link>{x.categoryName}</Link>
                    </h2>
                    <p className="mt-3 text-center">{x.description}</p>
                    <p className="mt-3 ms-3">
                      <span
                        onClick={() => learnMore(x)}
                        className="mt-3 learn-more"
                        style={{ cursor: 'pointer' }}
                      >
                        Learn More <i className="flaticon-next"></i>
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
