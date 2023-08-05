import Funds from "../../../../models/Funds";
import connectDB from "../../../../utils/mongoose";
import { NextResponse } from "next/server";
var mongoose = require("mongoose");

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { id } = body;
    let _id = new mongoose.Types.ObjectId(id);
    if (!id) {
      return NextResponse.json({ status: 201, message: "Failed to remove1" });
    } else {
      await connectDB();
      let user = await Funds.findByIdAndDelete({ _id: _id });

      if (user) {
        return NextResponse.json({ status: 200, message: "success" });
      } else {
        return NextResponse.json({status: 201,message: "Failed to Remov2"});
      }
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 400, error: "Failed to Remov2" });
  }
}
