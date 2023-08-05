"use client";
import { Space_Mono } from "next/font/google";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const router=useRouter()
  const [userdata, setdata] = useState({
    name: "",
    email: "",
    title: "",
    loc: "",
    desc: "",
  });
  const [img64, setimg] = useState(null);
  const [Allimages, setAllimages] = useState([]);
  const [upload, setupload] = useState(false);
  const [addImage, setAddimage] = useState(false);

  const getImages = async () => {
    const res = await fetch("/api/gallery/getimages", {
      method: "GET",
      headers: {
        Accept: "Application/json",
        "Content-Type": "application/json",
      },
    });

    const resdata = await res.json();
    if(resdata.status==200){
      setAllimages(resdata.Allimages);
    }
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
    console.log(resdata)
    if(resdata.status===200 && resdata.decoded.role==='admin'){
      // setverified(resdata);
    }else if(resdata.status===200 && resdata.decoded.role==='user'){
      router.push('/')
    }else{
      router.push('/login')
    }
  };

  useEffect(() => {
    verify();
    getImages();
  }, [upload]);

  const previewImage = (e) => {
    e.preventDefault();
    let url = URL.createObjectURL(e.target.files[0]);

    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setimg(reader.result);
    };
    reader.onerror = (error) => {
      console.log(error);
    };
  };

  const handleChange = (e) => {
    setdata({ ...userdata, [e.target.name]: e.target.value });
  };

  const dataSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/gallery/addimages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userdata, img64 }),
    });

    const resdata = await res.json();

    if (resdata.status === 200) {
      alert("Image uploaded");
      setdata({
        name: "",
        email: "",
        title: "",
        loc: "",
        desc: "",
      });
      setimg(null);
      setupload(!upload);
    } else if (resdata.status === 201) {
      alert("Please fill all the fields");
    } else if (resdata.status === 203) {
      alert("User not found");
    } else {
      alert("Failde to upload");
    }
  };

  const removeImg = async (id) => {
    console.log(id)
    const res = await fetch("/api/gallery/removeimages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id:id}),
    });

    const resdata = await res.json();
    console.log(resdata)
    if (resdata.status === 200) {
      getImages();
    }
  };

  return (
    <>
      <section className="w-full md:w-[80vw] min-h-screen  mx-auto  text-gray-600 body-font my-8">
        <div className="container p-5 mx-auto">
          <div className="flex flex-col text-center w-full mb-5">
            <h1 className="my-2 uppercase  text-4xl font-sans font-bold bg-white rounded-lg p-2 mx-auto">
              DIGITAL<span className="text-orange-500">VILLAGE</span>
            </h1>
            <span className="uppercase text-2xl text-black font-bold bg-white rounded-lg p-2">
              Gallery
            </span>
          </div>
          <section className="text-gray-600 body-font">
            <button
              onClick={() => setAddimage(!addImage)}
              type="submit"
              className="block  rounded-md bg-orange-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              {addImage ? "Cancel" : "Add New Image"}
            </button>
            {addImage && (
              <div className="container mx-auto flex px-5 py-10 md:flex-row flex-col items-center">
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                  {img64 != null ? (
                    <img
                      className="object-cover object-center rounded"
                      alt="hero"
                      src={img64}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-white border-dashed rounded-lg cursor-pointer bg-gray-800 "
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-white">
                            <span className="font-semibold">
                              Click to upload
                            </span>
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          onChange={previewImage}
                        />
                      </label>
                    </div>
                  )}
                </div>
                <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center ">
                  <form
                    method="POST"
                    className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 p-8 rounded-md bg-white"
                  >
                    <div>
                      <label
                        htmlFor="name"
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
                          id="name"
                          autoComplete="off"
                          required={true}
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
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
                          value={userdata.email}
                          type="email"
                          name="email"
                          id="email"
                          required={true}
                          autoComplete="off"
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
                          required={true}
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="location"
                        className="block text-sm font-semibold leading-6 text-gray-900"
                      >
                        Location
                      </label>
                      <div className="mt-2.5">
                        <input
                          onChange={handleChange}
                          value={userdata.loc}
                          type="text"
                          name="loc"
                          id="location"
                          autoComplete="off"
                          required={true}
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
                          id="description"
                          autoComplete="off"
                          required={true}
                          className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <button
                        onClick={dataSubmit}
                        type="submit"
                        className="block w-full rounded-md bg-orange-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </section>
          <div className="flex flex-wrap m-4 justify-center items-center">
            {(Allimages.length) > 0 ? (
              Allimages.map((item, index) => {
                return (
                  <div key={index} className="lg:w-1/3 sm:w-1/2 p-4">
                    <div className="flex relative rounded-xl overflow-hidden">
                      <img
                        alt="gallery"
                        className="absolute inset-0 w-full h-full object-cover object-center"
                        src={item.img}
                      />
                      <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100 transition-all ease-in-out duration-500">
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                          Title:{item.title}
                        </h1>
                        <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">
                          Location:{item.loc}
                        </h2>
                        <p className="leading-relaxed">{item.desc}</p>
                        <p className="leading-relaxed">Added By:{item.name}</p>
                        <button
                          onClick={() => removeImg(item._id)}
                          type="submit"
                          className="block  rounded-md bg-orange-600 my-2 px-3 py-1 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h2 className="text-black bg-white py-3 px-5">No Images Found</h2>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
