'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const SignUp = () => {

    const router = useRouter();

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        cpassword: "",
    })

    let name, value
    function handleSubmit(e) {
        name = e.target.name
        value = e.target.value
        setUser({ ...user, [name]: value })
    }

    const dataSubmit = async (e) => {
        e.preventDefault();
        
        if(!user.name || !user.email || !user.phone || !user.address || !user.password || !user.cpassword)
        {
            alert("Please enter all fields")
        }
        else{if(user.password === user.cpassword){
            const res = await fetch("/api/signup",{
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                        body: JSON.stringify(user),
              })
            
              const data =await res.status;   
      
              if (data === 403) {
                  window.alert("user already exist")
              }
              else if (data === 400) {
                  window.alert("Invalid Credentials")
              }
              else if (data === 200) {
                  window.alert('Registration succesfull')
                  router.push('/login')
              } else {
                  window.alert("Registration failed")
              }
        }else{
            alert("Confirm password does not match")
        }}
        

    }


    return (
        <section className="bg-transparent my-4">
            <div className="flex flex-col items-center justify-center p-5 mx-auto md:h-screen lg:py-0">
            <h1 className="uppercase pl-5 py-4 text-4xl font-sans font-bold dark:text-white ">DIGITAL<span className='text-orange-500'>VILLAGE</span></h1>

                <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Create and account
                        </h1>
                        <form method='POST' className="space-y-2">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Your Name</label>
                                <input onChange={handleSubmit} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " value={user.name} placeholder="Your Name" required="" autoComplete='off'/>
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                <input onChange={handleSubmit} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " value={user.email} placeholder="name@company.com" required="" autoComplete="off"/>
                            </div>
                            <div>
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 ">Mobile No.</label>
                                <input onChange={handleSubmit} type="text" name="phone" id="phone" placeholder="Mobile Number." className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " value={user.phone} required="" autoComplete='off'/>
                            </div>
                            <div>
                                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 ">Your Address</label>
                                <input onChange={handleSubmit} type="text" name="address" id="address" placeholder="Your Profession" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " value={user.address} required="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                <input onChange={handleSubmit} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " value={user.passsword} required="" />
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 ">Confirm password</label>
                                <input onChange={handleSubmit} type="password" name="cpassword" id="cpassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " value={user.cpassword} required="" />
                            </div>

                            <button onClick={dataSubmit} type="submit" className="w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp
