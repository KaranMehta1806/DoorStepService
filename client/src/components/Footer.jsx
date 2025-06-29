import { Link } from "react-router-dom";
import { Server_URL } from "../utils/config";
import { useEffect, useState } from "react";
import { showErrorToast } from "../utils/toasthelper";
import axios from "axios";

export default function Footer() {
  const [category, setCategory] = useState([]);

  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

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

  useEffect(() => {
    ReadCategory();
  }, []);
  return (
    <>
     

      <div className="footer-area pt-100 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-12 col-md-12">
              <div
                className="footer-widget"
                datacue="fadeIn"
                dataduration="1000"
              >
                <Link to="#">
                  <img
                    src="/HomeAssist8.png"
                    alt="images"
                  />
                </Link>

                <p>
                  Home Assist is your trusted platform for seamless doorstep
                  services, connecting you with professional service providers
                  for all your home needs. From repairs to maintenance, we
                  ensure quality and convenience with hassle-free booking and
                  exceptional support.
                </p>
                <ul className="souile-footer-widget-list">
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
            <div className="col-lg-8">
              <div className="row">
                <div className="col-lg-4 col-sm-6 col-md-4">
                  <div
                    className="footer-widget footer-left-widget"
                    datacue="fadeIn"
                    dataduration="1300"
                  >
                    <h2>Our Services</h2>
                    <ul className="list-widget">
                      {category.slice(0, 5).map((x, index) => (
                        <li key={index}>
                          <Link to="/allcategory" onClick={handleLinkClick}>
                            <i className="bx bx-arrow-back"></i>
                            {x.categoryName}
                          </Link>
                        </li>
                      ))}

                      
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-md-4">
                  <div
                    className="footer-widget footer-left-two-widget"
                    datacue="fadeIn"
                    dataduration="1800"
                  >
                    <h2>Explore</h2>
                    <ul className="list-widget">
                      <li>
                        <Link to="/aboutus" onClick={handleLinkClick}>
                          <i className="bx bx-arrow-back"></i>About Us
                        </Link>
                      </li>
                      <li>
                        <Link to="/contactus" onClick={handleLinkClick}>
                          <i className="bx bx-arrow-back"></i>Contact Us
                        </Link>
                      </li>
                      <li>
                        <Link to="/ourteam" onClick={handleLinkClick}>
                          <i className="bx bx-arrow-back"></i>Our Team
                        </Link>
                      </li>
                      <li>
                        <Link to="/allcategory" onClick={handleLinkClick}>
                          <i className="bx bx-arrow-back"></i>Our Services
                        </Link>
                      </li>
                  
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6 col-md-4">
                  <div
                    className="footer-widget footer-left-three-widget"
                    datacue="fadeIn"
                    dataduration="2200"
                  >
                    <h2>Contact</h2>
                    <div className="widget-contact-list">
                      <div className="notification-icon">
                        <i className="flaticon-phone-call"></i>
                      </div>
                      <Link to="/">+1 (514) 312-5678</Link>
                      <span>
                      <Link to="/">+1 (514) 312-5678</Link>

                      </span>
                    </div>
                    <div className="widget-contact-list bgs-bottom">
                      <div className="notification-icon">
                        <i className="flaticon-email"></i>
                      </div>
                     
                      <Link to="/" >
                        <span
                          className="__cf_email__"
                          data-cfemail="167e737a7a7956747f6e633875797b"
                        >
                     
                          homeassist@gmail.com
                        </span>
                      </Link>
                      <span>
                       
                        <Link to="/">
                          <span
                            className="__cf_email__"
                            data-cfemail="395b50414c4a4c4949564b4d795e54585055175a5654"
                          >
                         
                            homeassisthelp@gmail.com
                          </span>
                        </Link>
                      </span>
                    </div>
                    <div className="widget-contact-list bgs-bottom-12">
                      <div className="notification-icon">
                        <i className="flaticon-pin"></i>
                      </div>
                      <p>28 Benin, South of Niger #, San Francisco, USA</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="footer-shape-1"
          datacue="slideInRight"
          dataduration="3000"
        >
          <img src="/assets/images/footer-shape.png" alt="images" />
        </div>
      </div>

      <div className="copyright-area">
        <div className="container">
          <div className="single-copyright-content">
            <p>
              © Home-Assist is Proudly Owned by{" "}
              <Link to="/">
                Karan
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="go-top">
        <i className="bx bx-chevrons-up"></i>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <button
          type="button"
          className="close-search-btn"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          <i className="bx bx-plus"></i>
        </button>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <form className="search-form">
                <input
                  className="search-input"
                  name="search"
                  placeholder="Search..."
                  type="text"
                />

                <button type="submit" className="search-button">
                  <i className="flaticon-search"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
