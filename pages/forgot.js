import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
const Forgot = () => {
  const router = useRouter();
  const [password, setPassword] = useState({
    password: "",
    cpassword: "",
  });
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  const handleChange = (name, value) => {
    let obj = { [name]: value };
    setPassword({ ...password, ...obj });
  };
  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const sendResetEmail = async () => {
    const data = {email,
    sendEmail:true};
    const a = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/forgot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await a.json();
    if(res.success == true){
      toast.success('Password reset instructions are mailed!')
    }else{
      console.log(error)
    }
    // setFormData(res);
  };

  const resetPassword = async () => {
    if(password.cpassword===password.password){
    const data = {password:password.password,
    sendEmail:false};
      const a = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/forgot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await a.json();
      if(res.success == true){
        toast.success('Password Updated Successfully')
      }else{
        console.log(error)
      }
    }else{
      toast.error("Passwords dont match");
    }
  };



  return (
    <div className="flex min-h-screen flex-col justify-center px-4 pt-12 pb-60 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 w-auto"
          src="./logo.png"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Forgot Password
        </h2>
      </div>
      {!router.query.token && (
        <div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6 "
                    onChange={(e) =>
                      handleEmailChange(e.target.name, e.target.value)
                    }
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600 px-2 my-8"
                  onClick={sendResetEmail}
                >
                  Proceed
                </button>
              </div>

          </div>
        </div>
      )}
      {router.query.token && (
        <div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  New Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6 px-2"
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="cpassword"
                  className="block text-sm font-medium leading-6 text-gray-900 mt-5"
                >
                  Confirm Password
                </label>
                <div className="mt-2 ">
                  <input
                    id="cpassword"
                    name="cpassword"
                    type="password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6 px-2 "
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                  />
                </div>
              </div>

              {password.cpassword !== password.password &&
                password.password && (
                  <div className="mx-auto text-center text-red-600 mt-3">
                    Passwords don't match
                  </div>
                )}
              {password.cpassword === password.password &&
                password.password && (
                  <div className="mx-auto text-center text-green-600 mt-3">
                    Passwords are matching
                  </div>
                )}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600 mt-9"
                  onClick={resetPassword}
                >
                  Submit
                </button>
              </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forgot;
