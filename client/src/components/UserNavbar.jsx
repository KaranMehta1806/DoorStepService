import { Link } from "react-router-dom";
export default function userNavbar() {
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
                        [email&#160;protected]
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
              <a href="index.html">
                <img
                  src="/assets/images/logo-one.png"
                  className="logo-light"
                  alt="images"
                />
                <img
                  src="/assets/images/logo-two.png"
                  className="logo-dark"
                  alt="images"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="main-nav">
          <div className="container-fluid">
            <nav className="navbar navbar-expand-md navbar-light">
              <a href="index.html">
                <img
                  src="/assets/images/logo-one.png"
                  className="logo-light"
                  alt="images"
                />
                <img
                  src="/assets/images/logo-two.png"
                  className="logo-dark"
                  alt="images"
                />
              </a>

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
                    {/* <a href="contact.html" className="nav-link">
                      DashBoard
                    </a> */}
                    <Link className="nav-link bg-border-top" to="/user/dashboard">
                      DashBoard
                    </Link>
                  </li>

                  <li className="nav-item ">
                    {/* <a href="contact.html" className="nav-link">
                      DashBoard
                    </a> */}
                    <Link className="nav-link bg-border-top" to="/user/profile">
                      Profile
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

                        {/* <a
                          href="about-style-one.html"
                          className="nav-link bg-border-top"
                        >
                          About Style One
                        </a> */}
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link bg-border-2" to="/admin/view-admin">
                          View Admin
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
                  </li>

                  <li className="nav-item nav-item-five">
                    <a href="#" className="nav-link dropdown-toggle">
                      Manage Category
                      <i className="bx bx-chevron-down"></i>
                    </a>

                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link className="nav-link bg-border-top" to="/admin/create-category">
                          Add Category
                        </Link>

                        {/* <a
                          href="about-style-one.html"
                          className="nav-link bg-border-top"
                        >
                          About Style One
                        </a> */}
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link bg-border-2" to="/admin/view-category">
                          View Category
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
                  </li>

                  <li className="nav-item nav-item-five">
                    <a href="#" className="nav-link dropdown-toggle">
                      Manage SubCategory
                      <i className="bx bx-chevron-down"></i>
                    </a>

                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link className="nav-link bg-border-top" to="/admin/create-subcategory">
                          Add SubCategory
                        </Link>

                        {/* <a
                          href="about-style-one.html"
                          className="nav-link bg-border-top"
                        >
                          About Style One
                        </a> */}
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link bg-border-2" to="/admin/view-subcategory">
                          View SubCategory
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
                  </li>



                  <li className="nav-item nav-item-five">
                    <a href="#" className="nav-link dropdown-toggle">
                      Manage State
                      <i className="bx bx-chevron-down"></i>
                    </a>

                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link className="nav-link bg-border-top" to="/admin/add-state">
                          Add State
                        </Link>

                        {/* <a
                          href="about-style-one.html"
                          className="nav-link bg-border-top"
                        >
                          About Style One
                        </a> */}
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link bg-border-2" to="/admin/view-state">
                          View State
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

                        {/* <a
                          href="about-style-one.html"
                          className="nav-link bg-border-top"
                        >
                          About Style One
                        </a> */}
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link bg-border-2" to="/admin/view-city">
                          View City
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
                  </li>

                 

                  

                  

                



                </ul>

                <div className="others-option-vg d-flex align-items-center">
                  

                  
                </div>
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
