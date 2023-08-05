import mongoose from "mongoose";
import Funds from "../../../../models/Funds";
import connectDB from "../../../../utils/mongoose";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    await connectDB();
    let FundsArray = await Funds.find({});
    if (FundsArray) {
      let AllFunds;
          AllFunds = FundsArray;
        return NextResponse.json({status:200, AllFunds: AllFunds });
      }
    } 
   catch (error) {
    console.log(error);
    return NextResponse.json({ status: 400, error: "Failed to Fetch" });
  }
}
