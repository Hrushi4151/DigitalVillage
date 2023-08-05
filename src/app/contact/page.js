"use client";
import React, { useState ,useEffect} from "react";
const page = () => {
  const [verified, setverified] = useState({});
  const [userdata, setuserdata] = useState({name:"",email:"",phone:"",address:"",message:""});

  const verify = async () => {
    const res = await fetch("/api/verify", {
      method: "GET",
      headers: {
        Accept: "Application/json",
        "Content-Type": "application/json",
      },
    });
    const resdata = await res.json();
    if (resdata.status === 200 && resdata.decoded.role==='user') {
      setverified(resdata.decoded);
      setuserdata({name:resdata.decoded.name,email:resdata.decoded.email,phone:resdata.decoded.phone,address:resdata.decoded.address})
    }else if(resdata.status===200 && resdata.decoded.role==='admin'){
      router.push('/admin')
    }
  };
  
  useEffect(() => {
    verify();
  }, []);
  const handleChange = (e) => {
    let name=e.target.name;
    let value=e.target.value;
    setuserdata({...userdata,[name]:value})
  };
  const submitData = (e) => {
    e.preventDefault();
    // let finalmessage = `Name : ${userdata.name} <br>  Email : ${userdata.email} <br>  Message : ${userdata.message} <br>`;
    // Email.send({
    //     Host : "smtp.mailtrap.io",
    //     Username : "hrushitech51@gmail.com",
    //     Password : "C997334C620E608DD6CFB2AABDCED8BD92BC",
    //     To : 'hrushimore4151@gmail.com',
    //     From : "hrushitech51@gmail.com",
    //     Subject : "Mail from website",
    //     Body : "finalmessage"
    //     // Body : finalmessage
    // }).then(
    //   message => alert(message)
    // );
    Email.send({
      Host : "smtp.elasticemail.com",
      Username : "hrushitech51@gmail.com",
      Password : "C997334C620E608DD6CFB2AABDCED8BD92BC",
      To : 'hrushimore4151@gmail.com',
      From : "hrushitech51@gmail.com",
      Subject : `You have Request from ${userdata.name}`,
      // Body : `<h1>hiiii</h1>Message:${userdata.message}`
      Body : `<html>
      <head>
      <meta name="viewport" content="width=device-width" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      </head>
      <body>
      <table  style="background-image: url('https://source.unsplash.com/random/?indianvillage'); width: 100%!important; height: 100%; background-color: #fafafa; padding: 20px; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, 'Lucida Grande', sans-serif;  font-size: 100%; line-height: 1.6;">
      <tr>
      <td></td>
      <td bgcolor="#FFFFFF" style="border: 1px solid #eeeeee; background-color: #ffffff; border-radius:5px; display:block!important; max-width:600px!important; margin:0 auto!important; clear:both!important;"><div style="padding:20px; max-width:600px; margin:0 auto; display:block;">
      <table style="width: 100%;">
      <tr>
      <td><p style="text-align: center; display: block;  padding-bottom:20px;  margin-bottom:20px; border-bottom:1px solid #dddddd;"><img width="70px" height="70px" src="https://source.unsplash.com/random/?crops" style="border-radius:50% "/></p>
      <h1 style="font-weight: 200; font-size: 36px; margin: 20px 0 30px 0; color: #333333;">Details...</h1>
      <h2 style="font-weight: 200; font-size: 16px; margin: 20px 0; color: #333333;">Email:${userdata.email} </h2>
      <h2 style="font-weight: 200; font-size: 16px; margin: 20px 0; color: #333333;">Address:${userdata.address} </h2>
      <h2 style="font-weight: 200; font-size: 16px; margin: 20px 0; color: #333333;">Phone:${userdata.phone} </h2>
      <h3 style="font-weight: 200; font-size: 16px; margin: 20px 0; color: #333333;">Message:${userdata.message}</h3>
      <p style="text-align: center; display: block; padding-top:20px; font-weight: bold; margin-top:30px; color: #666666; border-top:1px solid #dddddd;">DIGITAL VILLAGE</p></td>
      </tr>
      </table>
      </div></td>
      <td></td>
      </tr>
      </table>
      </body>
      </html>`
  }).then(
    message => alert("Successfully sent")
  );
  };
  return (
    <>
      <div className=" w-full md:w-[50vw] bg-white my-5  p-10 mx-auto rounded-xl h-fit">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Contact
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Aute magna irure deserunt veniam aliqua magna enim voluptate.
          </p>
        </div>
        <form method="POST" className="mx-auto mt-16 max-w-xl sm:mt-10">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
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
                  value={verified.name}
                  type="text"
                  name="name"
                  id="first-name"
                  autoComplete="off"
                  required="true"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2.5">
                <input
                  onChange={handleChange}
                  value={verified.email}
                  type="email"
                  name="email"
                  id="email"
                  required="true"
                  autoComplete="off"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
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
                value={verified.phone}
                  type="number"
                  name="phone"
                  id="phone"
                  autoComplete="off"
                  required="true"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Address
              </label>
              <div className="mt-2.5">
                <input
                onChange={handleChange}
                value={verified.address}
                  type="text"
                  name="address"
                  id="address"
                  autoComplete="off"
                  required="true"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="company"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Message
              </label>
              <div className="mt-2.5">
                <textarea
                onChange={handleChange}
                value={userdata.message}
                  type="text"
                  name="message"
                  id="message"
                  autoComplete="off"
                  required="true"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="mt-10">
            <button
            onClick={submitData}
              type="submit"
              className="block w-full rounded-md bg-orange-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default page;
