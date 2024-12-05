const express = require('express'); // Import Express
const app = express(); // Initialize the Express app
const cors = require('cors'); // Import mysql2 package
const indexController  = require("./controller/indexController");
const {adminAuthMiddleware} = require("./middlewares/authMiddleware");
const {serviceProviderMiddleware} = require("./middlewares/serviceProviderMiddleware");
const {userAuthMiddleware} = require("./middlewares/userAuthMiddleware ");
const providerController = require('./controller/serviceProviderController');
const userController = require('./controller/userController');
const fileUpload = require("express-fileupload")

// const {userAuthMiddleware} = require("./middlewares/authMiddleware");



app.use(cors());
app.use(fileUpload( {useTempFiles: true,tempFileDir: '/tmp/'}));
app.use(express.json());
app.use(express.static("public"));


// Admin Routes

app.get("/admin-registration",adminAuthMiddleware,indexController.ViewAdmin);
app.post("/admin-registration",adminAuthMiddleware,indexController.AdminRegistration);
app.delete("/admin-registration/:id",adminAuthMiddleware,indexController.DeleteAdmin);
// app.put("/register/:id",indexController.UpdateDocument);

// Admin State Routes 
app.post("/admin-addstate",adminAuthMiddleware,indexController.AdminAddState);
app.get("/admin-readstate",adminAuthMiddleware,indexController.AdminReadState);
app.delete("/admin-deletestate/:id",adminAuthMiddleware,indexController.AdminDeleteState);

// Admin City Routes
app.post("/admin-addcity",adminAuthMiddleware,indexController.AdminAddCity);
app.get("/admin-readcity",adminAuthMiddleware,indexController.AdminReadCity);
app.delete("/admin-deletecity/:id",adminAuthMiddleware,indexController.AdminDeleteCity);




// Admin Category Route

app.post("/managecategory",adminAuthMiddleware,indexController.addCategory);
app.get("/managecategory",adminAuthMiddleware,indexController.getCategory);
app.delete("/managecategory/:id",adminAuthMiddleware,indexController.deleteCategory);




// Admin SubCategory Route
app.post("/managesubcategory",adminAuthMiddleware,indexController.addSubCategory);
app.get("/managesubcategory",adminAuthMiddleware,indexController.getSubCategory);
app.delete("/managesubcategory/:id",adminAuthMiddleware,indexController.deleteSubCategory);

// Admin Provider Info Routes
app.get("/admin/providerinfo",adminAuthMiddleware,indexController.serviceProviderInfo);
app.delete("/admin/providerinfo/:id",adminAuthMiddleware,indexController.deleteProviderInfo);
app.put("/provider-status/:id",indexController.updateStatus)

// Admin User Info Routes

app.get("/admin/userinfo",adminAuthMiddleware,indexController.userInfo);
app.delete("/admin/userinfo/:id",adminAuthMiddleware,indexController.deleteUserInfo);

// Admin Forgot Passowrd Routes
app.post("/admin/verifyemail",indexController.adminForgotPass)
app.post("/admin/verifyotp",indexController.adminVerifyOTP)
app.post("/admin/updatePassword",indexController.updatePassword)

// User Forgot Password Routes

app.post("/user/verifyemail",userController.userForgotPass)
app.post("/user/verifyotp",userController.userVerifyOTP)
app.post("/user/updatePassword",userController.userUpdatePassword);

// user Change Password
app.put("/user/changepassword",userAuthMiddleware,userController.userChangePassword);



// Service Provider Forgot Password Routes
app.post("/provider/verifyemail",providerController.providerForgotPass)
app.post("/provider/verifyotp",providerController.providerVerifyOTP)
app.post("/provider/updatePassword",providerController.providerUpdatePassword);




// Service Provider
app.get('/provider/city/:id',indexController.providerGetCity);
app.get("/provider/state",indexController.providerGetState);
app.get('/managesubcategory/:id',indexController.readsubcat);
app.get("/provider/managecategory",indexController.providerGetCategory);
app.post("/serviceprovider",indexController.addServiceProvider);

