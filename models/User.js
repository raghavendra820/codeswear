import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);

mongoose.models={};

export default mongoose.model("User", UserSchema);
