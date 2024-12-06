import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../pages/commonpages/AuthContext";
import { showSuccessToast } from "../utils/toasthelper";
import { utilityFunctions } from "../utils/module";
import "../assets/css/publicnavbar.css"
export default function PublicNavbar() {
  const navigate = useNavigate();

  const { isAuthenticated, setIsAuthenticated } = useAuth();

  async function logout() {
    utilityFunctions.removeCookie("userAuthToken");
    navigate("/")
    setIsAuthenticated(false);
  }

  return (
    <>
      <div className="header-area">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="single-header-left-content">
                <ul>
                  <li>
                    <i className="flaticon-phone-call"></i>
                    <Link to="#">+1 (514) 312-5678</Link>
                  </li>
                  <li>
                    <i className="flaticon-email"></i>
                    <Link to="#">
                      <span
                        className="__cf_email__"
                        data-cfemail="19717c757576597b70616c377a7674"
                      >
                        {/* [email&#160;protected] */}
                        homeassist@gmail.com
                      </span>
                    </Link>
                  </li>
                  <li>
                    <i className="flaticon-pin"></i>
                    {/* New York, United States, NY, 10005 */}
                    India, Punjab, Amritsar
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="single-header-right-list">
                <ul>
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
        </div>
        <div className="header-shape-1">
          <img src="/assets/images/topbar-shape-1.png" alt="images" />
        </div>
        <div className="header-shape-2">
          <img src="/assets/images/topbar-shape-2.png" alt="images" />
        </div>
      </div>

      <div className="navbar-area">
        <div className="container">
          <div className="mobile-nav">
            <div className="logo">
              <Link to="/">
                <img
                  // src="/assets/images/logo-one.png"
                  src="/HomeAssist7.png"
                  className="logo-light"
                  alt="images"
                />
                <img
                  src="/HomeAssist7.png"
                  className="logo-dark"
                  alt="images"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="main-nav">
          <div className="container-fluid">
            <nav className="navbar navbar-expand-md navbar-light">
              <Link to="/">
                <img
                  src="/HomeAssist7.png"
                  // src="/assets/images/logo-one.png"
                  className="logo-light"
                  alt="images"
                />
                <img
                  src="/HomeAssist7.png"
                  className="logo-dark"
                  alt="images"
                />
              </Link>

              <div
                className="collapse navbar-collapse mean-menu"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item ">
                    {/* <a href="contact.html" className="nav-link">
                      DashBoard
                    </a> */}
                    <Link className="nav-link bg-border-top" to="/">
                      Home
                    </Link>
                  </li>

                  <li className="nav-item ">
                    {/* <a href="contact.html" className="nav-link">
                      DashBoard
                    </a> */}
                    <Link className="nav-link bg-border-top" to="/aboutus">
                      About Us
                    </Link>
                  </li>


                  {isAuthenticated ? null : <li className="nav-item nav-item-five">
                    <a href="#" className="nav-link dropdown-toggle">
                      Service Provider
                      <i className="bx bx-chevron-down"></i>
                    </a>

                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link
                          className="nav-link bg-border-top"
                          to="/serviceprovider"
                        >
                          Create Account
                        </Link>

                        {/* <a
                          href="about-style-one.html"
                          className="nav-link bg-border-top"
                        >
                          About Style One
                        </a> */}
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link bg-border-2"
                          to="/serviceprovider/login"
                        >
                          Sign In
                        </Link>

                        {/* <a href="about-style-two.html" className="nav-link">
                          About Style Two
                        </a> */}
                      </li>
                      {/* <li className="nav-item">
                        <a
                          href="about-style-three.html"
                          className="nav-link bg-border-2"
                        >
                          About Style Three
                        </a>
                      </li> */}
                    </ul>
                  </li> }

                 

                  {/* {isAuthenticated ? null : (
                    <li className="nav-item nav-item-five">
                      <a href="#" className="nav-link dropdown-toggle">
                        User
                        <i className="bx bx-chevron-down"></i>
                      </a>

                      <ul className="dropdown-menu">
                        <li className="nav-item">
                          <Link
                            className="nav-link bg-border-top"
                            to="/user/registeruser"
                          >
                            Create Account
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link bg-border-2"
                            to="/user-login"
                          >
                            Sign In
                          </Link>
                        </li>
                      </ul>
                    </li>
                  )} */}

                  {/* <li className="nav-item nav-item-five">
                    <a href="#" className="nav-link dropdown-toggle">
                      Portfolio
                      <i className="bx bx-chevron-down"></i>
                    </a>

                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <a
                          href="portfolio.html"
                          className="nav-link bg-border-top"
                        >
                          Our Portfolio
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="portfolio-details.html"
                          className="nav-link bg-border-2"
                        >
                          Portfolio Details
                        </a>
                      </li>
                    </ul>
                  </li> */}

                  {/* <li className="nav-item nav-item-five">
                    <a href="#" className="nav-link dropdown-toggle">
                      Pages
                      <i className="bx bx-chevron-down"></i>
                    </a>

                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <a href="team.html" className="nav-link bg-border-top">
                          Team
                        </a>
                      </li>

                      <li className="nav-item">
                        <a href="faq.html" className="nav-link">
                          FAQ
                        </a>
                      </li>

                      <li className="nav-item">
                        <a href="testimonials.html" className="nav-link">
                          Testimonials
                        </a>
                      </li>

                      <li className="nav-item">
                        <a href="pricing.html" className="nav-link">
                          Our Pricing
                        </a>
                      </li>

                      <li className="nav-item">
                        <a href="#" className="nav-link dropdown-toggle">
                          User
                          <i className="bx bx-chevron-down"></i>
                        </a>

                        <ul className="dropdown-menu">
                          <li className="nav-item">
                            <a
                              href="my-account.html"
                              className="nav-link bg-border-top"
                            >
                              My Account
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="login.html" className="nav-link">
                              Login
                            </a>
                          </li>
                          <li className="nav-item">
                            <a href="register.html" className="nav-link">
                              Register
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="forgot-password.html"
                              className="nav-link bg-border-2"
                            >
                              Forgot Password
                            </a>
                          </li>
                        </ul>
                      </li>

                      <li className="nav-item">
                        <a href="terms-conditions.html" className="nav-link">
                          Terms & Conditions
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="privacy-policy.html" className="nav-link">
                          Privacy Policy
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="error.html" className="nav-link">
                          Error
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="coming-soon.html"
                          className="nav-link bg-border-2"
                        >
                          Coming Soon
                        </a>
                      </li>
                    </ul>
                  </li> */}

                  {/* <li className="nav-item nav-item-five">
                    <a href="#" className="nav-link dropdown-toggle">
                      Blog
                      <i className="bx bx-chevron-down"></i>
                    </a>

                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <a href="blog.html" className="nav-link bg-border-top">
                          Blog
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          href="blog-details.html"
                          className="nav-link bg-border-2"
                        >
                          Blog Details
                        </a>
                      </li>
                    </ul>
                  </li> */}

                   <li className="nav-item ">
                    {/* <a href="contact.html" className="nav-link">
                      DashBoard
                    </a> */}
                    <Link className="nav-link bg-border-top" to="/contactus">
                      Contact Us
                    </Link>
                  </li>

                  {/* <li className="nav-item">
                    <a href="contact.html" className="nav-link">
                      Contact Us
                    </a>
                  </li> */}

                  {isAuthenticated ? (
                    <li className="nav-item ">
                      {/* <a href="contact.html" className="nav-link">
                      DashBoard
                    </a> */}
                      <Link
                        className="nav-link bg-border-top"
                        to="/user/myorder"
                      >
                        My Order
                      </Link>
                    </li>
                  ) : null}


                  {isAuthenticated ? <>
                    <li className="nav-item nav-item-five">
                    <a href="#" className="nav-link dropdown-toggle">
                    Settings
                      <i className="bx bx-chevron-down"></i>
                    </a>

                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link className="nav-link bg-border-top" to="/user/profile">
                        UserProfile
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link bg-border-2" to="/user/changepass">
                        Change Password
                        </Link>
                      </li>
                    </ul>
                  </li>
                  
                  
                  </> : null}

                  {/* {isAuthenticated ? (
                    <li className="nav-item ">
                      <Link
                        className="nav-link bg-border-top"
                        to="/user/profile"
                      >
                        UserProfile
                      </Link>
                    </li>
                  ) : null} */}




                </ul>

                {isAuthenticated ? (
                  <div className="others-option-vg d-flex align-items-center">
                    {/* <div className="option-item">
                                <button type="button" className="search-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
                                    <i className="flaticon-search"></i>
                                </button>
                            </div> */}
                    <div className="option-item">
                      <p className=" navbar-btn" onClick={logout}>
                        <i className="bx bx-arrow-back me-3 "></i>Log-Out
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="others-option-vg d-flex align-items-center me-3">
                      <Link
                        className="nav-link bg-border-top  navbar-btn"
                        to="/user/registeruser"
                      >
                        Register
                      </Link>
                    </div>
                    <div className="option-item">
                      <Link
                        className="nav-link bg-border-2 navbar-btn"
                        to="/user-login"
                      >
                        Sign In
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </nav>
          </div>
        </div>

        <div className="others-option-for-responsive">
          <div className="container">
            <div className="dot-menu">
              <div className="inner">
                <div className="circle circle-one"></div>
                <div className="circle circle-two"></div>
                <div className="circle circle-three"></div>
              </div>
            </div>

            <div className="container">
              <div className="option-inner">
                <div className="others-option justify-content-center d-flex align-items-center">
                  <div className="option-item">
                    <button
                      type="button"
                      className="search-btn"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      data-bs-whatever="@mdo"
                    >
                      <i className="flaticon-search"></i>
                    </button>
                  </div>

                  <div className="option-item">
                    <a href="contact.html" className="default-btn">
                      Get Free Estimate
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