app.get("/serviceprovider/info",serviceProviderMiddleware,providerController.getProviderInfo);
app.delete("/serviceprovider/info/:id",serviceProviderMiddleware,providerController.deleteProviderInfo);




app.post("/serviceproviderlogin",indexController.chkServiceProvider);
app.put("/serviceprovider/changepassword",serviceProviderMiddleware,providerController.serviceChangePassword);
// app.get("/serviceprovider/subcategory",indexController.getSubCategory);



// User Routes
app.post("/user-registration",userController.userRegistration);
app.get("/user-registration",userAuthMiddleware,userController.viewUser);
app.delete("/user-registration/:id",userAuthMiddleware,userController.deleteUser);
app.post("/user-login",userController.chkUser);






// Admin Login

app.post("/admin-login",indexController.chkAdminLogin);



// Admin  update routes
app.get('/view-single-category/:id', adminAuthMiddleware, indexController.ViewSingleCategory);

app.post('/category-photo-update/:id', adminAuthMiddleware, indexController.CategoryUpdatePhoto);

app.put("/updatecategory/:id",adminAuthMiddleware,indexController.editCategory);

app.get('/view-single-subcategory/:id', adminAuthMiddleware, indexController.ViewSingleSubCategory);

app.post('/subcategory-photo-update/:id', adminAuthMiddleware, indexController.SubCategoryUpdatePhoto);

app.put("/updatesubcategory/:id",adminAuthMiddleware,indexController.editSubCategory);


app.get('/view-single-state/:id', adminAuthMiddleware, indexController.ViewSingleState);

// app.post('/state-photo-update/:id', adminAuthMiddleware, indexController.StateUpdatePhoto);

app.put("/updatestate/:id",adminAuthMiddleware,indexController.editState);


app.get('/view-single-city/:id', adminAuthMiddleware, indexController.ViewSingleCity);

app.put("/updatecity/:id",adminAuthMiddleware,indexController.editCity);





app.get('/view-single-provider/:id', serviceProviderMiddleware, providerController.ViewSingleProvider);

app.post('/provider-photo-update/:id', serviceProviderMiddleware, providerController.ProviderUpdatePhoto);

app.put("/updateprovider/:id",serviceProviderMiddleware,providerController.editProvider);


app.get('/view-single-user', userAuthMiddleware, userController.ViewSingleUser);

app.post('/user-photo-update', userAuthMiddleware, userController.UserUpdatePhoto);

app.put("/updateuser",userAuthMiddleware,userController.editUser);








// Admin Booking

app.get('/adminbookingdata',adminAuthMiddleware, indexController.ViewBookingData);

// Provider Booking

app.get('/providerbookingdata',serviceProviderMiddleware, providerController.ViewBookingData);

// User Booking
app.get('/userbookingdata',userAuthMiddleware, userController.UserBookingData);


// Update Booking Status
app.put("/updateBookingStatus", providerController.UpdateStatus);
app.put("/userbookingstatus",userAuthMiddleware, userController.UpdateStatus);



// public routes

// get provider Route of specific subcategory
app.get("/subcatprovider/:id",indexController.SubCatProvider);
app.get("/manageproviders/:subid",indexController.publicProvider);


// all providers
app.get("/providerinfo",indexController.AllProviders);





// user Protected Routes
app.get("/user/managecategory",userAuthMiddleware,userController.userGetCategory);


// Booking ROutes

// app.post('/api/bookings', userController.booking)


//   app.get('/api/bookings/booked-slots', userController.chkSlots );






  app.post('/check-available-slots', providerController.ReadAvailableSlots);

  app.post("/user-booking",userAuthMiddleware,userController.Booking)





  app.post("/submitreview",userAuthMiddleware,userController.userFeedback);

  // Contact us

app.post("/contact",indexController.contactInfo);



  // feedback data

app.get("/getFeedback",indexController.getFeedback);
app.get("/getParticularFeedback/:pid",indexController.getParticularFeedback);

  















app.get('/', (req, res) => {
    res.send('Hello World! Welcome to your Express server.');
});

// -----------------------------------------------
// -----------------------------------------------

const port = 5000; // Define the port the server will listen on

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
