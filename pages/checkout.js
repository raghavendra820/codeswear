import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaShoppingCart, FaShoppingBag } from "react-icons/fa";
import { LiaGratipay } from "react-icons/lia";
import { Toaster, toast } from "react-hot-toast";
import {
  IoCloseCircleSharp,
  IoAddCircle,
  IoRemoveCircle,
} from "react-icons/io5";
import Head from "next/head";
import Script from "next/script";
import { Router, useRouter } from "next/router";

function Checkout({ cart, addToCart, removeFromCart, subTotal, clearCart }) {
  const [disabled, setDisabled] = useState(true);
  const [pinCodes, setPinCodes] = useState({});
  const [user, setUser] = useState({});
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    pincode: "",
    phone: "",
    state: "",
    city: "",
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
      setFormData((prev) => ({ ...prev, email: user.email }));
      fetchData(user.token);
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
    setFormData((prevState) => ({
      ...prevState,
      pincode: res.pincode,
      name: res.name,
      email: res.email,
      address: res.address,
      phone: res.phone,
    }));
    getPincode(res.pincode);
  };

  const getPincode = async (pincode) => {
    const data = await fetch(`${process.env.NEXT_PUBLIC_HOST_URL}/api/pincode`);
    const res = await data.json();
    setPinCodes(res);

    if (Object.keys(res).includes(pincode)) {
      setFormData((prevState) => ({
        ...prevState,
        state: res[pincode][1],
        city: res[pincode][0],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        state: "",
        city: "",
      }));
    }
  };

  const handleChange = (name, value) => {
    let obj = { [name]: value };
    setFormData({ ...formData, ...obj });
    if (name == "pincode") {
      if (value.length == 6) {
        getPincode(value);
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        state: "",
        city: "",
      }));
    }
  };
  const initiatePayment = async () => {
    let amount;
    let oid = Math.floor(Math.random() * Date.now());
    const data = {
      cart,
      subTotal,
      oid,
      email: formData.email,
      name: formData.name,
      pincode: formData.pincode,
      address: formData.address,
      phone: formData.phone,
    };
    const a = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/pretransaction`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const txnRes = await a.json();
    if (txnRes.success == true) {
      const txnToken = txnRes.txnToken;
      var config = {
        root: "",
        flow: "DEFAULT",
        data: {
          orderId: oid,
          token: "",
          tokenType: txnToken,
          amount: subTotal,
        },
        handler: {
          notifyMerchant: function (eventName, data) {
            console.log("notifyMerchant handler function called");
            console.log("eventName => ", eventName);
            console.log("data => ", data);
          },
        },
      };
      window.Paytm.CheckoutJS.init(config)
        .then(function onSuccess() {
          // after successfully updating configuration, invoke JS Checkout
          window.Paytm.CheckoutJS.invoke();
        })
        .catch(function onError(error) {
          console.log("error => ", error);
        });
    } else {
      if (txnRes.cartClear == true) {
        clearCart();
      }

      toast.error(txnRes.error);
    }
  };
  return (
    <div className="container sm:m-auto px-2">
      <Toaster position="top-center" reverseOrder={false} />
      <Head>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0"
        />
      </Head>
      <Script
        type="application/javascript"
        src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`}
        // onload="onScriptLoad();"
        crossorigin="anonymous"
      ></Script>
      <h1 className="text-3xl font-bold my-4 text-center">Checkout</h1>
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
            Email
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
          <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">
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
      <div className="mx-auto flex my-2">
        <div className="w-1/2 mb-4 mx-4">
          <label htmlFor="state" className="leading-7 text-sm text-gray-600">
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out read-only:bg-slate-100"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={formData.state}
            readOnly={true}
          />
        </div>
        <div className="w-1/2 mb-4 mx-4">
          <label htmlFor="city" className="leading-7 text-sm text-gray-600">
            District
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out read-only:bg-slate-100"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={formData.city}
            readOnly={true}
          />
        </div>
      </div>
      <h2 className="font-bold text-xl my-3">2.Review Cart Items</h2>
      <div className="sideCart bg-pink-200 p-6 my-2 ">
        <h2 className="font-bold text-xl text-center">
          This is my Shopping Cart
        </h2>
        <p className="absolute right-2 top-2 cursor-pointer ">
          <IoCloseCircleSharp className="text-pink-500 text-2xl" />
        </p>
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length === 0 && (
            <div className="mx-auto my-4 font-semibold">
              Your Cart is Empty! Please add some items to checkout
            </div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k}>
                <div className="item flex m-5">
                  <div className=" font-semibold">
                    {cart[k].name}({cart[k].size}/{cart[k].variant})
                  </div>
                  <div className=" ml-20 flex justify-center items-center font-semibold">
                    <IoAddCircle
                      className="w-1/3 text-xl text-pink-600 cursor-pointer"
                      onClick={() => {
                        addToCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].variant
                        );
                      }}
                    />
                    <span className="mx-2">{cart[k].qty}</span>
                    <IoRemoveCircle
                      className="text-xl text-pink-600 cursor-pointer"
                      onClick={() => {
                        removeFromCart(
                          k,
                          1,
                          cart[k].price,
                          cart[k].name,
                          cart[k].variant
                        );
                      }}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <span className="subtotal font-bold">Subtotal:₹{subTotal}</span>
      </div>
      <button
        onClick={initiatePayment}
        disabled={disabled}
        className="flex my-10 text-white bg-pink-500 border-0 py-2 px-2  focus:outline-none hover:bg-pink-600 rounded text-lg disabled:bg-pink-200"
      >
        Pay ₹{subTotal}
        <LiaGratipay className="m-1 " />
      </button>
    </div>
  );
}

export default Checkout;
