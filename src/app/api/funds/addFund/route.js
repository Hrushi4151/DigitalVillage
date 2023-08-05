import Funds from "../../../../models/Funds";
import Admin from "../../../../models/Admin";
import connectDB from "../../../../utils/mongoose";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { name, email,fundname,fundtype, desc,amount,date,objectives } =  body;
  
    let event = {
      name: name,
        email: email,
        fundname: fundname,
        fundtype: fundtype,
        date: date,
        desc: desc,
        amount: amount,
        objectives: objectives,
    };
    if (!email || !name || !desc || !objectives || !fundname || !date || !fundtype || !amount ) {
      return NextResponse.json({ status: 201, message: "Fill all the fields" });
    } else {
      await connectDB();
      let user = await Admin.findOne({ email: email });
      if (user) {
        let userupdate = await Funds.create(event)
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

