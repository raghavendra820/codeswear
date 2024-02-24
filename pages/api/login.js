import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

async function handler(req, res) {
  if (req.method === "POST") {
    let user = await User.findOne({ email: req.body.email });
    var bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
    console.log(user.email);
    console.log(req.body.email);
    if (user) {
      if (
        user.email == req.body.email &&
        bytes.toString(CryptoJS.enc.Utf8) == req.body.password
      ) {
        var token = jwt.sign(
          { success: true, email: user.email, name: user.name },
          process.env.AES_SECRET.JWT_SECRET,
          { expiresIn: "2d" }
        );
        res.status(200).json({ success: true, token });
      } else {
        res.status(200).json({ success: false, err: "Invalid Credentials" });
      }
    } else {
      res.status(200).json({ success: false, err: "No user found" });
    }
    res.status(200).json({ success: "Data Added Successfully" });
  } else {
    res.status(400).json({ err: "Method not allowed" });
  }
}
export default connectDb(handler);
