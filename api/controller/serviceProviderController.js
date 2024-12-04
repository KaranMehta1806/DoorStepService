const db = require("../config/connection");
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "12345@abcd12";
const { generateOTP, sendOTPEmail } = require('../utils/otpUtils');
const cloudinary = require('../utils/CloudConfig');



const providerController = {};


providerController.serviceChangePassword = async (req, res) => {
    try {
      // console.log(req.body)
      const collection = "ServiceProvider"
      const filter = { _id: new ObjectId(req.providerInfo.id) };
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


  providerController.getProviderInfo = async (req, res) => {
    try {
      const collections = "ServiceProvider";
      const providerId = req.providerInfo.id;
      const filter = {_id:new ObjectId(providerId)}
      let documents = await db.collection(collections).aggregate([
        {
          $match: filter
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
            city:1,
            startTime:1,
            endTime:1,
            status:1,
            photo:1,
            address:1,
            price:1,
            categoryInfo: "$categoryInfo.categoryName",
            subCategoryInfo:"$subCategoryInfo.subCategoryName",
            stateInfo:"$stateInfo.stateName",
            cityInfo:"$cityInfo.cityName"
          },
        },
      ]).toArray();
      // console.log(documents);
      res.json({
        error: false,
        message: "Document Fetched Successfully",
        result: documents,
      });
    } catch (error) {
      res.json({ error: true, message: error.message });
    }
  };
  
  providerController.deleteProviderInfo = async (req, res) => {
    try {
      const collections = "ServiceProvider";
      const { id } = req.params;
      let filter = { _id: new ObjectId(id) };
      let result = await db.collection(collections).deleteOne(filter);
      res.json({ error: false, message: "Service Provider Deleted Successfully" });
    } catch (error) {
      res.json({ error: true, message: error.message });
    }
  };


  providerController.providerForgotPass = async (req, res) => {
    try {
      // console.log(req.body);
      const { email} = req.body;
  
      const collections = "ServiceProvider";
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
  
  
  providerController.providerVerifyOTP = async (req, res) => {
    try {
      console.log(req.body);
      const { email, otp} = req.body;
  
      const collections = "ServiceProvider";
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
  
  
  
  providerController.providerUpdatePassword = async (req, res) => {
    try {
      console.log(req.body);
      const { email, newPassword} = req.body;
  
      const collections = "ServiceProvider";
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
  

  function generateHourlySlots(startTime, endTime) {
    const slots = [];
    let start = new Date(`1970-01-01T${startTime}Z`);
    const end = new Date(`1970-01-01T${endTime}Z`);
  
    while (start < end) {
        const nextHour = new Date(start);
        nextHour.setHours(start.getHours() + 1);
  
        slots.push({
            start: start.toISOString().substr(11, 8),
            end: nextHour.toISOString().substr(11, 8),
            available: true  // Initial availability set to true
        });
  
        start = nextHour;
    }
  
    return slots;
  }
  
  function markSlotAvailability(slots, bookedSlots) {
    return slots.map(slot => {
        // Check if this slot overlaps with any booked slot
        const isUnavailable = bookedSlots.some(bookedSlot =>
            (slot.start < bookedSlot.end_time && slot.end > bookedSlot.start_time) ||
            (slot.start >= bookedSlot.start_time && slot.end <= bookedSlot.end_time)
        );
  
        // Set availability based on overlap
        return {
            start: slot.start,
            end: slot.end,
            available: !isUnavailable
        };
    });
  }

  providerController.ReadAvailableSlots = async (req, res) => {
    try {
        let { serviceProviderId, bookingDate } = req.body;
        bookingDate = new Date(bookingDate);
        bookingDate = bookingDate.toISOString().slice(0, 10);
// console.log("Formatted booking date:", bookingDate);

        const collection = "ServiceProvider";
        const filter = { _id: new ObjectId(serviceProviderId) };
        const result = await db.collection(collection).find(filter).toArray();
        // console.log(result);
        // console.log(serviceProviderId);

        // Step 1: Find all bookings for the service provider on the specified date
        const bookings = await db.collection("Booking").find({
           partnerId:new ObjectId(serviceProviderId),
            date: bookingDate
        }).toArray();
        // console.log("booking result");
        // console.log(bookings);

        // Get booking IDs for the found bookings
        const bookingIds = bookings.map(booking => booking._id);
        // console.log("hhhhhhhhhhhhhhh")
        // console.log(bookingIds)

        // Step 2: Retrieve booking details for these booking IDs
        const bookedSlots = await db.collection("Booking-Details").find({
            booking_id: { $in: bookingIds }
        }).toArray();

        const { startTime, endTime } = result[0];

        const generatedSlots = generateHourlySlots(startTime, endTime);
        const availableSlots = markSlotAvailability(generatedSlots, bookedSlots);

        res.json({ error: false, message: 'Data Fetched Successfully.', slots: availableSlots });
    } catch (e) {
        res.json({ error: true, message: e.message });
    }
}


providerController.ViewBookingData = async (req, res) => {
  try {
    const collection = "Booking"
    
    const filter = {
      partnerId: new ObjectId(req.providerInfo.id)
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
          categoryName: "$categoryInfo.categoryName",
          subCategoryName:"$subCategoryInfo.subCategoryName",
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


providerController.UpdateStatus = async (req, res) => {
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



providerController.ViewSingleProvider = async (req, res) => {
  try {
    // console.log("working")
    const { id } = req.params;
    // console.log(id);
    const collection = "ServiceProvider"
    let filter = { _id: new ObjectId(id) }
    // console.log(filter)

    let result = await db.collection(collection).find(filter).toArray();
    // console.log(result)
    res.json({ error: false, message: 'Data fetched successfully', result: result });
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

providerController.ProviderUpdatePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const filter = { _id: new ObjectId(id) };
    const { photo } = req.files;
    

    const result = await cloudinary.uploader.upload(photo.tempFilePath, {
      folder: "DoorStepService"  // Specify the folder name here
    });
    const imageUrl = result.secure_url;
    const updateResult = await db.collection("ServiceProvider").updateOne(filter, { 
      $set: { photo: imageUrl } 
    });

    if (!updateResult.modifiedCount) {
      return res.json({ error: true, message: 'Failed to update photo.' });
    }

      res.json({ error: false, message: 'Photo uploaded and updated successfully' })

    // const dbPath = '/images/' + photo.name;
    // const serverPath = 'public/images/' + photo.name;


    // photo.mv(serverPath, (e) => {
    //   if (e) {
    //     return res.json({ error: true, message: e.message });
    //   }
    //   const updatepath = db.collection("ServiceProvider").updateOne(filter, { $set: { photo: dbPath } })
    //   if (e) {
    //     return res.json({ error: true, message: e.message });
    //   }

    //   res.json({ error: false, message: 'photo uploaded successfully' })
    // })

  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

providerController.editProvider = async (req,res) => {
  try {
    const collection = "ServiceProvider"
    const {id} = req.params;
    await db.collection(collection).updateOne(
      { _id : new ObjectId(id) },
      { $set: req.body }
  );
  
  
  
    res.json({
      error: false,
      message: 'Provider  Updated Successfully'
  })
    
  } catch (error) {
    res.json({
      error: true,
      message:error.message
  })
  }
 
}







module.exports = providerController;