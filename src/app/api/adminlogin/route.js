import Admin from "../../../models/Admin";
import connectDB from "../../../utils/mongoose";
import { NextResponse } from "next/server";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

export async function POST(req, res) {
  try {
    const body = await req.json();
    console.log(body)
   if(!body.email || !body.password){
    return NextResponse({status:202,message:"Please fill all the fields"})
   }
   else{ await connectDB();
            const user = await Admin.findOne({ email: body.email });
    const bytes = CryptoJS.AES.decrypt(user.password, "secretkey123");
    const decryptpass = bytes.toString(CryptoJS.enc.Utf8);
    if (user) {
      if (body.email === user.email && decryptpass === body.password) {
        var token = jwt.sign(
          {
            name: user.name,
            email: user.email,
            address: user.address,
            phone: user.phone,
            role:user.role
          },
          "secretkey123",
          { expiresIn: "2days" }
        );

        const response= NextResponse.json(
          { status: 200 },
          { message: "success" }
        );
        response.cookies.set("token",token,{
          httpOnly:true
        })
        return response;
    
      } else {
        return NextResponse.json(
          { status: 201 },
          { message: "Invalid Credentials" }
        );
      }
    } else {
      return NextResponse.json({ status: 400 }, { message: "User not found" });
    }}
  } catch (error) {
    return NextResponse.json({ status: 300 }, { error: "failed to login" });
  }
}
