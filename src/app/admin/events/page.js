"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter()
  const [userdata, setdata] = useState({
    name: "",
    email: "",
    phone: "",
    title: "",
    venue: "",
    time: "",
    date: "",
    desc: "",
    category: "",
  });
  const [upload, setupload] = useState(false);
  const [AllEvents, setAllEvents] = useState([]);
  const [addEvent, setaddEvent] = useState([]);

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
    console.log(resdata.decoded.role)
    if(resdata.status===200 && resdata.decoded.role==="admin"){
      getEvents();
      setverified(resdata);
    }else if(resdata.status===200 && resdata.decoded.role==="user"){
      router.push('/')
    }else{
      router.push('/ogin')
    }
  };
  useEffect(() => {
    verify();
  }, [upload]);



  const handleChange = (e) => {
    setdata({ ...userdata, [e.target.name]: e.target.value });
  };

  const dataSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/events/addEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdata),
    });

    const resdata = await res.json();

    if (resdata.status === 200) {
      alert("Event uploaded");
      setdata({
        name: "",
        email: "",
        title: "",
        venue: "",
        phone: "",
        time: "",
        date: "",
        desc: "",
        category: "",
      });
      setupload(!upload);
    } else if (resdata.status === 201) {
      alert("Please fill all the fields");
    } else if (resdata.status === 203) {
      alert("User not found");
    } else {
      alert("Failde to upload");
    }
  };

  const removeEvent = async (id) => {
    const res = await fetch("/api/events/removeEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    const resdata = await res.json();
    console.log(resdata);
    if (resdata.status === 200) {
      getEvents();
    }
  };

  return (
    <>
      <section className="text-gray-600 min-h-screen body-font">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-col text-center w-full md:w-[80vw] mx-auto">
            <h1 className="my-2 uppercase  text-4xl font-sans font-bold bg-white rounded-lg p-2 mx-auto">
              DIGITAL<span className="text-orange-500">VILLAGE</span>
            </h1>
            <span className="uppercase text-2xl text-black font-bold bg-white rounded-lg p-5">
              Events
            </span>
            <button
              onClick={() => setaddEvent(!addEvent)}
              type="submit"
              className="block my-5 mr-auto rounded-md bg-green-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              {addEvent ? "Cancel" : "Add New Event"}
            </button>
          </div>
          {addEvent && (
            <div className="w-[80vw] bg-white rounded-lg shadow dark:border sm:max-w-xl xl:p-0 my-5 mx-auto">
              <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2 m-10">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2.5">
                    <input
                      onChange={handleChange}
                      value={userdata.name}
                      type="text"
                      name="name"
                      id="first-name"
                      autoComplete="off"
                      required="true"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Email
                  </label>
                  <div className="mt-2.5">
                    <input
                      onChange={handleChange}
                      value={userdata.email}
                      type="email"
                      name="email"
                      id="email"
                      required="true"
                      autoComplete="off"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Phone No.
                  </label>
                  <div className="mt-2.5">
                    <input
                      onChange={handleChange}
                      value={userdata.phone}
                      type="number"
                      name="phone"
                      id="phone"
                      autoComplete="off"
                      required="true"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Title
                  </label>
                  <div className="mt-2.5">
                    <input
                      onChange={handleChange}
                      value={userdata.title}
                      type="text"
                      name="title"
                      id="title"
                      autoComplete="off"
                      required="true"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Category
                  </label>
                  <div className="mt-2.5">
                    <input
                      onChange={handleChange}
                      value={userdata.category}
                      type="text"
                      name="category"
                      id="category"
                      autoComplete="off"
                      required="true"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="venue"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Venue
                  </label>
                  <div className="mt-2.5">
                    <input
                      onChange={handleChange}
                      value={userdata.venue}
                      type="text"
                      name="venue"
                      id="venue"
                      autoComplete="off"
                      required="true"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="time"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Time
                  </label>
                  <div className="mt-2.5">
                    <input
                      onChange={handleChange}
                      value={userdata.time}
                      type="time"
                      name="time"
                      id="time"
                      autoComplete="off"
                      required="true"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Date
                  </label>
                  <div className="mt-2.5">
                    <input
                      onChange={handleChange}
                      value={userdata.date}
                      type="date"
                      name="date"
                      id="date"
                      autoComplete="off"
                      required="true"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="desc"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      onChange={handleChange}
                      value={userdata.desc}
                      type="text"
                      name="desc"
                      id="desc"
                      autoComplete="off"
                      required="true"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <button
                    onClick={dataSubmit}
                    type="submit"
                    className="block w-full rounded-md bg-green-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
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
                      <button
                        onClick={() => removeEvent(item._id)}
                        type="submit"
                        className="block  rounded-md bg-orange-600 my-2 px-3 py-1 mx-auto text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <h2 className="text-xl  font-medium text-black py-3 px-5 bg-white">
                No Events Found
              </h2>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
