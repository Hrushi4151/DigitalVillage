import User from "../../../../models/User";
import connectDB from "../../../../utils/mongoose";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { name, email, title, desc, loc } =  body.userdata;
    let imgdata ={
    "name": name,
      "title": title,
      "loc": loc,
      "desc": desc,
      "img": body.img64,
    };
    console.log(imgdata)
    if (!email || !name || !title || !desc || !loc || !body.img64) {
      return NextResponse.json({ status: 201, message: "Fill all the fields" });
    } else {
      await connectDB();
      let user = await User.findOne({ email: email });
      if (user) {
        user.images.push(imgdata);
        let userupdate = await User.findOneAndUpdate(
          { email: email },
          { images: user.images }
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
