import { useForm } from "react-hook-form";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { utilityFunctions } from "../../utils/module";
import { showSuccessToast, showErrorToast } from '../../utils/toasthelper';
import { Link } from "react-router-dom";
import { Server_URL, Server_URL2 } from "../../utils/config";
import BannerArea from "../commonpages/BannerArea";
import { useNavigate } from "react-router-dom";


export default function ViewAllCategory(){
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();


    async function ReadCategory() {
        const url = Server_URL + "provider/managecategory";
        const response = await axios.get(url);
        // console.log(response.data);
    
        const { error, message } = response.data;
        if (error) {
          alert(message);
        } else {
          const { result } = response.data;
          // console.log(result)
          setCategory(result);
        }
      }

      async function showSubcategory(id) {
        navigate("/allsubcategory",{state:{id}})
        
      }
      async function learnMore(data) {
        navigate("/categoryDetailPage",{state:{data}})
        
      }

      useEffect(() => {
        ReadCategory();
      }, []);

    return(
        <>
        <BannerArea data="Services"/>
        <div className="services-area pt-100 pb-100">
        {/* <div className="portfolio-page-area pt-100 pb-100"> */}
            <div className="container">
                
                <div className="row " >
                {category.map((x, index) => (
              //     <div className="col-lg-4 col-md-6" datacue="fadeIn" dataduration="1000">
              //     <div className="single-portfolio-item">
              //         <div className="portfolio-img">
              //             <Link>
              //                 <img src={x.photo ? (Server_URL2 + x.photo) : '/photo1.png'} alt="images"/>
              //             </Link>
              //         </div>
              //         <div className="portfolio-content">
              //             <p onClick={() => showSubcategory(x._id)}><Link>{x.categoryName}</Link></p>
              //             <a href="portfolio-details.html">
              //                 <h2>{x.description}</h2>
              //             </a>
              //             {/* <a href="portfolio-details.html" class="learn-more">Learn More <i class="flaticon-next"></i></a> */}
              //         </div>
              //     </div>
              // </div>
                    
//                     <div className="col-lg-4 col-sm-6 col-md-6" key={index}>
// <div className="single-blog-card" datacue="fadeIn" dataduration="1000">
//     <div className="blog-img">
//             <img src={x.photo ? (Server_URL2 + x.photo) : '/photo1.png'} alt="images" />
//     </div>
//         <h2 onClick={() => showSubcategory(x._id)} className="mt-4 text-center"><Link>{x.categoryName}</Link></h2>
//         <p className="mt-3 text-center">{x.description}</p>
// </div>
// </div>

<div className="col-lg-4 col-sm-6 col-md-6" key={index}>
<div className="single-blog-card  rounded p-4 shadow-sm" datacue="fadeIn" dataduration="1000">
    <div className="blog-img" style={{ height: '200px', overflow: 'hidden' }}>
            <img src={x.photo ? (Server_URL2 + x.photo) : '/photo1.png'} alt="category"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
    </div>
        <h2 onClick={() => showSubcategory(x._id)} className="mt-4 text-center"><Link>{x.categoryName}</Link></h2>
        <p className="mt-3 text-center">{x.description}</p>
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