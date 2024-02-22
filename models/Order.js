import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    userId: { type: String, required: true }, // String is shorthand for {type: String}
    products: [
      { productId: { type: String }, quantity: { type: Number, default: 1 } },
    ],
    address: { type: String, required: true },
    amount: { type: String, required: true },
    status: { type: String, required: true, default: "Pending" },
  },
  { timestamps: true }
);
mongoose.models={};

export default mongoose.model("Order", OrderSchema);