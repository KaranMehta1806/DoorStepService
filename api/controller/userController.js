const connectToDatabase = require("../config/connection");
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "12345@abcd12";
const { generateOTP, sendOTPEmail } = require('../utils/otpUtils');
const cloudinary = require('../utils/CloudConfig');

let db;

(async () => {
    try {
        db = await connectToDatabase(); // Initialize db only once
        console.log("Database connected successfully.");
    } catch (error) {
        console.error("Database connection failed:", error.message);
    }
})();


const userController = {};

userController.userRegistration = async (req, res) => {
  
    try {
      const collections = "user";

      console.log(req.body);
      const {
        fullName,
        email,
        mobile,
        password,
        stateId,
        cityId,
        pincode,
        address,
      } = req.body;
      const document = {
        fullName: fullName,
        email: email,
        mobile: mobile,
        password: password,
        stateId : new ObjectId(stateId),
        cityId : new ObjectId(cityId),
        pincode:pincode,
        address: address,
        photo: "",
        otp:"0000"
      };
      const filter = {
        email: email
      }
    let documents = await db.collection(collections).find(filter).toArray();
    console.log(documents);
    if(documents.length > 0){
      return res.json({ error: true, message: "User with email already exists." });
    }
  
      let result = await db.collection(collections).insertOne(document);
      //   console.log(result)
      res.json({ error: false, message: "user Registered Successfully" });
    } catch (error) {
      res.json({ error: true, message: error.message });
    }
  };



  userController.chkUser = async (req, res) => {
    try {
      // console.log(req.body);
      const { email, password } = req.body;
  
      const collections = "user";
      const filter = {
        email: email,
        password: password,
      };
      let documents = await db.collection(collections).find(filter).toArray();
      // console.log(documents);
      if (documents.length > 0) {
        const payload = {
          id: documents[0]._id,
          email: documents[0].email,
          fullName: documents[0].fullName,
        };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
        // console.log(token)
        res.json({
          error: false,
          message: "User Login Successfully",
          token: token,
        });
      } else {
        res.json({ error: true, message: "No such user" });
      }
      // console.log(documents);
      // // console.log(result)
      // res.json({ error: false, message: "Document Fetched Successfully",documents:documents});
    } catch (error) {
      res.json({ error: true, message: error.message });
    }
  
    // console.log(req.body);
  };

  userController.viewUser = async (req, res) => {
    try {
      const collections = "user";
      const userId = req.userInfo.id;
      const filter = {
        _id:new ObjectId(userId)
      }
    //   console.log(userId);
      let documents = await db.collection(collections).aggregate([
        {
          $match: filter
        },        
        {
          $lookup: {
            from: "state", // Name of the subcategory collection
            localField: "stateId", // Field from the main collection
            foreignField: "_id", // Field from the subcategory collection
            as: "stateInfo", // Output array field
          },
        },
        {
          $unwind: "$stateInfo", // Unwind the subCategoryInfo array
        },{
          $lookup: {
            from: "city", // Name of the subcategory collection
            localField: "cityId", // Field from the main collection
            foreignField: "_id", // Field from the subcategory collection
            as: "cityInfo", // Output array field
          },
        },
        {
          $unwind: "$cityInfo", // Unwind the subCategoryInfo array
        },
        {
          $project: {
            _id: 1,
            fullName: 1,
            email:1,
            mobile:1,
            address:1,
            pincode:1,
            stateInfo:"$stateInfo.stateName",
            cityInfo:"$cityInfo.cityName"
          },
        },
      ]).toArray();
      res.json({
        error: false,
        message: "Document Fetched Successfully",
        result: documents,
      });
    } catch (error) {
      res.json({ error: true, message: error.message });
    }
  };
  
  userController.deleteUser = async (req, res) => {
    try {
      const collections = "user";
      const { id } = req.params;
      let filter = { _id: new ObjectId(id) };
      let result = await db.collection(collections).deleteOne(filter);
      res.json({ error: false, message: "User Deleted Successfully" });
    } catch (error) {
      res.json({ error: true, message: error.message });
    }
  };



  userController.userForgotPass = async (req, res) => {
    try {
      // console.log(req.body);
      const { email} = req.body;
  
      const collections = "user";
      const filter = {
        email: email
      };
      let documents = await db.collection(collections).find(filter).toArray();
      // console.log(documents);
      if (documents.length > 0) {
        const otp = generateOTP();
        const emailResult = await sendOTPEmail(email, otp);
  
        if (emailResult.error) {
          return res.json({
            error: true,
            message: emailResult.message // Pass the error message from sendOTPEmail
          });
          // If email is successfully sent, store the OTP and its expiration in MongoDB
         
        } else {
          await db.collection(collections).updateOne(
            { email: email }, // Find the document by email
            { $set: { otp: otp, otpExpiresAt: new Date(Date.now() + 10 * 60 * 1000) } } // Set OTP and expiration time (10 minutes)
          );
  
          // Send success response
          return res.json({
            error: false,
            message: 'OTP sent to your email successfully'
          });
          
        }
      } else {
        // If email is not found
        return res.json({ error: true, message: "Email not found" });
      }
    } catch (error) {
      res.json({ error: true, message: error.message });
    }
  
    // console.log(req.body);
  };
  
  
  userController.userVerifyOTP = async (req, res) => {
    try {
      // console.log(req.body);
      const { email, otp} = req.body;
  
      const collections = "user";
      const filter = {
        email: email
      };
      let documents = await db.collection(collections).find(filter).toArray();
      // const {otp}
      // console.log(documents);
      if (documents.length > 0) {
         const document = documents[0];
        const storedOTP = document.otp;
        const otpExpiresAt = document.otpExpiresAt;
        
        if(new Date() > otpExpiresAt){
          await db.collection(collections).updateOne(
            { email: email },
            { $set: { otp: null, otpExpiresAt: null } }
          );
          return res.json({ error: true, message: 'OTP expired' });
        }
  
        if(otp === storedOTP){
          await db.collection(collections).updateOne(
            { email: email },
            { $set: { otp: null, otpExpiresAt: null } }
        );
  
  
  
          return res.json({
            error: false,
            message: 'OTP verified successfully'
        });
        }
        else{
          return res.json({
            error: true,
            message: 'Invalid OTP'
        });
  
        }
     
      } 
      else {
        return res.json({ error: true, message: "Email not found" });
    }
    } catch (error) {
      res.json({ error: true, message: error.message });
    }
  
    // console.log(req.body);
  };
  
  
  
  userController.userUpdatePassword = async (req, res) => {
    try {
      console.log(req.body);
      const { email, newPassword} = req.body;
  
      const collections = "user";
      const filter = {
        email: email
      };
      let documents = await db.collection(collections).find(filter).toArray();
    //   // const {otp}
      console.log(documents);
      if (documents.length > 0) {
         const document = documents[0];
        const password = document.password;  
          await db.collection(collections).updateOne(
            { email: email },
            { $set: { password: newPassword} }
        );
  
  
  
          res.json({
            error: false,
            message: 'Password Updated Successfully'
        });
        }
        else{
          res.json({
            error: true,
            message: 'Failed To Update Password'
        });
  
        }
    
  }catch (error) {
      res.json({ error: true, message: error.message });
    }
  };


  userController.userGetCategory = async (req, res) => {
    try {
      const collections = "category";
      let documents = await db.collection(collections).find().toArray();
      res.json({
        error: false,
        message: "Document Fetched Successfully",
        result: documents,
      });
    } catch (error) {
      res.json({ error: true, message: error.message });
    }
  };


  userController.Booking = async (req, res) => {
    try {

      console.log(req.body);
      const collection = "Booking";
      const userId = req.userInfo.id;
      const { email, mobile, state, city, pincode, address, date, slots,totalPrice, partnerId,categoryId,subCategoryId} = req.body;
      const bookingData = {
        email,
        mobile,
        state,
        city,
        pincode,
        address,
        date,
        total:totalPrice,
        partnerId:new ObjectId(partnerId),
        userId : new ObjectId(userId),
        status:"confirmed",
        categoryId:new ObjectId(categoryId),
        subCategoryId:new ObjectId(subCategoryId)
      };

      const bookingResult = await db.collection(collection).insertOne(bookingData);
      const slotData = slots.map((slot) => ({
        start_time: slot.start,
        end_time: slot.end,
        // isAvailable: slot.selected, // Boolean value to indicate availability
        booking_id: bookingResult.insertedId, // Link to the booking
        partnerId:new ObjectId(partnerId)
      }));

      await db.collection("Booking-Details").insertMany(slotData);




      // const result = await db.collection('bookings').insertOne(req.body);
      res.json({ error: false, message: "Booking successful" });
    } catch (error) {
      res.json({ error: true, message: error.message });
    }
  };


  userController.chkSlots = async (req, res) => {
    const { date } = req.query;
    try {
      const bookings = await db.collection('bookings').find({ bookingdate: date }).toArray();
      const bookedSlots = bookings.map(booking => booking.timeSlot);
      res.json({ bookedSlots });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch booked slots." });
    }
  }


  userController.UserBookingData = async (req, res) => {
    try {
      const collection = "Booking"
      
      const filter = {
        userId: new ObjectId(req.userInfo.id)
      }
  
      let result = await db.collection(collection).aggregate([
        {
          $match : filter
        },
                
        {
          $lookup: {
            from: "category",
            localField: "categoryId",
            foreignField: "_id",
            as: "categoryInfo",
          },
        },
        {
          $unwind: "$categoryInfo",
        },{
          $lookup: {
            from: "subcategory", // Name of the subcategory collection
            localField: "subCategoryId", // Field from the main collection
            foreignField: "_id", // Field from the subcategory collection
            as: "subCategoryInfo", // Output array field
          },
        },
        {
          $unwind: "$subCategoryInfo", // Unwind the subCategoryInfo array
        },{
          $lookup: {
            from: "ServiceProvider", // Name of the subcategory collection
            localField: "partnerId", // Field from the main collection
            foreignField: "_id", // Field from the subcategory collection
            as: "providerInfo", // Output array field
          },
        },
        {
          $unwind: "$providerInfo", // Unwind the subCategoryInfo array
        },{
          $lookup: {
            from: "user", // Name of the subcategory collection
            localField: "userId", // Field from the main collection
            foreignField: "_id", // Field from the subcategory collection
            as: "userInfo", // Output array field
          },
        },
        {
          $unwind: "$userInfo", // Unwind the subCategoryInfo array
        },
        {
          $lookup: {
            from: "Booking-Details", // Name of the subcategory collection
            localField: "_id", // Field from the main collection
            foreignField: "booking_id", // Field from the subcategory collection
            as: "bookingDetailsInfo", // Output array field
          },
        },
        
  
        {
          $project: {
            _id: 1,
            email:1,
            mobile:1,
            state:1,
            city:1,
            pincode:1,
            date:1,
            address:1,
            total:1,
            status:1,
            partnerId:1,
            userId:1,
            categoryName: "$categoryInfo.categoryName",
            subCategoryName:"$subCategoryInfo.subCategoryName",
            subCategoryPhoto:"$subCategoryInfo.photo",
            providerName:"$providerInfo.fullName",
            providerEmail:"$providerInfo.email",
            providerMobile:"$providerInfo.mobile",
            userName:"$userInfo.fullName",
            userEmail:"$userInfo.email",
            userMobile:"$userInfo.mobile",
            bookingTimes: {
              $map: {
                input: "$bookingDetailsInfo",
                as: "detail",
                in: {
                  start_time: "$$detail.start_time",
                  end_time: "$$detail.end_time"
                }
              }
            }
  
          },
        },
      ]).toArray();
      // console.log(result)
      res.json({ error: false, message: 'Data fetched successfully', result: result });
    } catch (e) {
      res.json({ error: true, message: e.message });
    }
  }



  userController.ViewSingleUser = async (req, res) => {
    try {
      // console.log("working")
      const id = req.userInfo.id;
      console.log(id)
      // const filter = {
      //   _id:new ObjectId(userId)
      // }
      // const { id } = req.params;
      // console.log(id);
      const collection = "user"
      let filter = { _id: new ObjectId(id) }
      // console.log(filter)
  
      let result = await db.collection(collection).aggregate([
        {
          $match: filter
        },        
        {
          $lookup: {
            from: "state", // Name of the subcategory collection
            localField: "stateId", // Field from the main collection
            foreignField: "_id", // Field from the subcategory collection
            as: "stateInfo", // Output array field
          },
        },
        {
          $unwind: "$stateInfo", // Unwind the subCategoryInfo array
        },{
          $lookup: {
            from: "city", // Name of the subcategory collection
            localField: "cityId", // Field from the main collection
            foreignField: "_id", // Field from the subcategory collection
            as: "cityInfo", // Output array field
          },
        },
        {
          $unwind: "$cityInfo", // Unwind the subCategoryInfo array
        },
        {
          $project: {
            _id: 1,
            fullName: 1,
            email:1,
            mobile:1,
            address:1,
            pincode:1,
            stateId:1,
            cityId:1,
            photo:1,
            stateInfo:"$stateInfo.stateName",
            cityInfo:"$cityInfo.cityName"
          },
        },
      ]).toArray();;
      console.log(result)
      res.json({ error: false, message: 'Data fetched successfully', result: result });
    } catch (e) {
      res.json({ error: true, message: e.message });
    }
  }


  userController.userChangePassword = async (req, res) => {
    try {
      // console.log(req.body)
      const collection = "user"
      const filter = { _id: new ObjectId(req.userInfo.id) };
      // console.log(filter);
      const result = await db.collection(collection).find(filter).toArray();
      // console.log(result[0].password);
      if (result[0].password !== req.body.currentpassword) {
        res.json({ error: true, message: 'Incorrect current password ' });
      } else {
        if (req.body.password !== req.body.confirmpassword) {
          res.json({ error: true, message: 'New Password & confirm password not same' });
        } else {
          await db.collection(collection).updateOne(filter, { $set: { password: req.body.password } })
          res.json({ error: false, message: 'Password updated successfully' });
        }
      }
    } catch (e) {
      res.json({ error: true, message: e.message });
    }
  }




  
  userController.UserUpdatePhoto = async (req, res) => {
    try {
      const id = req.userInfo.id;
      const filter = { _id: new ObjectId(id) };
      const { photo } = req.files;
      console.log(photo);

      const result = await cloudinary.uploader.upload(photo.tempFilePath, {
        folder: "DoorStepService"  // Specify the folder name here
      });
      const imageUrl = result.secure_url;
      const updateResult = await db.collection("user").updateOne(filter, { 
        $set: { photo: imageUrl } 
      });
  
      if (!updateResult.modifiedCount) {
        return res.json({ error: true, message: 'Failed to update photo.' });
      }
  
        res.json({ error: false, message: 'Photo uploaded and updated successfully' })
  
    } catch (e) {
      console.error("Error in UserUpdatePhoto:", e);
      res.json({ error: true, message: e.message });
    }
  }
  



  userController.editUser = async (req,res) => {
    try {
      const collection = "user"
      const id = req.userInfo.id;
            // const {id} = req.params;
      console.log(req.body);
      const {fullName,email,mobile,address} = req.body

      const document = {
        fullName: fullName,
  email: email,
  mobile: mobile,
  address: address
      }
      await db.collection(collection).updateOne(
        { _id : new ObjectId(id) },
        { $set: document }
    );
    
    
    
      res.json({
        error: false,
        message: 'User  Updated Successfully'
    })
      
    } catch (error) {
      res.json({
        error: true,
        message:error.message
    })
    }
   
  }

  userController.UpdateStatus = async (req, res) => {
    console.log(req.body);
    const { bookingId, status } = req.body;
  
    const  Deletefilter   = {
      booking_id :new ObjectId(bookingId),
    }
    
    try {
      const booking = await db.collection("Booking").updateOne(
        { _id : new ObjectId(bookingId) },
        { $set: {status:status} }
    );
  
    if(status === "cancelled"){
    // console.log("delete filter");
    // console.log(Deletefilter);
      
      await db.collection('Booking-Details').deleteMany(Deletefilter);
    }
  
  
      // const booking = await Booking.findByIdAndUpdate(
      //   bookingId,
      //   { status: status },
      //   { new: true }
      // );
  
      // if (!booking) {
      //   return res.status(404).json({ error: true, message: "Booking not found." });
      // }
      
      res.json({ error: false, message: "Status updated successfully." });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: true, message: "Server error. Could not update status." });
    }
  }




  userController.userFeedback = async (req, res) => {
  
    try {
      console.log(req.body);
      const collections = "feedback"
      // const userId = req.userInfo.id;
      const {rating,comments,partnerId,userId} = req.body;
      const document = {
        rating : parseFloat(rating),
        comments:comments,
        partnerId:new ObjectId(partnerId),
        userId:new ObjectId(userId),  
        
      }

  
      let result = await db.collection(collections).insertOne(document);
      // //   console.log(result)
      res.json({ error: false, message: "review submitted Successfully" });
    } catch (error) {
      res.json({ error: true, message: error.message });
    }
  };


module.exports = userController;

