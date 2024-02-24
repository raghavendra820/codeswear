import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
var CryptoJS = require("crypto-js");

async function handler  (req, res) {
  if (req.method === "POST") {
    const {name,email,password}=req.body;
      let u = new User({name:name,email:email,password:CryptoJS.AES.encrypt(password, process.env.AES_SECRET).toString()});
      await u.save();
    res.status(200).json({ success: "Data Added Successfully" });
  } else {
    res.status(400).json({ err: "Method not allowed" });
  }
}
export default connectDb(handler);