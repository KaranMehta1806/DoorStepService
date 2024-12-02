import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { utilityFunctions } from "../../utils/module";
import { showSuccessToast, showErrorToast } from '../../utils/toasthelper';
import { Link } from "react-router-dom";
import { Server_URL, Server_URL2 } from "../../utils/config";
import BannerArea from "../commonpages/BannerArea";
import { useNavigate,useLocation } from "react-router-dom";

export default function ViewProviders(){
    const [providers, setProviders] = useState([]);
  const navigate = useNavigate();

    const location = useLocation();
  const id = location.state?.id;


    async function Readproviders() {
      try {
        console.log(id);
        const url = Server_URL + "manageproviders/"+ id;
        const response = await axios.get(url);
        console.log(response.data);
    
        const { error, message } = response.data;
        if (error) {
          alert(message);
        } else {
          const { result } = response.data;
          console.log(result)
          const activePartners = result.filter(partner => partner.status === "active")
          setProviders(activePartners);
        }
      } catch (error) {
        showErrorToast(error.message);
      }
        
      }

      async function bookProvider(data) {
        navigate("/bookProvider",{state:{data}})
        
      }

      async function learnMore(data) {
        navigate("/bookProvider",{state:{data}})
        
      }
      

      useEffect(() => {
        Readproviders();
      }, []);

    return(
        <>
        <BannerArea data="View- Providers"/>
        <div className="services-area pt-100 pb-100">
            <div className="container">
                
                <div className="row " >
                {providers.map((x, index) => (
                    
                    <div className="col-lg-4 col-sm-6 col-md-6" key={index}>
<div className="single-blog-card rounded p-4 shadow-sm" datacue="fadeIn" dataduration="1000">
    <div className="blog-img" style={{ height: '200px', overflow: 'hidden' }}>
            <img src={x.photo ? (Server_URL2+ x.photo) : '/photo1.png'} alt="provider"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
    </div>
        <h2 className="mt-4 text-center"  onClick={() => bookProvider(x)} style={{ cursor: 'pointer' }}>{x.fullName}</h2>
        <h6 className="mt-3 text-center">Service : {x.categoryInfo}</h6>
        <h6 className="mt-3 text-center">SubService : {x.subCategoryInfo}</h6>
        <p className="mt-3 text-center">Price : {x.price}</p>
        <p  className="mt-3 ms-3">
        <span
                onClick={() => learnMore(x)}
                className="mt-3 learn-more"
                style={{ cursor: 'pointer' }}
              >
                Learn More <i className="flaticon-next"></i>
              </span></p>

</div>
</div>
                    
                
               
            ))}
            </div>
                               
            </div>
        </div>
        </>
    )
}