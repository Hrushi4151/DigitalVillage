const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    venue: { type: String },
    title: { type: String },
    category: { type: String },
    time: { type: String },
    date: { type: String },
    desc: { type: String },
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("Events", EventSchema);
