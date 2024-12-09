import { useState, useEffect} from "react";
import { Server_URL, Server_URL2 } from "../../utils/config";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate,useLocation } from "react-router-dom";
import BannerArea from "../commonpages/BannerArea";
import { showErrorToast } from "../../utils/toasthelper";
import "../public/home.css"



export default function AboutUs() {
    const [category, setCategory] = useState([]);
    const [providers, setProviders] = useState([]);
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
                  console.log(result)
                  setProviders(result);
                }
                
            } catch (error) {
                showErrorToast(error.message);
            }
           
          }
       
      
      async function showSubcategory(id) {
        navigate("/allsubcategory",{state:{id}})
        
      }
      async function learnMore(data) {
        navigate("/categoryDetailPage",{state:{data}})
        
      }

      useEffect(() => {
        ReadCategory(),
        ReadProviders()
      }, []);


  return (
    <>
      <BannerArea data="About Us"/>
      



      <div className="features-area pt-100 pb-70">
            <div className="container">
                <div className="section-title">
                    <span className="top-title">Our Features</span>
                    <h2>How Can We Help You</h2>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-sm-6 col-md-6" datacue="zoomOut" dataduration="1000">
                        <div className="single-features-content">
                            <img src="assets/images/features-img-1.svg" alt="images"/>
                            <h3>Cleaning Services</h3>
                            <p>Top-notch cleaning services for residential and commercial spaces, offering deep cleaning and regular maintenance for a spotless environment</p>
                            {/* <a href="about-style-one.html.html" className="default-btn btn-style-two">Read More</a> */}
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6 col-md-6" datacue="zoomOut" dataduration="1000">
                        <div className="single-features-content">
                            <img src="assets/images/features-img-2.svg" alt="images" />
                            <h3>Leakage Detection</h3>
                            <p>Professional leakage detection services that identify and resolve water-related issues swiftly, preventing property damage and costly repairs..</p>
                            {/* <a href="about-style-one.html.html" className="default-btn btn-style-two">Read More</a> */}
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6 col-md-6" datacue="zoomOut" dataduration="1000">
                        <div className="single-features-content">
                            <img src="assets/images/features-img-3.svg" alt="images" />
                            <h3>Residential Services</h3>
                            <p>Comprehensive residential services that cater to all your home maintenance needs, providing reliable solutions for a comfortable living experience.</p>
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
                                <img src="assets/images/about/about-style-1-img.png" alt="images" />
                            </div>
                            <div className="about-shape-1">
                                <img src="assets/images/about/rrrrr.png" alt="images" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6" datacue="slideInRight" dataduration="1500">
                        <div className="single-about-content">
                            <span>About Us</span>
                            <h2>We Will Make Absolutely Any Place Clean, Neat</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod temp incididunt ut labore et dolore magna aliqua sed do eiusmod temp sit amet.</p>
                            <div className="single-about-item">
                                <div className="about-icon bg-color">
                                    <i className="flaticon-favorite"></i>
                                </div>
                                <h3>We Provide Qualified & Expert</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod temp incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                            <div className="single-about-item">
                                <div className="about-icon">
                                    <i className="flaticon-wrench"></i>
                                </div>
                                <h3>Modern Tools & Technology Use</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod temp incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                            {/* <a href="about-style-one.html" className="default-btn">Learn More</a> */}
                        </div>
                    </div>
                </div>  
            </div>
            <div className="about-style-shape-1">
                <img src="assets/images/about/about-style-one-shape-3.png" alt="images" />
            </div>
        </div>
        {/* <!-- End About Style One Area --> */}


        {/* <!-- Start Watch Video Area -->  */}
        <div className="video-watch-area pt-100">
            <div className="container">
                <div className="section-title">
                    <span className="top-title">Watch Video</span>
                    <h2>We Create the Perfect Shine</h2>
                </div>
                <div className="video-watch-item">
                    <img src="assets/images/intro-video-img-1.jpg" alt="images" datacue="zoomIn" dataduration="1000" />
                    <div className="video-play">
                        <a href="https://www.youtube.com/watch?v=-z-wtyXjFIg" className="popup-youtube">
                            <img src="assets/images/intro-video-play-icon.svg" alt="images" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
       

        <div className="how-works-area pt-100 pb-70">
            <div className="container">
                <div className="section-title">
                    <span className="top-title top-title-three"><i className="flaticon-flash"></i>HOW WE WORK</span>
                    <h2>Our Working Process</h2>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-sm-6 col-sm-4" datacue="zoomIn" dataduration="1000">
                        <div className="how-work-content">
                            <div className="works-icon">
                                <i className="flaticon-guru"></i>
                            </div>
                            <h3><b>01.</b>Select Our Service</h3>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6 col-sm-4" datacue="zoomIn" dataduration="1500">
                        <div className="how-work-content">
                            <div className="works-icon">
                                <i className="flaticon-planning"></i>
                            </div>
                            <h3><b>02.</b>Select Our ServiceProviders</h3>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-6 col-sm-4" datacue="zoomIn" dataduration="2000">
                        <div className="how-work-content">
                            <div className="works-icon">
                                <i className="flaticon-click"></i>
                            </div>
                            <h3><b>03.</b>Book a Service</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="how-work-shape-1">
                <img src="assets/images/how-works-shape-2.png" alt="images" />
            </div>
            <div className="how-work-shape-2">
                <img src="assets/images/how-works-shape-3.png" alt="images"/>
            </div>
            <div className="how-work-shape-3"> 
                <img src="assets/images/how-works-shape-1.png" alt="images" />
            </div>
        </div>

        <div className="find-electrician-area pt-100 pb-100">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-8">
                        <div className="single-find-electrician-content">
                            <div className="section-title section-title-left">
                                <span className="top-title top-title-three"><i className="flaticon-flash"></i>FIND SERVICE-PROVIDER</span>
                                <h2>Need To Find A Reliable Service Provider</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="find-electrician-btn">
                            <Link to="/contactus" className="default-btn btn-style-fore">Contact Us</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* <!-- Start Our Team Area --> */}
        <div className="our-team-three-area pt-100 pb-100">
            <div className="container">
                <div className="section-title">
                    <span className="top-title">Our Team</span>
                    <h2>Our cleaning Service Team</h2>
                </div>
                <div className="row">
                {(providers.slice(0, 4)).map((x, index) => (
                    <div className="col-lg-3 col-sm-6 col-md-6" key={index}>
                    <div className="single-team-card" datacue="fadeIn" dataduration="1000">
                    <div className="team-img" style={{ height: '200px', overflow: 'hidden' }}>
                            
                            <img src={x.photo ? x.photo : '/photo1.png'} alt="images"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                                
                            </div>
                        <div className="single-team-card-content">
                            <h3>{x.fullName}</h3>
                            <p>{x.subCategoryInfo}</p>
                            <ul className="team-list">
                                <li>
                                    <a href="https://www.facebook.com/" target="_blank"> 
                                        <i className="flaticon-facebook"></i>
                                    </a>
                                </li>   
                                <li>
                                    <a href="https://twitter.com/" target="_blank" className="border-twitter">
                                        <i className="flaticon-twitter"></i>
                                    </a>
                                </li>    
                                <li> 
                                    <a href="https://www.youtube.com/" target="_blank">
                                        <i className="flaticon-youtube"></i>
                                    </a>  
                                </li> 
                                <li>
                                    <a href="https://www.instagram.com/" target="_blank" className="border-twitter">
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
                    <Link to="/ourteam" className="default-btn btn-style-one">View All</Link>
                </div>
            </div>
        </div>

        






       
       













    </>
  );
}


