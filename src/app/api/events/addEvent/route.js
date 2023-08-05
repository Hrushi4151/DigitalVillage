import Event from "../../../../models/Events";
import Admin from "../../../../models/Admin";
import connectDB from "../../../../utils/mongoose";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { name, email,category,title, desc,time,phone,date,venue } =  body;
    let event = {
      name: name,
      email: email,
      desc: desc,
      title: title,
      phone: phone,
      time: time,
      category: category,
      date: date,
      venue: venue,
    };
    if (!email || !name || !desc || !time || !title || !date || !venue || !phone || !category ) {
      return NextResponse.json({ status: 201, message: "Fill all the fields" });
    } else {
      await connectDB();
      let user = await Admin.findOne({ email: email });
      if (user) {
        let userupdate = await Event.create(event)
          return NextResponse.json({ status: 200, message: "success" });
       
      } else {
        return NextResponse.json({ status: 203, message: "User not found" });
      }
    }
  } catch (error) {
    return NextResponse.json({ status: 400, error: "Failed to upload" });
  }
}

export async function GET(req, res) {
  try {
    let Allinvitation = await User.find().select("invitation");
    if (Allinvitation) {
      return NextResponse.json({  status:200, Allinvitation:Allinvitation
      });
    } else {
      return NextResponse.json({ status: 202 ,  message: "No images" });
    }
  } catch (error) {
    return NextResponse.json({ status: 400 ,error: "Failed to Fetch" });
  }
}
