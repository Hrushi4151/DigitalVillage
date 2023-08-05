import mongoose from "mongoose";
import User from "../../../../models/User";
import connectDB from "../../../../utils/mongoose";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    await connectDB();
    let imgarray = await User.find({}, { images: 1, _id: 0 });
    if (imgarray) {
      let Allimages=[];
      if(imgarray.length>0){
        for (let i = 1; i < imgarray.length; i++) {
          Allimages = [...Allimages, ...imgarray[i].images];
        }
      }else{
          Allimages=imgarray[0].images;
      }
      return NextResponse.json({status:200, Allimages: Allimages });
    } else {
      return NextResponse.json({ status: 202, message: "No images" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 400, error: "Failed to Fetch" });
  }
}
