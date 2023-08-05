import mongoose from "mongoose";
import Event from "../../../../models/Events";
import connectDB from "../../../../utils/mongoose";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    await connectDB();
    let EventArray = await Event.find({});
    if (EventArray) {
      let AllEvents;
      // if(inviArray.length>0){
        // for (let i = 1; i < inviArray.length; i++) {
          // Allinvitation = [...Allinvitation, ...inviArray[i].invitation];
          AllEvents = EventArray;
        // }
        return NextResponse.json({status:200, AllEvents: AllEvents });
      }
    } 
   catch (error) {
    return NextResponse.json({ status: 400, error: "Failed to Fetch" });
  }
}
