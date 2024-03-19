import User from "@/models/User";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  if (req.method == "POST") {
    let token = req.body.token;
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const dbuser = await User.findOne({ email: user.email });

    const { email, name, address, pincode, phone } = dbuser;

    // var bytes = CryptoJS.AES.decrypt(password, process.env.AES_SECRET)
    // var passwordvalue=bytes.toString(CryptoJS.enc.Utf8);

    res.status(200).json({ email, name, address, pincode, phone, });
  } else {
    res.status(400).json({ error: "error" });
  }
}
