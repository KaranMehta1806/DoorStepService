import { Link, useNavigate } from "react-router-dom";
import { utilityFunctions } from "../utils/module";
import "../assets/css/publicnavbar.css"

export default function AdminNavbar() {

  const navigate = useNavigate();

  // const { isServiceProviderAuthenticated, setIsServiceProviderAuthenticated } = useAuth();

  async function logout() {
    utilityFunctions.removeCookie("adminAuthToken");
    // setIsServiceProviderAuthenticated(false);
    navigate("/admin-login");
    
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
                    <a href="tel:+1(514)312-5678">+1 (514) 312-5678</a>
                  </li>
                  <li>
                    <i className="flaticon-email"></i>
                    <a href="https://templates.hibotheme.com/cdn-cgi/l/email-protection#375f525b5b5877555e4f421954585a">
                      <span
                        className="__cf_email__"
                        data-cfemail="19717c757576597b70616c377a7674"
                      >
                        {/* [email&#160;protected] */}
                        homeassist@gmail.com
                      </span>
                    </a>
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
              <Link to="/admin/dashboard">
                <img
                  // src="/assets/images/logo-one.png"
                  src="/HomeAssist7.png"
                  className="logo-light"
                  alt="images"
                />
                <img
                  // src="/assets/images/logo-two.png"
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
              <Link to="/admin/dashboard">
                <img
                  // src="/assets/images/logo-one.png"
                  src="/HomeAssist7.png"
                  className="logo-light"
                  alt="images"
                />
                <img
                  // src="/assets/images/logo-two.png"
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
                  {/* <li className="nav-item nav-item-five">  
                                    <a href="#" className="nav-link dropdown-toggle active">
                                        Home
                                        <i className='bx bx-chevron-down'></i>
                                    </a>
                                    
                                    <ul className="dropdown-menu"> 
                                        <li className="nav-item">
                                            <a href="index.html" className="nav-link bg-border-top active">Cleaning Services</a>        
                                        </li> 
                                        <li className="nav-item">
                                            <a href="index-2.html" className="nav-link">Handyman Plumber</a>       
                                        </li>
                                        <li className="nav-item">
                                            <a href="index-3.html" className="nav-link bg-border-2">Electrician Services</a>     
                                        </li>  
                                    </ul>

                                </li>  */}

                  <li className="nav-item ">
                    <Link className="nav-link bg-border-top" to="/admin/dashboard">
                      DashBoard
                    </Link>
                  </li>

                  <li className="nav-item nav-item-five">
                    <a href="#" className="nav-link dropdown-toggle">
                      ManageAdmin
                      <i className="bx bx-chevron-down"></i>
                    </a>

                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link className="nav-link bg-border-top" to="/admin/create-admin">
                          Create Admin
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link bg-border-2" to="/admin/view-admin">
                          View Admin
                        </Link>
                      </li>
                    </ul>
                  </li>








                  <li className="nav-item nav-item-five">
  <a href="#" className="nav-link dropdown-toggle">
    Manage Categories
    <i className="bx bx-chevron-down"></i>
  </a>

  <ul className="dropdown-menu">
    {/* Category Management Dropdown */}
    <li className="nav-item nav-item-five">
      <a href="#" className="nav-link dropdown-toggle">
        Category Management
      </a>

      <ul className="dropdown-menu">
        <li className="nav-item">
          <Link className="nav-link bg-border-top" to="/admin/create-category">
            Add Category
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link bg-border-2" to="/admin/view-category">
            View Category
          </Link>
        </li>
      </ul>
    </li>

    {/* Subcategory Management Dropdown */}
    <li className="nav-item nav-item-five">
      <a href="#" className="nav-link dropdown-toggle">
        Subcategory Management
        {/* <i className="bx bx-chevron-down"></i> */}
      </a>

      <ul className="dropdown-menu">
        <li className="nav-item">
          <Link className="nav-link bg-border-top" to="/admin/create-subcategory">
            Add SubCategory
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link bg-border-2" to="/admin/view-subcategory">
            View SubCategory
          </Link>
        </li>
      </ul>
    </li>
  </ul>
</li>















<li className="nav-item nav-item-five">
  <a href="#" className="nav-link dropdown-toggle">
    Manage Location
    <i className="bx bx-chevron-down"></i>
  </a>

  <ul className="dropdown-menu">
    {/* Manage State Dropdown */}
    <li className="nav-item nav-item-five">
      <a href="#" className="nav-link dropdown-toggle">
        Manage State
      </a>

      <ul className="dropdown-menu">
        <li className="nav-item">
          <Link className="nav-link bg-border-top" to="/admin/add-state">
            Add State
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link bg-border-2" to="/admin/view-state">
            View State
          </Link>
        </li>
      </ul>
    </li>

    {/* Manage City Dropdown */}
    <li className="nav-item nav-item-five">
      <a href="#" className="nav-link dropdown-toggle">
        Manage City
      </a>

      <ul className="dropdown-menu">
        <li className="nav-item">
          <Link className="nav-link bg-border-top" to="/admin/add-city">
            Add City
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link bg-border-2" to="/admin/view-city">
            View City
          </Link>
        </li>
      </ul>
    </li>
  </ul>
</li>

                  
                  {/* <li className="nav-item nav-item-five">
                    <a href="#" className="nav-link dropdown-toggle">
                      Manage State
                      <i className="bx bx-chevron-down"></i>
                    </a>

                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link className="nav-link bg-border-top" to="/admin/add-state">
                          Add State
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link bg-border-2" to="/admin/view-state">
                          View State
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item nav-item-five">
                    <a href="#" className="nav-link dropdown-toggle">
                      Manage City
                      <i className="bx bx-chevron-down"></i>
                    </a>

                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link className="nav-link bg-border-top" to="/admin/add-city">
                          Add City
                        </Link>

                       
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link bg-border-2" to="/admin/view-city">
                          View City
                        </Link>

                        
                      </li>
                    </ul>
                  </li> */}

                  <li className="nav-item nav-item-five">
                    <a href="#" className="nav-link dropdown-toggle">
                      Bookings
                      <i className="bx bx-chevron-down"></i>
                    </a>

                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link className="nav-link bg-border-top" to="/admin/confirmed">
                          Confirmed
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link bg-border-end " to="/admin/completed">
                          Completed
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link bg-border-2" to="/admin/cancelled">
                          Cancelled
                        </Link>
                      </li>
                     
                     
                    </ul>
                  </li>




















                  <li className="nav-item nav-item-five">
                    <a href="#" className="nav-link dropdown-toggle">
                    User Information
                      <i className="bx bx-chevron-down"></i>
                    </a>

                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link className="nav-link bg-border-top" to="/admin/providerinfo">
                        Provider Info
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link bg-border-2" to="/admin/userinfo">
                        User Info
                        </Link>
                      </li>
                    </ul>
                  </li>


                  <div className="others-option-vg d-flex align-items-center">
                    {/* <div className="option-item">
                                <button type="button" className="search-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
                                    <i className="flaticon-search"></i>
                                </button>
                            </div> */}
                    <div className="option-item">
                      <p className=" navbar-btn" onClick={logout}>
                        <i className="bx bx-arrow-back me-3 "></i>LogOut
                      </p>
                    </div>
                  </div>
                  
                  
                 {/* <li className="nav-item ">
                    <Link className="nav-link bg-border-top" to="/admin/providerinfo">
                      Provider Info
                    </Link>
                  </li>

                  <li className="nav-item ">
                    <Link className="nav-link bg-border-top" to="/admin/userinfo">
                      User Info
                    </Link>
                  </li> */}
                  



                </ul>
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
