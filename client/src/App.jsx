import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { lazy, Suspense } from "react";
import { BrowserRouter,HashRouter, Routes, Route } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './pages/commonpages/AuthContext.jsx'

const Preloader = lazy(() => import("./Preloader.jsx"));
const PublicLayout = lazy(() => import("./layout/PublicLayout.jsx"));
const AdminLayout = lazy(() => import("./layout/AdminLayout.jsx"));
const PublicHome = lazy(() => import("./pages/public/home.jsx"));
const AboutUs = lazy(() => import("./pages/public/aboutus.jsx"));
const ManageAdmin = lazy(() => import("./pages/admin/ManageAdmin.jsx"));
const ViewAdmin = lazy(() => import("./pages/admin/ViewAdmin.jsx"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard/Dashboard.jsx"));
const SignIn = lazy(() => import("./pages/admin/AdminLogin.jsx"));
const AddCategory = lazy(() => import("./pages/admin/category/AddCategory.jsx"));
const ViewCategory = lazy(() => import("./pages/admin/category/ViewCategory.jsx"));
const ViewSubCategory = lazy(() => import("./pages/admin/subcategory/ViewSubCategory.jsx"));
const AddSubCategory = lazy(() => import("./pages/admin/subcategory/AddSubCategory.jsx"));
const ServiceProviderLogin = lazy(() => import("./pages/service_provider/Login.jsx"));
const ServiceProviderSignup = lazy(() => import("./pages/service_provider/Signup.jsx"));
const ServiceProviderLayout = lazy(() => import("./layout/ServiceProviderLayout.jsx"));
const ServiceProviderDashboard = lazy(() => import("./pages/service_provider/ProviderDashboard/Dashboard.jsx"));
const ServiceProviderChangePassword = lazy(() => import("./pages/service_provider/provider_pages/ConfirmPassword.jsx"));
const ProviderInfo = lazy(() => import("./pages/admin/ProviderInfo.jsx"));
const RegisterUser = lazy(() => import("./pages/user/RegisterUser.jsx"));
const UserLogin = lazy(() => import("./pages/user/UserLogin.jsx"));
const ViewUser = lazy(() => import("./pages/user/ViewUser.jsx"));
const UserInfo = lazy(() => import("./pages/admin/UserInfo.jsx"));
const ViewProviderData = lazy(() => import("./pages/service_provider/provider_pages/ViewData.jsx"));
const AdminForgotPassword = lazy(() => import("./pages/admin/AdminForgotPassword/ForgotPassword.jsx"));
const AdminVerifyOTP = lazy(() => import("./pages/admin/AdminForgotPassword/VerifyOTP.jsx"));
const AdminUpdatePassword = lazy(() => import("./pages/admin/AdminForgotPassword/UpdatePassword.jsx"));
const AddState = lazy(() => import("./pages/admin/state/AddState.jsx"));
const ViewState = lazy(() => import("./pages/admin/state/ViewState.jsx"));
const AddCity = lazy(() => import("./pages/admin/city/AddCity.jsx"));
const ViewCity = lazy(() => import("./pages/admin/city/ViewCity.jsx"));
const UserLayout = lazy(() => import("./layout/UserLayout .jsx"));
const UserProfile = lazy(() => import("./pages/user/UserProfile.jsx"));
const UserForgotPassword = lazy(() => import("./pages/user/UserForgotPassword/ForgotPassword.jsx"));
const UserVerifyOTP = lazy(() => import("./pages/user/UserForgotPassword/VerifyOTP.jsx"));
const UserUpdatePassword = lazy(() => import("./pages/user/UserForgotPassword/UpdatePassword.jsx"));
const ProviderForgotPassword = lazy(() => import("./pages/service_provider/ForgotPassword/ForgotPassword.jsx"));
const ProviderVerifyOTP = lazy(() => import("./pages/service_provider/ForgotPassword/VerifyOTP.jsx"));
const ProviderUpdatePassword = lazy(() => import("./pages/service_provider/ForgotPassword/UpdatePassword.jsx"));
const ProviderProfile = lazy(() => import("./pages/service_provider/ProfilePage.jsx"));
const ViewAllCategory = lazy(() => import("./pages/public/viewallcategory.jsx"));
const ViewAllSubsubCategory = lazy(() => import("./pages/public/viewallsubcategory.jsx"));
const EditCategory = lazy(() => import("./pages/admin/category/EditCategory.jsx"));
const EditSubCategory = lazy(() => import("./pages/admin/subcategory/EditSubCategory.jsx"));
const EditState = lazy(() => import("./pages/admin/state/EditState.jsx"));
const EditCity = lazy(() => import("./pages/admin/city/EditCity.jsx"));
const CategoryDetails = lazy(() => import("./pages/public/categorydetails.jsx"));
const SubCategoryDetails = lazy(() => import("./pages/public/subcategorydetails.jsx"));
const OurTeam = lazy(() => import("./pages/public/ourteam.jsx"));
const BookProvider = lazy(() => import("./pages/public/bookprovider.jsx"));
const ViewProviders = lazy(() => import("./pages/public/viewproviders.jsx"));
const EditProvider = lazy(() => import("./pages/service_provider/provider_pages/EditProvider.jsx"));
const BookingForm = lazy(() => import("./pages/user/BookingForm.jsx"));
const ConfirmedStatus = lazy(() => import("./pages/admin/booking/ConfirmedStatus.jsx"));
const ConfirmedDetails = lazy(() => import("./pages/admin/booking/ConfirmedDetail.jsx"));
const CompletedStatus = lazy(() => import("./pages/admin/booking/CompletedStatus.jsx"));
const CompletedDetails = lazy(() => import("./pages/admin/booking/CompletedDetails.jsx"));
const CancelledStatus = lazy(() => import("./pages/admin/booking/CancelledStatus.jsx"));
const CancelledDetails = lazy(() => import("./pages/admin/booking/CancelledDetails.jsx"));
const ProviderConfirmedStatus = lazy(() => import("./pages/service_provider/booking/ProviderConfirmedStatus.jsx"));
const ProviderConfirmedDetails = lazy(() => import("./pages/service_provider/booking/ProviderConfirmedDetail.jsx"));
const ProviderCancelledStatus = lazy(() => import("./pages/service_provider/booking/ProviderCancelledStatus.jsx"));
const ProviderCancelledDetails = lazy(() => import("./pages/service_provider/booking/ProviderCancelledDetails.jsx"));
const ProviderCompletedStatus = lazy(() => import("./pages/service_provider/booking/ProviderCompletedStatus.jsx"));
const ProviderCompletedDetails = lazy(() => import("./pages/service_provider/booking/ProviderCompletedDetails.jsx"));
const MyOrder = lazy(() => import("./pages/user/MyOrder.jsx"));
const OrderDetails = lazy(() => import("./pages/user/OrderDetails.jsx"));
const UserChangePassword = lazy(() => import("./pages/user/ChangePassword.jsx"));
const ContactUs = lazy(() => import("./pages/public/contactus.jsx"));
const ThankYouPage = lazy(() => import("./pages/user/ThankYouPage.jsx"));




function App() {
  return (
    <>

<AuthProvider>


      <Suspense fallback={<div><Preloader/></div>}>

        <BrowserRouter>

          <Routes>

          <Route path="/" >
            <Route path="admin-login" element={<SignIn />} />              
            </Route>

            

            <Route path="/" element={<PublicLayout />}>
              <Route index element={<PublicHome />} />
              <Route path="aboutus" element={<AboutUs />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="serviceprovider" element={<ServiceProviderSignup />} />
              <Route path="serviceprovider/login" element={<ServiceProviderLogin />} />
              <Route path="user/registeruser" element={<RegisterUser />} />
              <Route path="user-login" element={<UserLogin />} />
              <Route path="user/viewuser" element={<ViewUser />} />
              <Route path="admin/forgotpassword" element={<AdminForgotPassword />} />
              <Route path="admin/forgotpassword/verifyotp" element={<AdminVerifyOTP />} />
              <Route path="admin/forgotpassword/updatepassword" element={<AdminUpdatePassword />} />
              <Route path="user/forgotpassword" element={<UserForgotPassword />} />
              <Route path="user/forgotpassword/verifyotp" element={<UserVerifyOTP />} />
              <Route path="user/forgotpassword/updatepassword" element={<UserUpdatePassword />} />
              <Route path="provider/forgotpassword" element={<ProviderForgotPassword />} />
              <Route path="provider/forgotpassword/verifyotp" element={<ProviderVerifyOTP />} />
              <Route path="provider/forgotpassword/updatepassword" element={<ProviderUpdatePassword />} />
              <Route path="provider/profile" element={<ProviderProfile />} />
              <Route path="allcategory" element={<ViewAllCategory />} />
              <Route path="allsubcategory" element={<ViewAllSubsubCategory />} />
              <Route path="categoryDetailPage" element={<CategoryDetails />} />
              <Route path="subcategoryDetailPage" element={<SubCategoryDetails />} />
              <Route path="ourteam" element={<OurTeam />} />
              <Route path="viewprovider" element={<ViewProviders />} />
              <Route path="/bookprovider" element={<BookProvider />} />
            </Route>
            <Route path="/providerpages" element={<ServiceProviderLayout />}>
              <Route index element={<ServiceProviderDashboard />} />
              <Route path="changepassword" element={<ServiceProviderChangePassword />} />
              <Route path="info" element={<ViewProviderData />} />
              <Route path="editprovider" element={<EditProvider />} />


              <Route path="confirmed" element={<ProviderConfirmedStatus />} />
              <Route path="confirmed/details" element={<ProviderConfirmedDetails />} />
              <Route path="cancelled" element={<ProviderCancelledStatus />} />
              <Route path="cancelled/details" element={<ProviderCancelledDetails />} />
              <Route path="completed" element={<ProviderCompletedStatus />} />
              <Route path="completed/details" element={<ProviderCompletedDetails />} />
            </Route>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="create-admin" element={<ManageAdmin />} />
              <Route path="view-admin" element={<ViewAdmin />} />
              <Route path="create-category" element={<AddCategory />} />
              <Route path="view-category" element={<ViewCategory />} />
              <Route path="create-subcategory" element={<AddSubCategory />} />
              <Route path="view-subcategory" element={<ViewSubCategory />} />
              <Route path="providerinfo" element={<ProviderInfo />} />
              <Route path="userinfo" element={<UserInfo />} />
              <Route path="add-state" element={<AddState />} />
              <Route path="view-state" element={<ViewState />} />
              <Route path="add-city" element={<AddCity />} />
              <Route path="view-city" element={<ViewCity />} />
              <Route path="editcategory" element={<EditCategory />} />
              <Route path="editsubcategory" element={<EditSubCategory />} />
              <Route path="editstate" element={<EditState />} />
              <Route path="editcity" element={<EditCity />} />
              <Route path="confirmed" element={<ConfirmedStatus />} />
              <Route path="confirmed/details" element={<ConfirmedDetails />} />
              <Route path="completed" element={<CompletedStatus />} />
              <Route path="completed/details" element={<CompletedDetails />} />
              <Route path="cancelled" element={<CancelledStatus />} />
              <Route path="cancelled/details" element={<CancelledDetails />} />
              
            </Route>
            <Route path="/user" element={<UserLayout />}>
            <Route path="profile" element={<UserProfile/>} />
            <Route path="booking" element={<BookingForm/>} />
            <Route path="myorder" element={<MyOrder/>} />
            <Route path="myorder/details" element={<OrderDetails/>} />
            <Route path="changepass" element={<UserChangePassword/>} />
            <Route path="thankyou" element={<ThankYouPage />} />
              
            </Route>
          
          </Routes>

        </BrowserRouter>

      </Suspense>
      
      </AuthProvider>
    </>
  );
}

export default App;
