import { useEffect, useState } from "react";
import BannerArea from "../commonpages/BannerArea";
import { showErrorToast } from "../../utils/toasthelper";
import { Server_URL, Server_URL2 } from "../../utils/config";
import axios from "axios";
import "../../assets/css/rating.css"



export default function OurTeam(){
    const [providers, setProviders] = useState([]);
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

      useEffect(() => {
        ReadProviders()
      }, []);

    return(
        <>
        <BannerArea data="Our Team"/>
        <div className="team-area pt-100 pb-100">
            <div className="container">
                <div className="section-title">
                    <span className="top-title">Our Team</span>
                    <h2>Our cleaning Service Team</h2>
                </div>
                <div className="row">
                {providers.map((x, index) => (
                    <div className="col-lg-3 col-sm-6 col-md-6" key={index}>
                    <div className="single-team-card" datacue="fadeIn" dataduration="1000">
                    <div className="team-img" style={{ height: '200px', overflow: 'hidden' }}>
                            
                            <img src={x.photo? x.photo : '/photo1.png'} alt="category"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                        </div>
                        <div className="single-team-card-content">
                            <h3>{x.fullName}</h3>
                            <p>{x.subCategoryInfo}</p>
                            <div className="rating">
  {Array.from({ length: 5 }, (_, i) => {
    const rating = x.feedbackRating;
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
  {/* Display the rating count with appropriate formatting */}
  <span className="rating-text">
    ({Number.isInteger(x.feedbackRating) ? x.feedbackRating : x.feedbackRating.toFixed(1)} Star
    {x.feedbackRating > 1 ? "s" : ""})
  </span>
</div>

                            {/* <p>{x.subCategoryInfo}</p> */}
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
                </div>
                </div>
        </>
    )
}