import React from "react";
import Link from "next/link";
import { FaShoppingCart, FaShoppingBag } from "react-icons/fa";
import { LiaGratipay } from "react-icons/lia";
import {
  IoCloseCircleSharp,
  IoAddCircle,
  IoRemoveCircle,
} from "react-icons/io5";
function checkout({ cart, addToCart, removeFromCart, subTotal, clearCart }) {
  return (
    <div className="container sm:m-auto px-2">
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
          />
        </div>
        <div className="w-1/2 mb-4 mx-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
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
          />
        </div>
        <div className="w-1/2 mb-4 mx-4">
          <label htmlFor="city" className="leading-7 text-sm text-gray-600">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
      </div>
      <div className="mx-auto flex my-2">
        <div className="w-1/2 mb-4 mx-4">
          <label htmlFor="State" className="leading-7 text-sm text-gray-600">
            State
          </label>
          <input
            type="text"
            id="State"
            name="State"
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="w-1/2 mb-4 mx-4">
          <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">
            Pincode
          </label>
          <input
            type="phone"
            id="pincode"
            name="pincode"
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
                  <div className=" font-semibold">{cart[k].name}</div>
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
      <button className="flex my-10 text-white bg-pink-500 border-0 py-2 px-2  focus:outline-none hover:bg-pink-600 rounded text-lg">
        <LiaGratipay className="m-1 mr-2" />
        Pay ₹{subTotal}
      </button>
    </div>
  );
}

export default checkout;
