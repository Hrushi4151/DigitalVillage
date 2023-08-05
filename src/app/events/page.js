"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  const [AllEvents, setAllEvents] = useState([]);
  const getEvents = async () => {
    const res = await fetch("/api/events/getEvent", {
      method: "GET",
      headers: {
        Accept: "Application/json",
        "Content-Type": "application/json",
      },
    });
    const resdata = await res.json();
    setAllEvents(resdata.AllEvents);
  };

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
      getEvents();
      setverified(resdata);
    }else if(resdata.status===200 && resdata.decoded.role==='admin'){
      router.push('/admin')
    }else{
      router.push('/login')
    }
  };
  useEffect(() => {
    verify();
  }, []);

  return (
    <>
      <section className="text-gray-600 min-h-screen body-font">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-col text-center w-full md:w-[80vw] mx-auto">
            <h1 className="my-2 uppercase  text-3xl font-sans font-bold bg-white rounded-lg p-2 mx-auto">
              DIGITAL<span className="text-orange-500">VILLAGE</span>
            </h1>
            <span className="uppercase text-2xl text-black font-bold bg-white rounded-lg p-5">
              Events In Village
            </span>
          </div>

          <div className="flex flex-wrap m-4 justify-center">
            {AllEvents.length > 0 ? (
              AllEvents.map((item, index) => {
                return (
                  <div key={index} className="p-4 md:w-1/4 w-full">
                    <div className="h-auto bg-gray-100 bg-opacity-75 px-6 p-8 rounded-lg overflow-hidden relative">
                      <h2 className="tracking-widest text-xs title-font font-medium text-gray-600 mb-1">
                        Category:{item.category}
                      </h2>
                      <h1 className="title-font sm:text-2xl text-lg font-bold text-gray-900 mb-3 min-w">
                        Title:{item.title}
                      </h1>
                      <p className="leading-relaxed text-black text-xl font-semibold mb-3">
                        {" "}
                        • {item.desc}
                      </p>
                      <p className="leading-relaxed mb-3">Venue:{item.venue}</p>
                      <p className="leading-relaxed mb-3">Time:{item.time}</p>
                      <p className="leading-relaxed mb-3">Date:{item.date}</p>
                      <p className="leading-relaxed mb-3">Posted By:Admin</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <h2 className="text-xl  font-medium text-black py-3 px-5 bg-white">
                No Invitations Found
              </h2>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
