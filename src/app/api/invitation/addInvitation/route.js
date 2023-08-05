import User from "../../../../models/User";
import connectDB from "../../../../utils/mongoose";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { name, email,category,title, desc,time,phone,date,venue } =  body;
    let invitation = {
      name: name,
      desc: desc,
      title: title,
      phone: phone,
      time: time,
      category: category,
      date: date,
      venue: venue,
    };
    if (!name || !desc || !time || !title || !date || !venue || !phone || !category ) {
      return NextResponse.json({ status: 201, message: "Fill all the fields" });
    } else {
      await connectDB();
      let user = await User.findOne({ email: email });
      if (user) {
        user.invitation.push(invitation);
        let userupdate = await User.findOneAndUpdate(
          { email: email },
          { invitation: user.invitation }
        )
          return NextResponse.json({ status: 200, message: "success" });
       
      } else {
        return NextResponse.json({ status: 203, message: "User not found" });
      }
    }
  } catch (error) {
    console.log(error);
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
    console.log(error);
    return NextResponse.json({ status: 400 ,error: "Failed to Fetch" });
  }
}
