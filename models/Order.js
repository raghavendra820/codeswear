import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    orderId:{ type: String, required: true },
    paymentInfo:{ type: String, default:'' },
    products: {type:Object, required:true},
    address: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    phone: { type: String, required: true },
    amount: { type: String, required: true },
    status: { type: String, required: true, default: "Initiated" },
    transactionid: { type: String, required: true },
    deliverystatus: { type: String, required: true, default: "unshipped" },
  },
  { timestamps: true }
);
mongoose.models={};

export default mongoose.model("Order", OrderSchema);