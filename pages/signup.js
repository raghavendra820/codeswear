import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/router";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const router=useRouter();
  const handleChange = (value, name) => {
    let obj = { [name]: value };
    setFormData({ ...formData, ...obj });
  };

  useEffect(() => {
    if(localStorage.getItem("token")){
      router.push("/")
    }
}, [])

  const  handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({
      email: "",
      name: "",
      password: "",
    });
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    toast.success("Account Created Successfully!");
    console.log("Success:", result);
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-auto"
          src="./logo.png"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign Up
        </h2>
        <div className="text-center mt-1 ">
          Or{" "}
          <Link href={"/login"}>
            <span className="text-pink-600 font-semibold cursor-pointer">
              Login
            </span>
          </Link>
        </div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                value={formData.email}
                name="email"
                type="email"
                onChange={(e) => handleChange(e.target.value, e.target.name)}
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                value={formData.name}
                type="text"
                autoComplete="name"
                onChange={(e) => handleChange(e.target.value, e.target.name)}
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange(e.target.value, e.target.name)}
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
