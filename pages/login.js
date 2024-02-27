import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/router";
const Login = () => {
  const router=useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (value, name) => {
    let obj = { [name]: value };
    setFormData({ ...formData, ...obj });
  };
  useEffect(() => {
    if(localStorage.getItem("myuser")){
      router.push("/")
    }
}, [])

  const  handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({
      email: "",
      password: "",
    });
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if(result.success){
      toast.success("Login Successful!");
      localStorage.setItem("myuser", JSON.stringify({token:result.token,email:result.email}));
      setTimeout(()=>{
        router.push("/")
      },2000)

    }else{
      toast.error(result.err);
    }
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
          Login to your account
        </h2>
        <div className="text-center mt-1 ">
          Or{" "}
          <Link href={"/signup"}>
            <span className="text-pink-600 font-semibold cursor-pointer">
              Sign up
            </span>
          </Link>
        </div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST" onSubmit={e=>handleSubmit(e)}>
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
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(e) => handleChange(e.target.value, e.target.name)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
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
              <div className="text-sm">
                <Link href={"/forgot"}>
                  <div className="font-semibold text-pink-600 hover:text-pink-500 cursor-pointer">
                    Forgot password?
                  </div>
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange(e.target.value, e.target.name)}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
            >
              Login
            </button>
          </div>
        </form>


      </div>
    </div>
  );
};

export default Login;
