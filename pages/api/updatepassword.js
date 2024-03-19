import User from "@/models/User";
import connectDb from "@/middleware/mongoose";
var CryptoJS = require("crypto-js");

async function handler(req, res) {
  if (req.method === "POST") {
    const { password, email, confirmpassword, newpassword } = req.body;
    const dbuser = await User.findOne({ email: email });
    var bytes = CryptoJS.AES.decrypt(dbuser.password, process.env.AES_SECRET);
    var decryptedpassword = bytes.toString(CryptoJS.enc.Utf8);
    if(decryptedpassword !== password){
      res.status(200).json({ success: false,error:"The current password you have entered is wrong!" });
      return
    }
    if(newpassword !== confirmpassword){
      res.status(200).json({ success: false , error:"Your new password and confirm passwords do not match!"});
      return
    }
      let user = User.findOneAndUpdate(
        { email: email },
        {
          password: CryptoJS.AES.encrypt(
            newpassword,
            process.env.AES_SECRET
          ).toString(),
        }
      );
      res.status(200).json({ success: true });
  } else {
    res.status(400).json({ err: "Method not allowed" });
  }
}
export default connectDb(handler);
