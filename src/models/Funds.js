const mongoose = require("mongoose");

const FundSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    fundname: { type: String },
    fundtype: { type: String },
    objectives: { type: String },
    amount: { type: String },
    date: { type: String },
    desc: { type: String },
  },
  { timestamps: true }
);

mongoose.models = {};
export default mongoose.model("Funds", FundSchema);
