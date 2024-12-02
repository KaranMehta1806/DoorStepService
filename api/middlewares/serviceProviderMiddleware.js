const jwt = require("jsonwebtoken");

const JWT_SECRET = "12345@abcd12";

function serviceProviderMiddleware(req, res, next) {
  try {
  if (!req.headers.authorization) {
    return res.json({ error: true, message: "SignIn" });
  }


    
    const token = req.headers.authorization.split(" ")[1];
    // if(!token){
    //   return res.json({ error: true, message: "SignIn" });
    // }
    const data = jwt.verify(token, JWT_SECRET);
    req.providerInfo = data;
    next();
  } catch (error) {
    console.log("asdf")
    return res.json({ error: true, message: error.message });
  }
}



module.exports = {serviceProviderMiddleware};
