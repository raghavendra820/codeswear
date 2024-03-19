import mongoose from "mongoose";
const { Schema } = mongoose;

const ForgotSchema = new Schema(
  {
    userId: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    token: { type: String, required: true },

  },
  { timestamps: true }
);

mongoose.models={};

export default mongoose.model("Forgot", ForgotSchema);
