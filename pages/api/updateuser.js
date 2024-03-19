import User from "@/models/User";

var jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  if (req.method == "POST") {
    let token = req.body.token;
    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log(req.body)
    const dbuser = await User.findOneAndUpdate(
      { email: user.email },
      {
        address: req.body.address,
        pincode: req.body.pincode,
        name: req.body.name,
        phone: req.body.phone,
      }
    );
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ error: "error" });
  }
}
