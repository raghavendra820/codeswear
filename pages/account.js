import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";
const Account = () => {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("myuser")) {
      router.push("/");
    }
  }, []);
  const [disabled, setDisabled] = useState(true);
  const [pinCodes, setPinCodes] = useState({});
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    pincode: "",
    phone: "",
    state: "",
    city: "",
  });
  const [password, setPassword] = useState({
    password: "",
    confirmpassword: "",
    newpassword:""
  });

  useEffect(() => {
    if (
      formData.address.length > 3 &&
      formData.name.length > 3 &&
      formData.email.length > 3 &&
      formData.pincode.length > 3 &&
      formData.phone.length > 3
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [
    formData.address,
    formData.name,
    formData.email,
    formData.phone,
    formData.pincode,
  ]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("myuser"));
    if (!user) {
      router.push("/");
    }
    if (user && user.token) {
      setUser(user);
      fetchData(user.token);
      setFormData((prev) => ({ ...prev, email: user.email }));
    }
  }, []);

  const fetchData = async (token) => {
    const data = { token: token };
    const a = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await a.json();
    setFormData(res);
  };

  const handleChange = (name, value) => {
    let obj = { [name]: value };
    setFormData({ ...formData, ...obj });
  };

  const handlePasswordChange = (name, value) => {
    let obj = { [name]: value };
    setPassword({ ...password, ...obj });
  };

  const accountUpdate = async () => {
    const data = {
      token: user.token,
      phone: formData.phone,
      address: formData.address,
      pincode: formData.pincode,
      name: formData.name,
    };
    const a = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/updateuser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const response = await a.json();
    if(response.success == true){
      toast.success('Updated Successfully')
    }
  };

  const handlePasswordSubmit = async () => {
    const data = {
      confirmpassword: password.confirmpassword,
      newpassword: password.newpassword,
      password: password.password,
      email:formData.email
    };
      const a = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_URL}/api/updatepassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const response = await a.json();
      if(response.success === true){
        toast.success('Password Updated Successfully');
        setPassword({
          password: "",
          confirmpassword: "",
          newpassword:""
        })
      }else{
        toast.error(response.error);
        setPassword({
          password: "",
          confirmpassword: "",
          newpassword:""
        })
      }

  };

  return (
    <>
      <div className="container mx-auto my-6">
        <Toaster position="top-center" reverseOrder={false} />
        <h1 className="text-center font-semibold text-2xl">
          Update my Account
        </h1>
        <h2 className="font-bold text-xl my-3">1.Delivery Details</h2>
        <div className="mx-auto flex my-2">
          <div className="w-1/2 mb-4 mx-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              value={formData.name}
            />
          </div>
          <div className="w-1/2 mb-4 mx-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email (Cannot be updated)
            </label>
            {user && user.token ? (
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out read-only:bg-slate-100"
                readOnly={true}
                value={user.email}
              />
            ) : (
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                value={formData.email}
              />
            )}
          </div>
        </div>
        <div className="mx-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600 ">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            rows={2}
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={formData.address}
          />
        </div>
        <div className="mx-auto flex my-2">
          <div className="w-1/2 mb-4 mx-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              Phone
            </label>
            <input
              type="phone"
              id="phone"
              name="phone"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              value={formData.phone}
              placeholder="Enter your 10-digit phone number"
            />
          </div>
          <div className="w-1/2 mb-4 mx-4">
            <label
              htmlFor="pincode"
              className="leading-7 text-sm text-gray-600"
            >
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              value={formData.pincode}
            />
          </div>
        </div>
        <button
          onClick={accountUpdate}
          className="flex my-5  text-white bg-pink-500 border-0 py-1 px-2  focus:outline-none hover:bg-pink-600 rounded text-lg disabled:bg-pink-200"
        >
          Submit
        </button>

        <h2 className="font-bold text-xl my-9">2.Update My Password</h2>
        <div className="mx-auto flex my-2">
          <div className="w-1/2 mb-4 mx-4">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Current Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              onChange={(e) =>
                handlePasswordChange(e.target.name, e.target.value)
              }
              value={password.password}
            />
          </div>
          <div className="w-1/2 mb-4 mx-4">
            <label
              htmlFor="newpassword"
              className="leading-7 text-sm text-gray-600"
            >
              New Password
            </label>
            <input
              type="password"
              id="newpassword"
              name="newpassword"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out "
              value={password.newpassword}
              onChange={(e) =>
                handlePasswordChange(e.target.name, e.target.value)
              }
            />
          </div>
          <div className="w-1/2 mb-4 mx-4">
            <label
              htmlFor="confirmpassword"
              className="leading-7 text-sm text-gray-600"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out "
              value={password.confirmpassword}
              onChange={(e) =>
                handlePasswordChange(e.target.name, e.target.value)
              }
            />
          </div>

        </div>
        <button
          onClick={handlePasswordSubmit}
          className="flex my-5  text-white bg-pink-500 border-0 py-1 px-2  focus:outline-none hover:bg-pink-600 rounded text-lg disabled:bg-pink-200"
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default Account;
