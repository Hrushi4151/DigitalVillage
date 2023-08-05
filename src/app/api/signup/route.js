import User from "../../../models/User";
import connectDB from "../../../utils/mongoose";
import { NextResponse } from "next/server";
var CryptoJS = require("crypto-js");

export async function POST(req, res) {
  try {
    const body = await req.json();
    const {name,email,password,phone,address}=body;
    const userdata={name,email,phone,address,password:CryptoJS.AES.encrypt( password,"secretkey123").toString()}
    await connectDB();
    await User.create(userdata);

    return NextResponse.json({ status: 200 }, { error: "success" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 300 }, { error: "error in addproduct" });
  }
}
