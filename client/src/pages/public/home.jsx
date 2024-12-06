import { useState, useEffect } from "react";
import { Server_URL, Server_URL2 } from "../../utils/config";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { showErrorToast } from "../../utils/toasthelper";
import "../../assets/css/rating.css";
// import "../../assets/css/"

export default function publicHome() {


axios.get(`${Server_URL}test-cors`)
  .then(response => {
    console.log(response.data);  // { message: 'CORS is working!' }
  })
  .catch(error => {
    console.error("error occured");
    console.error('Error:', error);
  });
  const [category, setCategory] = useState([]);
  const [providers, setProviders] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  async function ReadCategory() {


    try {
      const url = Server_URL + "provider/managecategory";
      const response = await axios.get(url);
      // console.log(response.data);

      const { error, message } = response.data;
      if (error) {
        showErrorToast(message);
      } else {
        const { result } = response.data;
        // console.log(result)
        setCategory(result);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }
  async function ReadProviders() {
    try {
      const url = Server_URL + "providerinfo";
      const response = await axios.get(url);
      // console.log(response.data);

      const { error, message } = response.data;
      if (error) {
        showErrorToast(message);
      } else {
        const { result } = response.data;
        // console.log(result);
        setProviders(result);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }

  async function ReadFeedback() {
    try {
      const url = Server_URL + "getfeedback";
      const response = await axios.get(url);
      // console.log(response.data);

      const { error, message } = response.data;
      if (error) {
        showErrorToast(message);
      } else {
        const { result } = response.data;
        console.log(result)
        setFeedback(result);
      }
    } catch (error) {
      showErrorToast(error.message);
    }
  }




  async function showSubcategory(id) {
    navigate("/allsubcategory", { state: { id } });
  }
  async function learnMore(data) {
    navigate("/categoryDetailPage", { state: { data } });
  }

  useEffect(() => {
    // ReadCategory()
    //  ReadProviders()
    // ReadFeedback();
  }, []);

  return (
    <>
      <div className="banner-area">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div
                className="single-banner-content"
                // datacue="slideInLeft"
                datacue="slideInLeft"
                // dataduration="1000"
                dataduration="1000"
              >
                <span>Get Amazing Cleaning Services</span>
                <h1>We Are Your Key To Clean</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipi scing elit ut
                  elit tellus luctus nec ullamcorper mattis pulvinar dapibus
                  orem ipsum dolor sit amet consectetur adipi scing adipi scing
                  elit.
                </p>
                {/* <a href="pricing.html" className="default-btn btn-style-one">
                  Our Best Offers
                </a> */}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="single-banner-img">
                <div
                  className="banner-main-img"
                  //   datacue="zoomIn"
                  datacue="zoomIn"
                  //   dataduration="1000"
                  dataduration="1000"
                >
                  <img src="assets/images/banner/banner-img.png" alt="images" />
                </div>
                <div
                  className="banner-img-shape-1"
                  //   datacue="zoomIn"
                  datacue="zoomIn"
                  //   dataduration="1000"
                  dataduration="1000"
                >
                  <img
                    src="assets/images/banner/banner-one-bg-shape-3.png"
                    alt="images"
                  />
                </div>
                <div
                  className="happy-user-card"
                  //   datacue="fadeIn"
                  datacue="fadeIn"
                  //   dataduration="1500"
                  dataduration="1500"
                >
                  <h2>
                    Happy User{" "}
                    <img
                      src="assets/images/banner/happy-user.svg"
                      alt="images"
                    />
                  </h2>
                  <ul>
                    <li>
                      <a href="index.html">
                        <img
                          src="assets/images/banner/happy-user-img-1.png"
                          alt="images"
                        />
                      </a>
                    </li>
                    <li>
                      <a href="index.html">
                        <img
                          src="assets/images/banner/happy-user-img-2.png"
                          alt="images"
                        />
                      </a>
                    </li>
                    <li>
                      <a href="index.html">
                        <img
                          src="assets/images/banner/happy-user-img-3.png"
                          alt="images"
                        />
                      </a>
                    </li>
                    <li>
                      <a href="index.html">
                        <img
                          src="assets/images/banner/happy-user-img-4.png"
                          alt="images"
                        />
                      </a>
                    </li>
                    <li>
                      <a href="index.html">
                        <img
                          src="assets/images/banner/happy-user-img-5.png"
                          alt="images"
                        />
                      </a>
                    </li>
                    {/* <li>
                      <a href="index.html">
                        <i className="flaticon-plus"></i>
                      </a>
                    </li> */}
                  </ul>
                </div>
                <div
                  className="banner-odometer-box"
                  //   datacue="fadeIn"
                  datacue="fadeIn"
                  //   dataduration="2000"
                  dataduration="2000"
                >
                  <div className="travel-odometer">
                    <p>People</p>
                    <h2>
                      <span className="odometer" data-count="100">
                        100
                      </span>
                      <span className="target">+</span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="banner-bg-shape-2">
          <img
            src="assets/images/banner/banner-one-bg-shape-2.png"
            alt="images"
          />
        </div>
      </div>

      <div className="features-area pt-100 pb-70">
        <div className="container">
          <div className="section-title">
            <span className="top-title">Our Features</span>
            <h2>How Can We Help You</h2>
          </div>
          <div className="row justify-content-center">
            <div
              className="col-lg-4 col-sm-6 col-md-6"
              datacue="zoomOut"
              dataduration="1000"
            >
              <div className="single-features-content">
                <img src="assets/images/features-img-1.svg" alt="images" />
                <h3>Cleaning Services</h3>
                <p>
                  Top-notch cleaning services for residential and commercial
                  spaces, offering deep cleaning and regular maintenance for a
                  spotless environment
                </p>
                {/* <a href="about-style-one.html.html" className="default-btn btn-style-two">Read More</a> */}
              </div>
            </div>
            <div
              className="col-lg-4 col-sm-6 col-md-6"
              datacue="zoomOut"
              dataduration="1000"
            >
              <div className="single-features-content">
                <img src="assets/images/features-img-2.svg" alt="images" />
                <h3>Leakage Detection</h3>
                <p>
                  Professional leakage detection services that identify and
                  resolve water-related issues swiftly, preventing property
                  damage and costly repairs..
                </p>
                {/* <a href="about-style-one.html.html" className="default-btn btn-style-two">Read More</a> */}
              </div>
            </div>
            <div
              className="col-lg-4 col-sm-6 col-md-6"
              datacue="zoomOut"
              dataduration="1000"
            >
              <div className="single-features-content">
                <img src="assets/images/features-img-3.svg" alt="images" />
                <h3>Residential Services</h3>
                <p>
                  Comprehensive residential services that cater to all your home
                  maintenance needs, providing reliable solutions for a
                  comfortable living experience.
                </p>
                {/* <a href="about-style-one.html.html" className="default-btn btn-style-two">Read More</a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End Our Features Area --> */}

      {/* <!-- Start About Style One Area --> */}
      <div className="about-style-one-area pt-100 pb-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6" datacue="slideInLeft" dataduration="1500">
              <div className="single-about-img">
                <div className="about-img-one">
                  <img
                    src="assets/images/about/about-style-1-img.png"
                    alt="images"
                  />
                </div>
                <div className="about-shape-1">
                  <img src="assets/images/about/rrrrr.png" alt="images" />
                </div>
              </div>
            </div>
            <div
              className="col-lg-6"
              datacue="slideInRight"
              dataduration="1500"
            >
              <div className="single-about-content">
                <span>About Us</span>
                <h2>We Will Make Absolutely Any Place Clean, Neat</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                  eiusmod temp incididunt ut labore et dolore magna aliqua sed
                  do eiusmod temp sit amet.
                </p>
                <div className="single-about-item">
                  <div className="about-icon bg-color">
                    <i className="flaticon-favorite"></i>
                  </div>
                  <h3>We Provide Qualified & Expert</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit sed
                    do eiusmod temp incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
                <div className="single-about-item">
                  <div className="about-icon">
                    <i className="flaticon-wrench"></i>
                  </div>
                  <h3>Modern Tools & Technology Use</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit sed
                    do eiusmod temp incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
                <Link to="/aboutus" className="default-btn">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="about-style-shape-1">
          <img
            src="assets/images/about/about-style-one-shape-3.png"
            alt="images"
          />
        </div>
      </div>
      {/* <!-- End About Style One Area --> */}

      {/* <!-- Start Our Services area --> */}
      {/* <div className="services-area pt-100 pb-100">
        <div className="container">
          <div className="section-title">
            <span className="top-title">Our Services</span>
            <h2>Professional Cleaning Services</h2>
          </div>
          <div className="row ">
            {category.slice(0, 3).map((x, index) => (
              <div className="col-lg-4 col-sm-6 col-md-6" key={index}>
                <div
                  className="single-blog-card rounded p-4 shadow-sm"
                  datacue="fadeIn"
                  dataduration="1000"
                >
                  <div
                    className="blog-img"
                    style={{ height: "200px", overflow: "hidden" }}
                  >
                    <img
                      src={x.photo ? x.photo : "/photo1.png"}
                      alt="images"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <h2
                    onClick={() => showSubcategory(x._id)}
                    className="mt-4 text-center"
                  >
                    <Link>{x.categoryName}</Link>
                  </h2>
                  <p className="mt-3 text-center">{x.description}</p>
                  <p className="mt-3 ms-3">
                    <span
                      onClick={() => learnMore(x)}
                      className="mt-3 learn-more"
                      style={{ cursor: "pointer" }}
                    >
                      Learn More <i className="flaticon-next"></i>
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="view-all-btn">
            <Link className="default-btn btn-style-one" to="/allcategory">
              View All
            </Link>
          </div>
        </div>
      </div> */}
      {/* <!-- End Our Services area --> */}

      {/* <!-- Start Watch Video Area -->  */}
      <div className="video-watch-area pt-100">
        <div className="container">
          <div className="section-title">
            <span className="top-title">Watch Video</span>
            <h2>We Create the Perfect Shine</h2>
          </div>
          <div className="video-watch-item">
            <img
              src="assets/images/intro-video-img-1.jpg"
              alt="images"
              datacue="zoomIn"
              dataduration="1000"
            />
            <div className="video-play">
              <a
                href="https://www.youtube.com/watch?v=-z-wtyXjFIg"
                className="popup-youtube"
              >
                <img
                  src="assets/images/intro-video-play-icon.svg"
                  alt="images"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End Watch Video Area --> */}

     

     

      {/* <!-- Start Our Team Area --> */}
      {/* <div className="team-area pt-100 pb-100">
        <div className="container">
          <div className="section-title">
            <span className="top-title">Our Team</span>
            <h2>Our cleaning Service Team</h2>
          </div>
          <div className="row">
            {providers.slice(0, 4).map((x, index) => (
              <div className="col-lg-3 col-sm-6 col-md-6" key={index}>
                <div
                  className="single-team-card"
                  datacue="fadeIn"
                  dataduration="1000"
                >
                  <div
                    className="team-img"
                    style={{ height: "200px", overflow: "hidden" }}
                  >
                    <img
                      src={x.photo ? x.photo : "/photo1.png"}
                      alt="category"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="single-team-card-content">
                    <h3>{x.fullName}</h3>
                    <p>{x.subCategoryInfo}</p>

                    <div className="rating">
  {Array.from({ length: 5 }, (_, i) => {
    const rating = x.feedbackRating;
    if (i < Math.floor(rating)) {
      return <i key={i} className="fas fa-star filled-star"></i>;
    } else if (i < rating) {
      return <i key={i} className="fas fa-star-half-alt half-filled-star"></i>;
    } else {
      return <i key={i} className="far fa-star empty-star"></i>;
    }
  })}
  <span className="rating-text">
    ({Number.isInteger(x.feedbackRating) ? x.feedbackRating : x.feedbackRating.toFixed(1)} Star
    {x.feedbackRating > 1 ? "s" : ""})
  </span>
</div>
                    <ul className="team-list">
                      <li>
                        <a href="https://www.facebook.com/" target="_blank">
                          <i className="flaticon-facebook"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://twitter.com/"
                          target="_blank"
                          className="border-twitter"
                        >
                          <i className="flaticon-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.youtube.com/" target="_blank">
                          <i className="flaticon-youtube"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.instagram.com/"
                          target="_blank"
                          className="border-twitter"
                        >
                          <i className="flaticon-instagram"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="view-all-btn">
            <Link to="/ourteam" className="default-btn btn-style-one">
              View All
            </Link>
          </div>
        </div>
      </div> */}
      {/* <!-- End Our Team Area --> */}

      {/* <div className="services-area pt-100 pb-100">
        <div className="container">
          <div className="section-title">
            <h2>Our Top Reviews</h2>
          </div>
          <div className="row ">
          {feedback.slice(0, 3).map((x, index) => (
            <div className="review-card-container" key={index}>
            <div className="review-card shadow-sm">
              <div className="review-card-header d-flex align-items-center mb-3">
                <img
                  src="/photo1.png"
                  alt="images"
                  className="review-user-photo"
                />
                <div className="review-user-info ms-3">
                  <h5 className="user-name">{x.userInfo}</h5>
                  <div
                    className="user-rating starability-result"
                    data-rating="1"
                  ></div>
                </div>
              </div>
              <div className="review-comment mt-2">
                <p className="comment-text">
                  {x.comments}                  
                 </p>
              </div>
            </div>
          </div>
            ))}
          </div>
        </div>
      </div> */}

      

      {/* */}

      {/* <!-- start Partner Area --> */}
      {/* <div className="partner-logo-area pb-100">
            <div className="container">
                <div style={{display:"flex", gap: 100}}>
                    <div className="partner-logo-img">
                        <img src="assets/images/partner/partner-logo-1.png" alt="images"/>
                        <div className="partner-logo-two">
                            <img src="assets/images/partner/partner-logo-6.png" alt="images"/>
                        </div>
                    </div>
                    <div className="partner-logo-img">
                        <img src="assets/images/partner/partner-logo-2.png" alt="images"/>
                        <div className="partner-logo-two">
                            <img src="assets/images/partner/partner-logo-7.png" alt="images"/>
                        </div>
                    </div>
                    <div className="partner-logo-img">
                        <img src="assets/images/partner/partner-logo-3.png" alt="images"/>
                        <div className="partner-logo-two">
                            <img src="assets/images/partner/partner-logo-8.png" alt="images"/>
                        </div>
                    </div>
                    <div className="partner-logo-img">
                        <img src="assets/images/partner/partner-logo-4.png" alt="images"/>
                        <div className="partner-logo-two">
                            <img src="assets/images/partner/partner-logo-9.png" alt="images"/>
                        </div>
                    </div>
                    <div className="partner-logo-img">
                        <img src="assets/images/partner/partner-logo-5.png" alt="images"/>
                        <div className="partner-logo-two">
                            <img src="assets/images/partner/partner-logo-10.png" alt="images"/>
                        </div>
                    </div>
                </div>
            </div>
        </div> */}
      {/* <!-- End Partner Area --> */}
    </>
  );
}

// {/* <div className="testimonials-area pt-100 pb-70">
// <div className="container">
//     <div className="section-title section-title-left">
//         <span className="top-title">Our Testimonial</span>
//         <h2>What People Are Saying!</h2>
//     </div>
//     <div className="testimonials-slider">
//         <div className="single-testimonials-card">
//             <i className="flaticon-quote"></i>
//             <p>At vero eos et accusamus et iusto odio dignissimos ducimus.</p>
//             <div className="testimonials-text">
//                 <a href="testimonials.html">
//                     <img src="assets/images/testimonials/testimonials-img-1.png" alt="images"/>
//                 </a>
//                 <div className="testimonials-bg-content">
//                     <a href="testimonials.html">
//                         <h3>Anthony Dylan</h3>
//                     </a>
//                     <p>Cleaning Expert</p>
//                 </div>
//             </div>
//             <div className="testimonials-shape">
//                 <img src="assets/images/testimonials/testimonials-shape.png" alt="images" />
//             </div>
//         </div>
//         <div className="single-testimonials-card">
//             <i className="flaticon-quote"></i>
//             <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui praesentium voluptatum deleniti atque corrupti quos dolo rese quas moleum stias excepturi sint occaecati cupiditate non provident et odio dignissimos ducimus qui blanditiis.</p>
//             <div className="testimonials-text">
//                 <a href="testimonials.html">
//                     <img src="assets/images/testimonials/testimonials-img-2.png" alt="images" />
//                 </a>
//                 <div className="testimonials-bg-content">
//                     <a href="testimonials.html">
//                         <h3>Sofia Avery</h3>
//                     </a>
//                     <p>Cleaning Expert</p>
//                 </div>
//             </div>
//             <div className="testimonials-shape">
//                 <img src="assets/images/testimonials/testimonials-shape.png" alt="images" />
//             </div>
//         </div>
//         <div className="single-testimonials-card">
//             <i className="flaticon-quote"></i>
//             <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui praesentium voluptatum deleniti atque corrupti quos dolo rese quas moleum stias excepturi sint occaecati cupiditate non provident et odio dignissimos ducimus qui blanditiis.</p>
//             <div className="testimonials-text">
//                 <a href="testimonials.html">
//                     <img src="assets/images/testimonials/testimonials-img-2.png" alt="images" />
//                 </a>
//                 <div className="testimonials-bg-content">
//                     <a href="testimonials.html">
//                         <h3>Sofia Avery</h3>
//                     </a>
//                     <p>Cleaning Expert</p>
//                 </div>
//             </div>
//             <div className="testimonials-shape">
//                 <img src="assets/images/testimonials/testimonials-shape.png" alt="images" />
//             </div>
//         </div>
//         <div className="single-testimonials-card">
//             <i className="flaticon-quote"></i>
//             <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui praesentium voluptatum deleniti atque corrupti quos dolo rese quas moleum stias excepturi sint occaecati cupiditate non provident et odio dignissimos ducimus qui blanditiis.</p>
//             <div className="testimonials-text">
//                 <a href="testimonials.html">
//                     <img src="assets/images/testimonials/testimonials-img-1.png" alt="images"/>
//                 </a>
//                 <div className="testimonials-bg-content">
//                     <a href="testimonials.html">
//                         <h3>Anthony Dylan</h3>
//                     </a>
//                     <p>Cleaning Expert</p>
//                 </div>
//             </div>
//             <div className="testimonials-shape">
//                 <img src="assets/images/testimonials/testimonials-shape.png" alt="images" />
//             </div>
//         </div>

//         </div>
//         {/* <div className="single-testimonials-card">
//             <i className="flaticon-quote"></i>
//             <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui praesentium voluptatum deleniti atque corrupti quos dolo rese quas moleum stias excepturi sint occaecati cupiditate non provident et odio dignissimos ducimus qui blanditiis.</p>
//             <div className="testimonials-text">
//                 <a href="testimonials.html">
//                     <img src="assets/images/testimonials/testimonials-img-2.png" alt="images" />
//                 </a>
//                 <div className="testimonials-bg-content">
//                     <a href="testimonials.html">
//                         <h3>Sofia Avery</h3>
//                     </a>
//                     <p>Cleaning Expert</p>
//                 </div>
//             </div>
//             <div className="testimonials-shape">
//                 <img src="assets/images/testimonials/testimonials-shape.png" alt="images" />
//             </div>
//         </div> */}
//     </div>
// </div> */}
