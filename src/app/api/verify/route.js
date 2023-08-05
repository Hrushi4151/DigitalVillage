import { NextResponse } from "next/server";
import { cookies } from "next/headers";
var jwt = require("jsonwebtoken");


export async function GET(req, res) {
  try {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
 if(token){
  const decoded=jwt.verify(token.value, "secretkey123",function (err, verifiedJwt){
    if(err){
      return false
    }else{
      return verifiedJwt;
    }
  });
  if(decoded){
    return NextResponse.json({ status: 200, decoded, message: "success" });
  }else{
    cookieStore.delete("token");
    return NextResponse.json({ status: 201, message: "your are logged out" });
  }
}else{
  return NextResponse.json({ status: 201, message: "your are logged out" });

}
} catch (error) {
  console.log(error)
  return NextResponse.json({ status: 400, message: "you are looged out" });
}
}



export async function POST(req, res) {
  try {
  const cookieStore = cookies();
  const token = cookieStore.delete("token");
   return NextResponse.json({status:200})
  }
  catch(err){
    return NextResponse.json({status:300})
  }
}
