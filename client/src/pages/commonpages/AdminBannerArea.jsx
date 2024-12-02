import { Link } from "react-router-dom";
export default function BannerArea({data}){
    return(
        <>
        <div className="page-banner-area pt-100">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="single-page-banner-content">
                            <h1>{data}</h1>
                            <ul>
                                <li>
                                    <Link className="nav-link bg-border-2" to="/admin/dashboard">
                                        DashBoard
                                    </Link>
                                </li>
                                <li>
                                    {data}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-6">
                       <div className="single-page-banner-img" datacue="zoomIn" dataduration="1000">
                            <img src="/assets/images/page-banner-img.png" alt="images"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}