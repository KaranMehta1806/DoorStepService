const cloudinary = require('cloudinary').v2;
require('dotenv').config();
console.log('process.env.CLOUD_NAME')
console.log(process.env.CLOUD_NAME)
console.log(process.env.CLOUD_API_KEY)
console.log(process.env.CLOUD_API_SECRET)

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

module.exports = cloudinary;