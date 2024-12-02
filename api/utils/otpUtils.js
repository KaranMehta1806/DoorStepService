const nodemailer = require('nodemailer');


function generateOTP() {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString(); 
  }


  async function sendOTPEmail(email, otp) {
    // Create a transporter object
    let transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS   // Your email password or app password
      }
    });
  
    // Mail options
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: email, // Recipient's email
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}` // The message content, containing the OTP
    };
  
    // Send the email
    try {
      let info = await transporter.sendMail(mailOptions);
      return{ error: false, message: 'Email sent: ' + info.response };
      // console.log('Email sent: ' + info.response);
    } catch (error) {
      return{ error: true, message: 'Error sending email:'+ error.message};
    }
  }

  module.exports = {
    generateOTP,
    sendOTPEmail
  };