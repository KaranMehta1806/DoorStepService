import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { utilityFunctions } from "../../utils/module";
import { showSuccessToast, showErrorToast } from '../../utils/toasthelper';
import { Link } from "react-router-dom";
import { Server_URL, Server_URL2 } from "../../utils/config";
import BannerArea from "../commonpages/BannerArea";
import { useNavigate,useLocation } from "react-router-dom";


export default function providerDetails(){
    const [provider, setProvider] = useState([]);
  const navigate = useNavigate();

    const location = useLocation();
    const data = location.state?.data || {};
    // console.log(data);


    async function ReadProvider() {
        // console.log(data);
        const url = Server_URL + "manageproviders/"+ data._id;
        const response = await axios.get(url);
        // console.log(response.data);
    
        const { error, message } = response.data;
        if (error) {
          alert(message);
        } else {
          const { result } = response.data;

          console.log(result)
            const activePartners = result.filter(partner => partner.status === "active")


          setProvider(activePartners);
        }
      }
    //   async function ProviderPage() {
    //     try {
    //       console.log(id);
    //       const url = Server_URL + "manageproviders/"+ id;
    //       const response = await axios.get(url);
    //       console.log(response.data);
      
    //       const { error, message } = response.data;
    //       if (error) {
    //         alert(message);
    //       } else {
    //         const { result } = response.data;
    //         console.log(result)
    //         const activePartners = result.filter(partner => partner.status === "active")
    //         setProviders(activePartners);
    //       }
    //     } catch (error) {
    //       showErrorToast(error.message);
    //     }
          
    //     }





      async function bookProvider(data) {
        navigate("/bookProvider",{state:{data}})
        
      }
      

      useEffect(() => {
        ReadProvider();
      }, []);

    return(
        <>
        <BannerArea data="Services"/>
        <div className="services-details-area pt-100 pb-100">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="single-services-details-content">
                            <div className="details-img" style={{ height: '30rem', overflow: 'hidden' }}>
                                <img src={data.photo ? (Server_URL2 + data.photo) : '/photo1.png'} alt="images"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}                                
                                />
                            </div>
                            <h2>{data.subCategoryName}</h2>
                            <p>{data.fulldescription}</p>
                            <div className="row">
                                <div className="col-lg-6 col-sm-6 col-md-6">
                                    <div className="single-included-services">
                                        <h3>Included Services</h3>
                                        <ul>
                                            <li>100% Guarantee Cleaning</li>
                                            <li>24/7 Alltime Supporting</li>
                                            <li>Fully Carefull & Safety Guard</li>
                                            <li>Expert Team Members</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-sm-6 col-md-6">
                                    <div className="single-included-services">
                                        <h3>Benifits of services</h3>
                                        <ul>
                                            <li>No Hidden Charges</li>
                                            <li>Special Careness Risk Free</li>
                                            <li>Quality Standards</li>
                                            <li>15+ Years Experiences</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* <p>Lorem ipsum dolor sit amet consectetur adipiscing elit morbi mattis urna bibendum ornare malesuada fusce semper auctor nibh vitae feugiat nunc ut orci congue lobortis mauris eget venenatis metus in hac habitasse plat
                            dictumst donec eleifend feugiat nisi quis pulvinar nam nec metus vel lorem feugiat.</p> */}
                            {/* <h4>We Give The Best Services</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit morbi mattis urna bibendum ornare malesuada fusce semper auctor nibh vitae feugiat nunc ut orci congue lobortis mauris eget venenatis metus in hac habitasse plat
                            dictumst donec eleifend feugiat nisi quis pulvinar nam nec metus vel lorem feugiat pretium in hac habitasse 
                            platea dictumst aenean feugiat velit a vehicula pharetra.</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit morbi mattis urna bibendum ornare malesuada fusce semper auctor nibh vitae feugiat nunc ut orci congue lobortis mauris eget venenatis metus.</p> */}
                            {/* <div className="row">
                                <div className="col-lg-6 col-sm-6 col-md-6">
                                    <div className="services-details-img-two">
                                        <img src="assets/images/services/services-details-img-2.jpg" alt="images"/>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-sm-6 col-md-6">
                                    <div className="services-details-img-two">
                                        <img src="assets/images/services/services-details-img-3.jpg" alt="images"/>
                                    </div>
                                </div>
                            </div> */}
                            {/* <h4>Brief Description Of Sevices</h4>
                            <p>Lorem ipsum dolor sit amet consectetur adipiscing elit morbi mattis urna bibendum ornare malesuada fusce semper auctor nibh vitae feugiat nunc ut orci congue lobortis mauris eget venenatis metus in hac habitasse plat
                            dictumst donec eleifend feugiat nisi quis pulvinar nam nec metus vel lorem feugiat.</p> */}
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="single-services-detalis-right">
                            {/* <div className="services-details-search">
                                <h2>Search</h2>
                                <form className="search-form">
                                    <input type="text" className="form-control" placeholder="Search" name="search"/>
                                    <button type="submit" className="default-btn btn-style-three">
                                        <i className='bx bx-search'></i>
                                    </button>
                                </form>
                            </div> */}
                            <div className="services-house-cleaning-card">
                                <h2>Service Provider</h2>
                                <ul>
                                {provider.map((x, index) => (
                                    
                                    <li key={index}>
                                    {/* <a href="services-details.html">
                                        {x.fullName} <i className='bx bx-arrow-back'></i>
                                    </a> */}
                                    <p
                          style={{ padding: "15px", cursor: "pointer" }}
                          onClick={() => bookProvider(x)}
                        >
                          <span
                            className="learn-more"
                            style={{ cursor: "pointer" }}
                          >
                             {x.fullName}
                          </span>
                          <i className="bx bx-arrow-back"></i>
                        </p>
                                    </li>
                                ))}
                                </ul>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        </>
    )
}

