import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

 async function handler(req, res) {
  if (req.method === "POST") {
    for (let i = 0; i < req.body.length; i++) {
      let p = await Product.findByIdAndUpdate(req.body[i]._id, req.body[i]);
    }
    res.status(200).json({ success: `Product has been updated successfully` });
  } else {
    res.status(400).json({ err: "Method not allowed" });
  }
}

export default connectDb(handler);
