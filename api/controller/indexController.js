
const connectToDatabase = require("../config/connection");

const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "12345@abcd12";
const { generateOTP, sendOTPEmail } = require('../utils/otpUtils');
const cloudinary = require('../utils/CloudConfig');

// let db;

// (async () => {
//     try {
//         db = await connectToDatabase(); // Initialize db only once
//         console.log("Database connected successfully.");
//     } catch (error) {
//         console.error("Database connection failed:", error.message);
//     }
// })();


const indexController = {};

indexController.AdminRegistration = async (req, res) => {
  try {
    console.log(req.body);
    const {fullName,email,password,mobile,userRole,address} = req.body; 
    const document = {
      fullName: fullName,
      email: email,
      password: password,
      mobile: mobile,
      userRole: userRole,
      address:address,
      otp:""
    }
    // const db = await connectToDatabase();

    const collections = "admin";
    let result = await db.collection(collections).insertOne(document);
    //   console.log(result)
    res.json({ error: false, message: "Admin Registered Successfully" });
  } catch (error) {
    res.json({ error: true, message: error.message });
  }
};

indexController.ViewAdmin = async (req, res) => {
  try {
    const collections = "admin";
    let documents = await db.collection(collections).find().toArray();
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

indexController.DeleteAdmin = async (req, res) => {
  try {
    const collections = "admin";
    const { id } = req.params;
    let filter = { _id: new ObjectId(id) };
    let result = await db.collection(collections).deleteOne(filter);
    res.json({ error: false, message: "Admin Deleted Successfully" });
  } catch (error) {
    res.json({ error: true, message: error.message });
  }
};

indexController.chkAdminLogin = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;

    const collections = "admin";
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
        fullName: documents[0].firstName,
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

// admin category

indexController.addCategory = async (req, res) => {
  try {
    console.log(req.body);
    const collections = "category";
    const { categoryName,description,fullDescription} = req.body;
    const document = {
      
categoryName :categoryName,
description:description,
fullDescription:fullDescription,
photo:""

    }
    const filter = {
      categoryName: categoryName,
    };
    let documents = await db.collection(collections).find(filter).toArray();
    console.log(documents);
    if(documents.length > 0){
      return res.json({ error: true, message: "Category already exists. " });
    }



    
    let result = await db.collection(collections).insertOne(document);
    //   console.log(result)
    res.json({ error: false, message: "1 category inserted" });
  } catch (error) {
    res.json({ error: true, message: error.message });
  }
};

indexController.getCategory = async (req, res) => {
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

indexController.deleteCategory = async (req, res) => {
  try {
    const collections = "category";
    const { id } = req.params;
    const filter1 = new ObjectId(id)
    let filter2 = { _id: new ObjectId(id) };
    const subcategory = await db.collection("subcategory").find({ category : filter1}).toArray();
    if(subcategory.length > 0){
      return res.json({ error: true, message: "Cannot delete Category. It is linked to subCategories" }); 
    }
    let result = await db.collection(collections).deleteOne(filter2);
    res.json({ error: false, message: "Category Deleted Successfully" });
  } catch (error) {
    res.json({ error: true, message: error.message });
  }
};

indexController.editCategory = async (req,res) => {
  try {
    const collection = "category"
    const {id} = req.params;
    await db.collection(collection).updateOne(
      { _id : new ObjectId(id) },
      { $set: req.body }
  );
  
  
  
    res.json({
      error: false,
      message: 'Category  Updated Successfully'
  })
    
  } catch (error) {
    res.json({
      error: true,
      message:error.message
  })
  }
 
}

// SubCategory Logic

indexController.addSubCategory = async (req, res) => {
  try {
    const collections = "subcategory";
    const filter  = {
      subCategoryName: req.body.subcategoryName
    }
    const document = {
      subCategoryName: req.body.subcategoryName,
      subCategoryDescription: req.body.description,
      category: new ObjectId(req.body.category),
      photo:"",
      fulldescription:req.body.fulldescription
    };
    let documents = await db.collection(collections).find(filter).toArray();
    console.log(documents);
    if(documents.length > 0){
      return res.json({ error: true, message: "Category already exists. " });
    }
    let result = await db.collection(collections).insertOne(document);
    res.json({ error: false, message: "SubCategory Inserted Successfully" });
  } catch (error) {
    res.json({ error: true, message: error.message });
  }
};

indexController.getSubCategory = async (req, res) => {
  try {
    const collections = "subcategory";
    let documents = await db
      .collection(collections)
      .aggregate([
        {
          $lookup: {
            from: "category",
            localField: "category",
            foreignField: "_id",
            as: "categoryInfo",
          },
        },
        {
          $unwind: "$categoryInfo",
        },
        {
          $project: {
            _id: 1,
            subCategoryName: 1,
            photo:1,
            subCategoryDescription: 1,
            categoryInfo: "$categoryInfo.categoryName",
          },
        },
      ])
      .toArray();
    res.json({
      error: false,
      message: "Document Fetched Successfully",
      result: documents,
    });
  } catch (error) {
    res.json({ error: true, message: error.message });
  }
};

indexController.deleteSubCategory = async (req, res) => {
  try {
    const collections = "subcategory";
    const { id } = req.params;
    let filter2 = { _id: new ObjectId(id) };
    let filter1 = new ObjectId(id) ;
    const serviceProvider = await db.collection("ServiceProvider").find({subCategoryId:filter1}).toArray();
    if(serviceProvider.length > 0){
      return res.json({ error: true, message: "Cannot delete SubCategory. It is selected by partner" }); 
    }
    let result = await db.collection(collections).deleteOne(filter2);
    res.json({ error: false, message: "SubCategory Deleted Successfully" });
  } catch (error) {
    res.json({ error: true, message: error.message });
  }
};

// Service Provider

indexController.providerGetCity = async (req, res) => {
  try {
    const { id } = req.params;

    const collections = "city";
    let filter = { stateId: new ObjectId(id) };
    console.log(filter);

    let documents = await db.collection(collections).find(filter).toArray();
    console.log(documents);
    res.json({
      error: false,
      message: "Document Fetched Successfully",
      result: documents,
    });
  } catch (error) {
    res.json({ error: true, message: error.message });
  }
};

indexController.providerGetState = async (req, res) => {
  try {
    const collections = "state";
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

indexController.readsubcat = async (req, res) => {
  try {
    const { id } = req.params;

    const collections = "subcategory";
    let filter = { category: new ObjectId(id) };
    console.log(filter);

    let documents = await db.collection(collections).find(filter).toArray();
    console.log(documents);
    res.json({
      error: false,
      message: "Document Fetched Successfully",
      result: documents,
    });
  } catch (error) {
    res.json({ error: true, message: error.message });
  }
};

indexController.providerGetCategory = async (req, res) => {
  try {
    const db = await connectToDatabase();
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

indexController.addServiceProvider = async (req, res) => {
  try {
    const collections = "ServiceProvider"
    console.log(req.body);
    const {
      fullName,
      email,
      mobile,
      password,
      startTime,
      endTime,
      stateId,
      cityId,
      categoryId,
      subCategoryId,
      status,
      photo,
      price,
      address,
    } = req.body;
    const document = {
      fullName: fullName,
      email: email,
      mobile: mobile,
      password: password,
      startTime: startTime,
      endTime: endTime,
      stateId : new ObjectId(stateId),
      cityId : new ObjectId(cityId),
      categoryId:new ObjectId(categoryId),
      subCategoryId:new ObjectId(subCategoryId),
      status: "inactive",
      photo: "",
      address: address,
      price:price,
      otp:"0000"
    };
    const filter = {
      email: email
    }
    let documents = await db.collection(collections).find(filter).toArray();
    console.log(documents);
    if(documents.length > 0){
      return res.json({ error: true, message: "Service Provider already exists. " });
    }
    console.log(document);
    let result = await db.collection(collections).insertOne(document);
    res.json({ error: false, message: "Service Provider Registered Successfully" });
  } catch (error) {
    res.json({ error: true, message: error.message });
  }
};

indexController.chkServiceProvider = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;

    const collections = "ServiceProvider";
    const filter = {
      email: email,
      password: password,
    };
    let documents = await db.collection(collections).find(filter).toArray();
    // console.log(documents);
    if (documents.length > 0) {
      if(documents[0].status === "inactive"){
        return res.json({error: true , message : "your account was inactive" });
      }
      const payload = {
        id: documents[0]._id,
        email: documents[0].email,
        fullName: documents[0].fullName,
      };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
      // console.log(token)
      res.json({
        error: false,
        message: "Service Provider Login Successfully",
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

indexController.serviceProviderInfo = async (req, res) => {
  try {
    const collections = "ServiceProvider";
    let documents = await db.collection(collections).aggregate([
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

indexController.deleteProviderInfo = async (req, res) => {
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

indexController.userInfo = async (req, res) => {
  try {
    const collections = "user";
    let documents = await db.collection(collections)
    .aggregate([   
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
          photo:1,
          address:1,
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

indexController.deleteUserInfo = async (req, res) => {
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

indexController.updateStatus = async (req,res)=> {
  try {
    const{status} = req.body;  
    // console.log(status); 

    const collections = "ServiceProvider";
    const { id } = req.params;
    let filter = { _id: new ObjectId(id) };
    console.log(filter);
    let result = await db.collection(collections).updateOne(filter,{$set:{status:status}});
    res.json({ error: false, message: "Status Updated Successfully" });
  } catch (error) {
    res.json({ error: true, message: error.message });
  }
}

indexController.adminForgotPass = async (req, res) => {
  try {
    // console.log(req.body);
    const { email} = req.body;

    const collections = "admin";
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

indexController.adminVerifyOTP = async (req, res) => {
  try {
    console.log(req.body);
    const { email, otp} = req.body;

    const collections = "admin";
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

indexController.updatePassword = async (req, res) => {
  try {
    console.log(req.body);
    const { email, newPassword} = req.body;

    const collections = "admin";
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

indexController.AdminAddState = async (req, res) => {
  try {
    console.log(req.body.statename);
    const collections = "state";
    const filter = {
      stateName:req.body.stateName
    }
    let result = await db.collection(collections).find(filter).toArray();
    if(result.length > 0){
      return res.json({ error: true, message: "State Already Exists" });
    }
    await db.collection(collections).insertOne(req.body);
    res.json({ error: false, message: "State Added Successfully" });
  } catch (error) {
    res.json({ error: true, message: error.message });
  }
};

indexController.AdminReadState = async (req, res) => {
  try {
    const collections = "state";
    let documents = await db.collection(collections).find().toArray();
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

indexController.AdminDeleteState = async (req, res) => {
  try {
    const collections = "state";
    const { id } = req.params;
    let filter = { _id: new ObjectId(id) };
    let result = await db.collection(collections).deleteOne(filter);
    res.json({ error: false, message: "State Deleted Successfully" });
  } catch (error) {
    res.json({ error: true, message: error.message });
  }
};

indexController.AdminAddCity = async (req, res) => {
  try {
    const collections = "city";
    const filter  = {
      cityName: req.body.cityName
    }
    
    let result = await db.collection(collections).find(filter).toArray();
    if(result.length > 0){
      return res.json({ error: true, message: "City  Already Exists" });
    }
    const document = {
      cityName: req.body.cityName,
      pincode: req.body.pincode,
      stateId: new ObjectId(req.body.stateId),
    };

    await db.collection(collections).insertOne(document);
    res.json({ error: false, message: "City Inserted Successfully" });
  } catch (error) {
    res.json({ error: true, message: error.message });
  }
};

indexController.AdminReadCity = async (req, res) => {
  try {
    const collections = "city";
    let documents = await db
      .collection(collections)
      .aggregate([
        {
          $lookup: {
            from: "state",
            localField: "stateId",
            foreignField: "_id",
            as: "stateInfo",
          },
        },
        {
          $unwind: "$stateInfo",
        },
        {
          $project: {
            cityName: 1,
            pincode: 1,
            stateInfo: "$stateInfo.stateName",
          },
        },
      ])
      .toArray();
    res.json({
      error: false,
      message: "City Fetched Successfully",
      result: documents,
    });
  } catch (error) {
    res.json({ error: true, message: error.message });
  }
};

indexController.AdminDeleteCity = async (req, res) => {
  try {
    const collections = "city";
    const { id } = req.params;
    let filter2 = { _id: new ObjectId(id) };
    let filter1 =  new ObjectId(id) ;
    const serviceProvider = await db.collection("ServiceProvider").find({cityId:filter1}).toArray();
    if(serviceProvider.length > 0){
      return res.json({ error: true, message: "Cannot delete city. It is selected by partner" }); 
    }
    let result = await db.collection(collections).deleteOne(filter2);
    res.json({ error: false, message: "City Deleted Successfully" });
  } catch (error) {
    res.json({ error: true, message: error.message });
  }
};

indexController.ViewSingleCategory = async (req, res) => {
  try {
    // console.log("working")
    const { id } = req.params;
    // console.log(id);
    const collection = "category"
    let filter = { _id: new ObjectId(id) }
    // console.log(filter)

    let result = await db.collection(collection).find(filter).toArray();
    // console.log(result)
    res.json({ error: false, message: 'Data fetched successfully', result: result });
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

indexController.CategoryUpdatePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const filter = { _id: new ObjectId(id) };
    const { photo } = req.files;
    const result = await cloudinary.uploader.upload(photo.tempFilePath, {
      folder: "DoorStepService"  // Specify the folder name here
    });
    const imageUrl = result.secure_url;
    const updateResult = await db.collection("category").updateOne(filter, { 
      $set: { photo: imageUrl } 
    });

    if (!updateResult.modifiedCount) {
      return res.json({ error: true, message: 'Failed to update photo.' });
    }

      res.json({ error: false, message: 'Photo uploaded and updated successfully' })

  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

indexController.SubCatProvider = async (req, res) => {
  try {
    const collections = "ServiceProvider";
    const {id} = req.params;
    const filter = {
      subCategoryId:new ObjectId(id)
    }
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

indexController.AllProviders = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collections = "ServiceProvider";
    let documents = await db.collection(collections).aggregate([
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
        $lookup: {
          from: "feedback",
          localField: "_id",
          foreignField: "partnerId",
          as: "feedbackInfo",
        },
      },
      {
        $addFields: {
          feedbackRating: {
            $cond: [
              { $eq: [{ $size: "$feedbackInfo" }, 0] },
              0, // Default rating if no feedback
              {
                $avg: {
                  $map: {
                    input: "$feedbackInfo",
                    as: "item",
                    in: "$$item.rating",
                  },
                },
              },
            ],
          },
          feedbackComment: {
            $cond: [
              { $eq: [{ $size: "$feedbackInfo" }, 0] },
              "No feedback available",
              { $arrayElemAt: ["$feedbackInfo.comments", 0] },
            ],
          },
        },
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
          cityInfo:"$cityInfo.cityName",
          feedbackRating: 1,
    feedbackComment: 1,
          
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

indexController.ViewSingleSubCategory = async (req, res) => {
  try {
    // console.log("working")
    const { id } = req.params;
    console.log(id);
    const collection = "subcategory"
    let filter = { _id: new ObjectId(id) }
    // console.log(filter)

    let result = await db.collection(collection).find(filter).toArray();
    // console.log(result)
    res.json({ error: false, message: 'Data fetched successfully', result: result });
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

indexController.SubCategoryUpdatePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const filter = { _id: new ObjectId(id) };
    const { photo } = req.files;


    const result = await cloudinary.uploader.upload(photo.tempFilePath, {
      folder: "DoorStepService"  // Specify the folder name here
    });
    const imageUrl = result.secure_url;
    const updateResult = await db.collection("subcategory").updateOne(filter, { 
      $set: { photo: imageUrl } 
    });

    if (!updateResult.modifiedCount) {
      return res.json({ error: true, message: 'Failed to update photo.' });
    }

      res.json({ error: false, message: 'Photo uploaded and updated successfully' })

  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}


indexController.editSubCategory = async (req,res) => {
  try {
    const collection = "subcategory"
    const {id} = req.params;
    await db.collection(collection).updateOne(
      { _id : new ObjectId(id) },
      { $set: req.body }
  );
  
  
  
    res.json({
      error: false,
      message: 'SubCategory  Updated Successfully'
  })
    
  } catch (error) {
    res.json({
      error: true,
      message:error.message
  })
  }
 
}


indexController.publicProvider = async (req, res) => {
  try {
    const collections = "ServiceProvider";
    const {subid} = req.params;
    const filter = {
      subCategoryId:new ObjectId(subid)
    }
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
        $lookup: {
          from: "feedback",
          localField: "_id",
          foreignField: "partnerId",
          as: "feedbackInfo",
        },
      },
      {
        $addFields: {
          feedbackRating: {
            $cond: [
              { $eq: [{ $size: "$feedbackInfo" }, 0] },
              0, // Default rating if no feedback
              {
                $avg: {
                  $map: {
                    input: "$feedbackInfo",
                    as: "item",
                    in: "$$item.rating",
                  },
                },
              },
            ],
          },
          feedbackComment: {
            $cond: [
              { $eq: [{ $size: "$feedbackInfo" }, 0] },
              "No feedback available",
              { $arrayElemAt: ["$feedbackInfo.comments", 0] },
            ],
          },
          totalReviews: { $size: "$feedbackInfo" }, // Total number of reviews
        },
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
          categoryId:1,
          subCategoryId:1,
          categoryInfo: "$categoryInfo.categoryName",
          categorydescription: "$categoryInfo.description",
          subCategoryInfo:"$subCategoryInfo.subCategoryName",
          subCategoryDescription:"$subCategoryInfo.subCategoryDescription",
          subCategoryFullDescription:"$subCategoryInfo.fulldescription",
          stateInfo:"$stateInfo.stateName",
          cityInfo:"$cityInfo.cityName",
          feedbackRating: 1,
    feedbackComment: 1,
    totalReviews: 1,
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


indexController.ViewBookingData = async (req, res) => {
  try {
    const collection = "Booking"

    let result = await db.collection(collection).aggregate([
              
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

indexController.ViewSingleState = async (req, res) => {
  try {
    // console.log("working")
    const { id } = req.params;
    // console.log(id);
    const collection = "state"
    let filter = { _id: new ObjectId(id) }
    // console.log(filter)

    let result = await db.collection(collection).find(filter).toArray();
    // console.log(result)
    res.json({ error: false, message: 'Data fetched successfully', result: result });
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

indexController.editState = async (req,res) => {
  try {
    const collection = "state"
    const {id} = req.params;
    await db.collection(collection).updateOne(
      { _id : new ObjectId(id) },
      { $set: req.body }
  );
  
  
  
    res.json({
      error: false,
      message: 'State  Updated Successfully'
  })
    
  } catch (error) {
    res.json({
      error: true,
      message:error.message
  })
  }
 
}

indexController.ViewSingleCity = async (req, res) => {
  try {
    // console.log("working")
    const { id } = req.params;
    // console.log(id);
    const collection = "city"
    let filter = { _id: new ObjectId(id) }
    // console.log(filter)

    let result = await db.collection(collection).find(filter).toArray();
    // console.log(result)
    res.json({ error: false, message: 'Data fetched successfully', result: result });
  } catch (e) {
    res.json({ error: true, message: e.message });
  }
}

indexController.editCity = async (req,res) => {
  try {
    const collection = "city"
    const {id} = req.params;
    await db.collection(collection).updateOne(
      { _id : new ObjectId(id) },
      { $set: req.body }
  );
  
  
  
    res.json({
      error: false,
      message: 'City  Updated Successfully'
  })
    
  } catch (error) {
    res.json({
      error: true,
      message:error.message
  })
  }
 
}

indexController.getFeedback = async (req, res) => {
  try {
    const db = await connectToDatabase();
    const collections = "feedback";
    let documents = await db.collection(collections).aggregate([
      {
        $lookup: {
          from: "user",
          localField: "userId",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $unwind: "$userInfo",
      },     
      {
        $project: {
          _id: 1,
          rating: 1,
          comments:1,
          userInfo: "$userInfo.fullName",
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

indexController.getParticularFeedback = async (req, res) => {
  try {
    const collections = "feedback";
    const filter = {
      partnerId : new ObjectId(req.params.pid)
    }
    let documents = await db.collection(collections).aggregate([
      {
        $match: filter
      },
      {
        $lookup: {
          from: "user",
          localField: "userId",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $unwind: "$userInfo",
      },     
      {
        $project: {
          _id: 1,
          rating: 1,
          comments:1,
          userInfo: "$userInfo.fullName",
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

indexController.contactInfo = async (req, res) => {
  
  try {
    const collections = "contact";

    console.log(req.body);

    let result = await db.collection(collections).insertOne(req.body);
    //   console.log(result)
    res.json({ error: false, message: "We appreciate your interest. We'll review your inquiry and contact you soon." });
  } catch (error) {
    res.json({ error: true, message: error.message });
  }
};

module.exports = indexController;
