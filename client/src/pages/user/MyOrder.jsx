import { useEffect, useState } from "react";
import { showErrorToast } from "../../utils/toasthelper";
import { utilityFunctions } from "../../utils/module";
import { Server_URL, Server_URL2 } from "../../utils/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MyOrder(){
    const navigate = useNavigate();
    
    const [booking, setBooking] = useState([]);


    async function getOrders() {
        try {
            const token = utilityFunctions.getCookieValue('userAuthToken')
          const url = Server_URL + "userbookingdata";
          const response = await axios.get(
            url
                ,{
                headers:{
                    Authorization:token ? `Bearer ${token}` : ""
                }
            }
          );
          // console.log(response.data);
          const { error, message } = response.data;
          // console.log(error,message);
            if (error && message === "SignIn") {
              navigate("/user-login")
            }
          else if (error) {
            showErrorToast(message);
          } else {
            const { result } = response.data;
            console.log(result);
            setBooking(result);
            // showSuccessToast(message);
          }
        } catch (error) {
          showErrorToast(error.message);
        }
    }


    function readMore(ordersData){
        navigate("/user/myorder/details",{state:{ordersData}})
    }




    useEffect(()=>{
        getOrders()
    },[]);



    return(
        <>
        {/* <BannerArea data="MyOrders"/> */}
  


  <div className="services-area pt-100 pb-100">
      <div className="container">
          
          <div className="row" >
          {booking.map((x, index) => (
              
              <div className="col-lg-4 col-sm-6 col-md-6" key={index}>
<div className="single-blog-card rounded p-4 shadow-sm" datacue="fadeIn" dataduration="1000">
<div className="blog-img" style={{ height: '200px', overflow: 'hidden' }}>
            <img src={x.subCategoryPhoto ? x.subCategoryPhoto : '/photo1.png'} alt="category"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
    </div>
  <h3 className="mt-4 text-center"  style={{ cursor: 'pointer' }}>SubCategory: {x.subCategoryName}</h3>
  <h6 className="mt-3 text-center">Total: {x.total}</h6>
  <h6 className="mt-3 text-center">Status: {x.status}</h6>
  <p  className="mt-3 ms-3">
  <span
          onClick={() => readMore(x)}
          className="mt-3 learn-more"
          style={{ cursor: 'pointer' }}
        >
          Read More <i className="flaticon-next"></i>
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