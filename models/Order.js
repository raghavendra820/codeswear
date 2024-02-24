import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    email: { type: String, required: true },
    orderId:{ type: String, required: true },
    paymentInfo:{ type: String, default:'' },
    products: {type:Object, required:true},
    address: { type: String, required: true },
    amount: { type: String, required: true },
    status: { type: String, required: true, default: "Initiated" },
  },
  { timestamps: true }
);
mongoose.models={};

export default mongoose.model("Order", OrderSchema);