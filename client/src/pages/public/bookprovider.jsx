import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { utilityFunctions } from "../../utils/module";
import { showSuccessToast, showErrorToast } from "../../utils/toasthelper";
import { Link } from "react-router-dom";
import { Server_URL, Server_URL2 } from "../../utils/config";
import BannerArea from "../commonpages/BannerArea";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../commonpages/AuthContext";
import "../../assets/css/bookprovider.css"
// import "../../assets/css/rating.css";


export default function BookProvider() {
  const [minDate, setMinDate] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
    setValue,
    getValues,
  } = useForm();


//   const [provider, setProvider] = useState([]);
const [feedback, setFeedback] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.data || {};
  console.log(data);
  const { isAuthenticated } = useAuth();

  

  

  

  function ShowBookingForm(providerData) {
    // console.log(provider_id)
    const userAuthToken = utilityFunctions.getCookieValue("userAuthToken");
    if (isAuthenticated) {
      navigate("/user/booking", { state: { providerData } });
      // Navigate to the next page or perform other actions
    } else {
      navigate("/user-login");
    }
  }

  async function ReadFeedback() {
    try {
      const url = Server_URL + `getParticularFeedback/${data._id}`;
      const response = await axios.get(url);
      // console.log(response.data);

      const { error, message } = response.data;
      if (error) {
        showErrorToast(message);
      } else {
        const { result } = response.data;
        // console.log(result)
        setFeedback(result);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

 

 

  

  useEffect(() => {
    ReadFeedback();
  }, []);

  return (
    <>
      <BannerArea data="Provider Details" />
      {/* <div className="portfolio-details-area pt-100 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="single-portfolio-details-content">
                <div className="portfolio-details-img" style={{ height: '35rem'}}>
                  <img
                    src={data.photo? (`${Server_URL2}${data.photo}`) : '/photo1.png'} alt="category"
                    style={{ width: '100%', height: '100%' }} 
                    
                  />
                </div>
                <div className="portfolio-text">
                  <div className="row">
                    <div className="col-lg-3 col-sm-6 col-md-6">
                      <div className="portfolio-category-item">
                        <p>Provider Name :</p>
                        <h5>{data.fullName}</h5>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-md-6">
                      <div className="portfolio-category-item">
                        <p>Category :</p>
                        <h5>{data.categoryInfo}</h5>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-md-6">
                      <div className="portfolio-category-item">
                        <p>SubCategory :</p>
                        <h5>{data.subCategoryInfo}</h5>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-md-6">
                      <div className="portfolio-category-item">
                        <p>Date :</p>
                        <div className="form-group">
                          <div className="input-group date" id="datetimepicker">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="22-6-2024"
                            />
                            <span className="input-group-addon"></span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-sm-6 col-md-6">
                      <div className="portfolio-category-item portfolio-category102">
                        <p>Price :</p>
                        <h5>{data.price}/hrs</h5>
                      </div>
                    </div>
                  </div>
                </div>
                <h2>About The Project</h2>
                <p>
                  Home Assist is your go-to platform for home services like
                  cleaning, plumbing, and repairs. Easily book appointments with
                  flexible time slots and clear pricing. Verified experts ensure
                  quality and reliability for every job. Get real-time updates
                  and hassle-free service. Simplify your home maintenance with
                  trusted professionals and enjoy a worry-free experience. Your
                  comfort and satisfaction are our top priorities at Home
                  Assist, making home care easy and convenient for everyone.
                </p>
                <p>
                  Home Assist is your trusted partner for a wide range of home
                  services, including cleaning, plumbing, and electrical
                  repairs. With a user-friendly interface and reliable
                  professionals, we ensure quick and efficient solutions for all
                  your household needs. Experience hassle-free booking and
                  quality service, right at your doorstep.
                </p>

                <div className="row">
                  <div className="col-lg-6 col-sm-6 col-md-6">
                    <div className="portfolio-bgds-img">
                      <img
                        src="assets/images/portfolio/portfolio-details-img-2.jpg"
                        alt="images"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-sm-6 col-md-6">
                    <div className="portfolio-bgds-img">
                      <img
                        src="assets/images/portfolio/portfolio-details-img-3.jpg"
                        alt="images"
                      />
                    </div>
                  </div>
                </div>
                <h2>{data.subCategoryInfo}</h2>
                <p>{data.subCategoryFullDescription}</p>
                <button
                  className="btn d-block w-100 full-width-button"
                  onClick={() => ShowBookingForm(data)}
                >
                  Book
                </button>
               
              </div>
            </div>
           
          </div>
        </div>
      </div> */}






<div className="provider-detail-container">
  <div className="custom-card">
    {/* Provider Header */}
    <div className="custom-card-body provider-header">
      <div className="provider-info">
        <img
          src={data.photo ? data.photo : '/photo1.png'}
          alt="Provider"
          className="provider-photo"
        />
        <div className="provider-text">
          <h2 className="provider-name">{data.fullName}</h2>
          <p className="provider-bio">Experienced in {data.subCategoryInfo}</p>
          <div className="provider-location">
            <i className="bi bi-geo-alt"></i> {data.cityInfo}, {data.stateInfo}
          </div>
        </div>
      </div>
    </div>

    {/* Subcategory Description */}
    <div className="custom-card-body subcategory-description">
      <h4>{data.subCategoryInfo}</h4>
      <p>{data.subCategoryFullDescription}</p>
    </div>

    {/* Rating Section */}
    <div className="custom-card-body rating-section row">
      <div className="col-md-4">
        <div className="rating-card">
          <h5>Overall Rating</h5>
          <p className="rating-value">{data.feedbackRating}/5</p>
          <div className="rating-stars">
  {Array.from({ length: 5 }, (_, i) => {
    const rating = data.feedbackRating;
    if (i < Math.floor(rating)) {
      // Full star
      return <i key={i} className="fas fa-star filled-star"></i>;
    } else if (i < rating) {
      // Half star
      return <i key={i} className="fas fa-star-half-alt half-filled-star"></i>;
    } else {
      // Empty star
      return <i key={i} className="far fa-star empty-star"></i>;
    }
  })}
</div>

        </div>
      </div>
      <div className="col-md-4">
        <div className="rating-card">
          <h5>Customer Reviews</h5>
          <p className="rating-value">{data.totalReviews}+</p>
        </div>
      </div>
      <div className="col-md-4">
        <div className="rating-card">
          <h5>Price</h5>
          <p className="price-value">${data.price}/hr</p>
        </div>
      </div>
    </div>

    {/* Book Service Button */}
    <div className="custom-card-footer">
      <button onClick={() => ShowBookingForm(data)} className="book-btn">
        Book Service
      </button>
    </div>

    {/* Feedback Section */}
    {/* Feedback Section */}
{feedback.length > 0 && (
  <div className="custom-card-body feedback-section">
    <h4>Customer Feedback</h4>
    <div id="feedbackCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {feedback.map((x, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <div className="review-card">
              <div className="review-card-header">
                <img
                  src="/photo1.png"
                  alt="User"
                  className="review-user-photo"
                />
                <div className="review-user-info">
                  <h5 className="user-name">{x.userInfo}</h5>
                </div>
              </div>
              <div className="review-comment">
                <p>"{x.comments}"</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#feedbackCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#feedbackCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  </div>
)}

  </div>
</div>





    </>
  );
}
