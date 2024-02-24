import mongoose from "mongoose";
import Order from "@/models/Order";
import jsonwebtoken from "jsonwebtoken";
import connectDb from "@/middleware/mongoose";

async function handler(req, res) {
  const token = req.body.token;
  const data = jsonwebtoken.verify(token, process.env.JWT_SECRET);
  let orders = await Order.find({ email: data.email });
  res.status(200).json({ orders: orders });
}

export default connectDb(handler);
