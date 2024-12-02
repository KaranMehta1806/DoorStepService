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
              navigate("/admin-login")
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
        navigate("/providerpages/completed/details",{state:{ordersData}})
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
            <img src={x.photo ? (Server_URL2 + x.photo) : '/photo1.png'} alt="category"
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
  <div className="col-8 offset-3 mb-3 mt-3">
         <hr/>
         
        <h4>Leave a Review</h4>
        <form >

        <div className="mb-3 mt-3">
        <label for="rating" className="form-label">Rating</label>
        <fieldset className="starability-slot">
            <input type="radio" id="no-rate" className="input-no-rate" name="review[rating]" value="1" checked aria-label="No rating." />
            <input type="radio" id="first-rate1" name="review[rating]" value="1" />
            <label for="first-rate1" title="Terrible">1 star</label>
            <input type="radio" id="first-rate2" name="review[rating]" value="2" />
            <label for="first-rate2" title="Not good">2 stars</label>
            <input type="radio" id="first-rate3" name="review[rating]" value="3" />
            <label for="first-rate3" title="Average">3 stars</label>
            <input type="radio" id="first-rate4" name="review[rating]" value="4" />
            <label for="first-rate4" title="Very good">4 stars</label>
            <input type="radio" id="first-rate5" name="review[rating]" value="5" />
            <label for="first-rate5" title="Amazing">5 stars</label>
          </fieldset>
        </div>
        <div class="mb-3 mt-3">
            <label for="comments" className="form-label">Comments</label>
            <textarea name="comments" id="comments" className="form-control" required></textarea>
            <div class="invalid-feedback">Please add some comments for reviews</div>
        </div>
        <button className="btn btn-outline-dark">Submit</button>
        </form>
        <hr/>
        

        {/* <div>
            <p><b>All Reviews</b></p>
            <div class="row " >
            <%for(review of listing.reviews){%>
            <div class="card col-5 ms-3 mb-3">
                <div class="card-body mt-2">
                    <h5 class="card-title">@<%=review.author.username%></h5>
                    <p class="starability-result card-text" data-rating="<%=review.rating%>"></p>
                    <p class="card-text"><%=review.comment%></p>
                    <form class="mb-3" method="POST" action="/listings/<%=listing._id%>/reviews/<%=review._id%>?_method=DELETE">
                        <button class="btn btn-sm btn-dark">Delete</button>
                      </form>
                  </div>
                  
            </div>
            <% }%>
        </div>
    </div> */}
     </div>
        </>
    )
}