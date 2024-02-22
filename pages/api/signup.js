import User from "@/models/User";
import connectDb from "@/middleware/mongoose";

async function handler  (req, res) {
  if (req.method === "POST") {

      let u = new User(req.body);
      await u.save();
    res.status(200).json({ success: "Data Added Successfully" });
  } else {
    res.status(400).json({ err: "Method not allowed" });
  }
}
export default connectDb(handler);