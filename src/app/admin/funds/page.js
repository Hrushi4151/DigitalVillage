"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";


const page = () => {
  const router=useRouter()
  const [userdata, setdata] = useState({
    name: "",
    email: "",
    fundname: "",
    fundtype: "",
    date: "",
    desc: "",
    amount: "",
    objectives: "",
  });
  const [upload, setupload] = useState(false);
  const [AllFunds, setAllFunds] = useState([]);
  const [addFund, setaddFund] = useState(false);

  const getFunds = async () => {
    const res = await fetch("/api/funds/getFund", {
      method: "GET",
      headers: {
        Accept: "Application/json",
        "Content-Type": "application/json",
      },
    });

    const resdata = await res.json();
    console.log(resdata)
    setAllFunds(resdata.AllFunds);
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
    if(resdata.status===200 && resdata.decoded.role==='admin'){
      getFunds();
    }else if(resdata.status===200 && resdata.decoded.role==='user'){
      router.push('/')
    }else{
      router.push('/adminlogin')
    }
  };
  useEffect(() => {
    verify();
  }, [upload]);

  const handleChange = (e) => {
    setdata({ ...userdata, [e.target.name]: e.target.value });
    console.log(userdata)
  };

  const dataSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/funds/addFund", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdata),
    });

    const resdata = await res.json();

    if (resdata.status === 200) {
      alert("Fund uploaded");
      setdata({
        name: "",
        email: "",
        fundname: "",
        fundtype: "",
        date: "",
        desc: "",
        amount: "",
        objectives: "",
      });
      setupload(!upload);
    } else if (resdata.status === 201) {
      alert("Please fill all the fields");
    } else if (resdata.status === 203) {
      alert("User not found");
    } else {
      alert("Failed to upload");
    }
  };

  const removeFund = async (id) => {
    const res = await fetch("/api/funds/removeFund", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    const resdata = await res.json();
    console.log(resdata);
    if (resdata.status === 200) {
      getFunds();
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
              Funds
            </span>
            <button
              onClick={() => setaddFund(!addFund)}
              type="submit"
              className="block my-5 mr-auto rounded-md bg-green-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              {addFund ? "Cancel" : "Add New Fund"}
            </button>
          </div>
          {addFund && (
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
                    htmlFor="fund-name"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                   Fund Name
                  </label>
                  <div className="mt-2.5">
                    <input
                      onChange={handleChange}
                      value={userdata.fundname}
                      type="text"
                      name="fundname"
                      id="fundname"
                      autoComplete="off"
                      required="true"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="fundtype"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Fund Type
                  </label>
                  <div className="mt-2.5">
                    <input
                      onChange={handleChange}
                      value={userdata.fundtype}
                      type="text"
                      name="fundtype"
                      id="fundtype"
                      autoComplete="off"
                      required="true"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="objectives"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Objectives
                  </label>
                  <div className="mt-2.5">
                    <input
                      onChange={handleChange}
                      value={userdata.objectives}
                      type="text"
                      name="objectives"
                      id="objectives"
                      autoComplete="off"
                      required="true"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="amount"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                  >
                    Amount
                  </label>
                  <div className="mt-2.5">
                    <input
                      onChange={handleChange}
                      value={userdata.amount}
                      type="number"
                      name="amount"
                      id="amount"
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
          
          

          <section className="text-gray-600 body-font">
  <div className="container px-5 py-4 mx-auto">
    <div className="flex flex-col text-center w-full md:w-[80vw] mx-auto mb-10">
      <h1 className="sm:text-4xl text-3xl title-font mb-2 text-gray-900 bg-white p-2 mx-auto rounded-lg font-bold">Fundings</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base bg-white rounded-lg p-1"> sample Banh mi cornhole echo park skateboard authentic crucifix neutra tilde lyft biodiesel artisan direct trade mumblecore 3 wolf moon twee</p>
    </div>
    <div className="lg:w-2/3 w-full mx-auto overflow-auto">
      <table className="table-auto w-full text-left whitespace-no-wrap bg-white">
        <thead>
          <tr>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">Fund Name</th>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Type</th>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Date</th>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Objective</th>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Description</th>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Amount</th>
            <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Remove</th>
          </tr>
        </thead>
        <tbody>
          {AllFunds.length>0 ? AllFunds.map((item)=>{
            return(
            <tr className=''>
            <td className="px-4 py-3">{item.fundname} </td>
            <td className="px-4 py-3">{item.fundtype}</td>
            <td className="px-4 py-3">{item.date}</td>
            <td className="px-4 py-3 text-lg text-gray-900">{item.objectives}</td>
            <td className="v">{item.desc}</td>
            <td className="px-4 py-3">{item.amount}</td>
            <td className=" text-center "><span onClick={()=>removeFund(item._id)} className="cursor-pointer text-xl text-black ">🗑️</span></td>
          </tr>)
          }):<h2 className="my-2 uppercase  text-xl bg-white p-2 mx-auto">
          No Fundings Found
        </h2>}
        </tbody>
      </table>
    </div>
  </div>
</section>
</div>

        </div>
      </section>
    </>
  );
};

export default page;
