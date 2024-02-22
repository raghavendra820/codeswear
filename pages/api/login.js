import User from "@/models/User";
import connectDb from "@/middleware/mongoose";

async function handler(req, res) {
  if (req.method === "POST") {
    let user = await User.findOne({ email: req.body.email });
    console.log(user.email);
    console.log(req.body.email);
    if (user) {
      if (user.email == req.body.email && user.password == req.body.password) {
        res
          .status(200)
          .json({ success: true, email: user.email, name: user.name });
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
