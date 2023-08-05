'use client'
import React, { useState,useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Page = () => {


    const router = useRouter();
    const verify=async()=>{
        const res = await fetch("/api/verify", {
          method: "GET",
          headers: {
            Accept: "Application/json",
            "Content-Type": "application/json",
          },
        })
        const resdata=await res.json();
        console.log(resdata)
        if(resdata.status===200 && resdata.decoded.role==='user'){
            router.push('/')
          }else if(resdata.status===200 && resdata.decoded.role==='admin'){
            router.push('/admin')
          }else{
            router.push('/adminlogin')
          }
      } 
    useEffect(() => {
        verify()
    }, [])

    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    let name, value
    function handleChange(e) {
        name = e.target.name
        value = e.target.value
        setUser({ ...user, [name]: value })
        console.log(user)
    }

    const dataSubmit = async (e) => {
        e.preventDefault();
        
        if(!user.email || !user.password)
        {
            alert("Please enter all fields")
        }
        else{
            const res = await fetch("/api/adminlogin",{
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                        body: JSON.stringify(user),
              })
            
              const data =await res.json();   
              console.log(data)
              if (data.status === 400) {
                  window.alert("user not found")
              }
              else if (data.status === 201) {
                  window.alert("Invalid Credentials")
              }
              else if (data.status === 200) {
                  window.alert('Registration succesfull')
                  router.push('/admin')
              } else {
                  window.alert("Registration failed")
              }
        }
    }

   

  return (
    <>
    <section className="bg-transparent ">
                <div className="flex flex-col items-center justify-center px-6 py-2 mx-auto md:h-screen ">
                    <h1 className="uppercase pl-5 py-4 text-4xl dark:text-white font-sans font-bold">DIGITAL<span className='text-orange-500'>VILLAGE</span></h1>
                    <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                                Login to Admin account
                            </h1>
                            <form className="space-y-2" method='POST'>
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                    <input onChange={handleChange} value={user.email} autocomplete='off' required={true} type="email" name="email" id="email" className="bg-gray-50 font-bold border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com"  />
                                </div>
                                <div>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                    <input onChange={handleChange} value={user.password} autocomplete='off' required={true} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 font-bold border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "  />
                                </div>
                                <button onClick={dataSubmit} type="submit" className="w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                                <p className="text-sm font-light text-gray-500 ">
                                    Don't have an account yet? <Link href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
    </>
  )
}

export default Page