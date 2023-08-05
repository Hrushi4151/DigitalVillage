"use client";
import React, { useState ,useEffect} from "react";
import Link from "next/link";
import { usePathname,useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter()
const [toggleNavbar, settoggleNavbar] = useState(false);
  const pathname=usePathname();
  const paths=["/admin/gallery","/admin/events","/admin/funds","/admin/birthdeath","/admin/invitations","/admin"];
  const [verified, setverified] = useState(null)
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
      setverified(resdata);
      router.push(pathname)
    }
  };
  const logoutuser=async()=>{
    const res = await fetch("/api/verify", {
      method: "POST",
      headers: {
        Accept: "Application/json",
        "Content-Type": "application/json",
      },
      body:{
        token:"<PASSWORD>"
      }
    });
    const resdata = await res.json();
    if(resdata.status===200)
    {
      setverified(null)
      router.push("/login")
    }
  }

  useEffect(() => {
    verify();
  }, [pathname,router])

  

  return (
    <>
      {(!paths.includes(pathname.toString())) ?<header className="body-font rounded-md  bg-black sticky top-0 z-20">
        <div className="container mx-auto flex flex-wrap p-5 md:flex-row items-center justify-between">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-orange-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl text-white">DigitalVillage</span>
          </a>
          <nav className="hidden md:ml-auto md:mr-auto md:flex flex-wrap items-center text-base justify-center">
            <Link
              href={"/"}
              className="mx-3  px-3 text-lg rounded-md font-semibold bg-white border-2 border-black hover:bg-orange-400 transition-all ease-in-out duration-200  text-black"
            >
              Home
            </Link>
            <Link
              href={"/gallery"}
              className="mx-3  px-3 text-lg rounded-md font-semibold bg-white border-2 border-black hover:bg-orange-400 transition-all ease-in-out duration-200  text-black"
            >
              Gallery
            </Link>
            <Link
              href={"/invitations"}
              className="mx-3  px-3 text-lg rounded-md font-semibold bg-white border-2 border-black hover:bg-orange-400 transition-all ease-in-out duration-200  text-black"
            >
              Invitations
            </Link>
            <Link
              href={"/events"}
              className="mx-3  px-3 text-lg rounded-md font-semibold bg-white border-2 border-black hover:bg-orange-400 transition-all ease-in-out duration-200  text-black"
            >
              Events
            </Link>
            <Link
              href={"/about"}
              className="mx-3  px-3 text-lg rounded-md font-semibold bg-white border-2 border-black hover:bg-orange-400 transition-all ease-in-out duration-200  text-black"
            >
              About
            </Link>
            <Link
              href={"/contact"}
              className="mx-3  px-3 text-lg rounded-md font-semibold bg-white border-2 border-black hover:bg-orange-400 transition-all ease-in-out duration-200  text-black"
            >
              Contact
            </Link>
          </nav>
          <div className="flex flex-row justify-center items-center ">
            { verified==null ? <div><Link href="/adminlogin" className=" md:inline-flex hidden items-center bg-orange-400 border-0 py-1 px-4 focus:outline-none hover:bg-gray-200 hover:text-gray-400 rounded text-base  font-bold text-white m-2">Admin</Link>
            <Link href="/login" className=" md:inline-flex hidden items-center bg-orange-400 border-0 py-1 px-4 focus:outline-none hover:bg-gray-200 rounded text-base hover:text-gray-400 font-bold text-black m-2">
              Login
            </Link></div>:<Link onClick={logoutuser} href="/" className=" md:inline-flex hidden items-center bg-orange-400 border-0 py-1 px-4 focus:outline-none hover:bg-gray-200 rounded text-base hover:text-gray-400 font-bold text-black m-2">
              Logout
            </Link>}
            
            <button
              onClick={() => settoggleNavbar(!toggleNavbar)}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 mx-4 "
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={` w-[100vw] flex flex-col md:hidden justify-center items-start ${
              toggleNavbar ? " " : "h-0"
            } overflow-hidden transition ease-in-out  delay-150`}
          >
            <Link
              href={"/"}
              className="px-3 py-1 my-1 text-lg  font-semibold  text-white w-full border border-gray-400 rounded-md"
            >
              Home
            </Link>
            <Link
              href={"/gallery"}
              className="px-3 py-1 my-1 text-lg  font-semibold  text-white w-full border border-gray-400 rounded-md"
            >
              Gallery
            </Link>
            <Link
              href={"/invitations"}
              className="px-3 py-1 my-1 text-lg  font-semibold  text-white w-full border border-gray-400 rounded-md"
            >
              Invitations
            </Link>
            <Link
              href={"/events"}
              className="px-3 py-1 my-1 text-lg  font-semibold  text-white w-full border border-gray-400 rounded-md"
            >
              Events
            </Link>
            <Link
              href={"/about"}
              className="px-3 py-1 my-1 text-lg  font-semibold   text-white  w-full border border-gray-400 rounded-md"
            >
              About
            </Link>
            <Link
              href={"/contact"}
              className="px-3 py-1 my-1 text-lg  font-semibold     text-white w-full border border-gray-400 rounded-md"
            >
              Contact
            </Link>
            <div className="flex flex-row  items-center">
            { verified==null ? <div><Link href="/adminlogin" className=" md:inline-flex hidden items-center bg-orange-400 border-0 py-1 px-4 focus:outline-none hover:bg-gray-200 hover:text-gray-400 rounded text-base  font-bold text-white m-2">Admin</Link>
            <Link href="/login" className=" md:inline-flex hidden items-center bg-orange-400 border-0 py-1 px-4 focus:outline-none hover:bg-gray-200 rounded text-base hover:text-gray-400 font-bold text-black m-2">
              Login
            </Link></div>:<Link onClick={logoutuser} href="/" className=" md:inline-flex hidden items-center bg-orange-400 border-0 py-1 px-4 focus:outline-none hover:bg-gray-200 rounded text-base hover:text-gray-400 font-bold text-black m-2">
              Logout
            </Link>}
            </div>
          </div>
        </div>
      </header>:
      <header className="body-font rounded-md  bg-black sticky top-0 z-20">
      <div className="container mx-auto flex flex-wrap p-5 md:flex-row items-center justify-between">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-orange-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <p className="text-white font-bold"><span className="mx-2 text-xl text-white">DigitalVillage</span>|<span className="mx-2 text-xl text-white">Admin</span></p>
        </a>
        <nav className="hidden md:ml-auto md:mr-auto md:flex flex-wrap items-center text-base justify-center">
          <Link
            href={"/admin"}
            className="mx-3  px-3 text-lg rounded-md font-semibold bg-white border-2 border-black hover:bg-orange-400 transition-all ease-in-out duration-200  text-black"
          >
            Home
          </Link>
          <Link
            href={"/admin/gallery"}
            className="mx-3  px-3 text-lg rounded-md font-semibold bg-white border-2 border-black hover:bg-orange-400 transition-all ease-in-out duration-200  text-black"
          >
            Gallery
          </Link>
          <Link
            href={"/admin/invitations"}
            className="mx-3  px-3 text-lg rounded-md font-semibold bg-white border-2 border-black hover:bg-orange-400 transition-all ease-in-out duration-200  text-black"
          >
            Invitations
          </Link>
          <Link
            href={"/admin/events"}
            className="mx-3  px-3 text-lg rounded-md font-semibold bg-white border-2 border-black hover:bg-orange-400 transition-all ease-in-out duration-200  text-black"
          >
            Events
          </Link>
          <Link
            href={"/admin/funds"}
            className="mx-3  px-3 text-lg rounded-md font-semibold bg-white border-2 border-black hover:bg-orange-400 transition-all ease-in-out duration-200  text-black"
          >
            Funds
          </Link>
        </nav>
        <div className="flex flex-row justify-center items-center ">
        { verified==null ? <div><Link href="/adminlogin" className=" md:inline-flex hidden items-center bg-orange-400 border-0 py-1 px-4 focus:outline-none hover:bg-gray-200 hover:text-gray-400 rounded text-base  font-bold text-white m-2">Admin</Link>
            <Link href="/login" className=" md:inline-flex hidden items-center bg-orange-400 border-0 py-1 px-4 focus:outline-none hover:bg-gray-200 rounded text-base hover:text-gray-400 font-bold text-black m-2">
              Login
            </Link></div>:<Link onClick={logoutuser} href="/" className=" md:inline-flex hidden items-center bg-orange-400 border-0 py-1 px-4 focus:outline-none hover:bg-gray-200 rounded text-base hover:text-gray-400 font-bold text-black m-2">
              Logout
            </Link>}
          <button
            onClick={() => settoggleNavbar(!toggleNavbar)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 mx-4 "
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={` w-[100vw] flex flex-col md:hidden justify-center items-start ${
            toggleNavbar ? " " : "h-0"
          } overflow-hidden transition ease-in-out  delay-150`}
        >
          <Link
            href={"/admin"}
            className="px-3 py-1 my-1 text-lg  font-semibold  text-white w-full border border-gray-400 rounded-md"
          >
            Home
          </Link>
          <Link
            href={"/admin/gallery"}
            className="px-3 py-1 my-1 text-lg  font-semibold  text-white w-full border border-gray-400 rounded-md"
          >
            Gallery
          </Link>
          <Link
            href={"/admin/invitations"}
            className="px-3 py-1 my-1 text-lg  font-semibold  text-white w-full border border-gray-400 rounded-md"
          >
            Invitations
          </Link>
          <Link
            href={"/admin/events"}
            className="px-3 py-1 my-1 text-lg  font-semibold   text-white  w-full border border-gray-400 rounded-md"
          >
            Events
          </Link>
          <Link
            href={"/admin/funds"}
            className="px-3 py-1 my-1 text-lg  font-semibold     text-white w-full border border-gray-400 rounded-md"
          >
            Funds
          </Link>
          <div className="flex flex-row  items-center">
          { verified==null ? <div><Link href="/adminlogin" className=" md:inline-flex hidden items-center bg-orange-400 border-0 py-1 px-4 focus:outline-none hover:bg-gray-200 hover:text-gray-400 rounded text-base  font-bold text-white m-2">Admin</Link>
            <Link href="/login" className=" md:inline-flex hidden items-center bg-orange-400 border-0 py-1 px-4 focus:outline-none hover:bg-gray-200 rounded text-base hover:text-gray-400 font-bold text-black m-2">
              Login
            </Link></div>:<Link onClick={logoutuser} href="" className=" md:inline-flex hidden items-center bg-orange-400 border-0 py-1 px-4 focus:outline-none hover:bg-gray-200 rounded text-base hover:text-gray-400 font-bold text-black m-2">
              Logout
            </Link>}
          </div>
        </div>
      </div>
    </header>
      }
    </>
  );
};

export default Navbar;
