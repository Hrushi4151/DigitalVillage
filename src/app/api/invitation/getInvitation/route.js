import mongoose from "mongoose";
import User from "../../../../models/User";
import connectDB from "../../../../utils/mongoose";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    await connectDB();
    let inviArray = await User.find({}, { invitation: 1, _id: 0 });
   
    if (inviArray) {
      let Allinvitation=[];
      if(inviArray.length>0){
        for (let i = 1; i < inviArray.length; i++) {
          Allinvitation = [...Allinvitation, ...inviArray[i].invitation];
        }
      }else{
        Allinvitation=inviArray[0].images;
      }
      return NextResponse.json({status:200, Allinvitation: Allinvitation });
    } else {
      return NextResponse.json({ status: 202, message: "No images" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 400, error: "Failed to Fetch" });
  }
}
