"use client";
import SimpleImageSlider from "react-simple-image-slider";
import BirthDeath from "./components/BirthDeath";
import Funds from "./components/Funds";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const images = [
  { url: "https://source.unsplash.com/random/600×200/?tractor,butterfly" },
  { url: "https://source.unsplash.com/random/600×300/?crops" },
  { url: "https://source.unsplash.com/random/600×300/?bullockcart,indiancycle" },
  { url: "https://source.unsplash.com/random/600×300/?cows,indianmotorcycle" },
  { url: "https://source.unsplash.com/random/600×300/?trees" },
  { url: "https://source.unsplash.com/random/600×300/?huts,temple" },
  { url: "https://source.unsplash.com/random/600×300/?indianvillage" },
];
export default function Home() {
  const router=useRouter();

  const verify = async () => {
    const res = await fetch("/api/verify", {
      method: "GET",
      headers: {
        Accept: "Application/json",
        "Content-Type": "application/json",
      },
    });
    const resdata = await res.json();
    if(resdata.status===200 && resdata.decoded.role==='user'){
      setverified(resdata);
    }else if(resdata.status===200 && resdata.decoded.role==='admin'){
      router.push("/admin")
    }
  };

  useEffect(() => {
    verify();
  }, [])
  

  return (
    <>
      <div className="w-screen h-full flex flex-col justify-center item-center">
        <div className= "mx-auto my-8 flex justify-center items-center">
          <SimpleImageSlider
            width={'80vw'}
            height={'80vh'}
            images={images}
            showBullets={true}
            showNavs={true}
            loop={true}
            autoPlay={true}
            slideDuration={0.5}
          />
        </div>
          <hr/>
        <BirthDeath/>
        <hr/>
        <Funds/>
      </div>
    </>
  );
}
