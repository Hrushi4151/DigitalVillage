const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, reqired: true },
    email: { type: String, reqired: true, unique: true },
    password: { type: String, reqired: true },
    address: { type: String, reqired: true },
    phone: { type: String, required: true },
    role: { type: String, default:"user" },
    images: [
      {
        name: { type: String },
        loc: { type: String },
        title: { type: String },
        desc: { type: String },
        img: { type: String },
      },
    ],
    invitation: [
      {
        name: { type: String },
        phone: { type: String },
        venue: { type: String },
        title: { type: String },
        category: { type: String },
        time: { type: String },
        date: { type: String },
        desc: { type: String },
      },
    ],
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("User", UserSchema);
