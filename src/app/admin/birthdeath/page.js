'use client'
import { useRouter } from 'next/navigation';
import React,{useEffect} from 'react'

export const page = () => {
  const router=useRouter()
  const verify = async () => {
    const res = await fetch("/api/verify", {
      method: "GET",
      headers: {
        Accept: "Application/json",
        "Content-Type": "application/json",
      },
    });
    const resdata = await res.json();
    if(resdata.status===200 && resdata.decoded.role==='admin'){
    }else if(resdata.status===200 && resdata.decoded.role==='user'){
      router.push('/')
    }else{
      router.push('/adminlogin')
    }
  };
  useEffect(() => {
    verify();
  }, []);
  return (
    <div>page</div>
  )
}
export default page