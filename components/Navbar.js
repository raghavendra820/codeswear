import Image from "next/image";
import React from "react";
import Link from "next/link";
import { FaShoppingCart, FaShoppingBag } from "react-icons/fa";
import {
  IoCloseCircleSharp,
  IoAddCircle,
  IoRemoveCircle,
} from "react-icons/io5";
import { RiAccountCircleFill } from "react-icons/ri";
import { useRef } from "react";

const Navbar = ({ cart, addToCart, removeFromCart, subTotal, clearCart }) => {
  const ref = useRef(null);
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (ref.current.classList.contains("translate-x-0")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md z-30 sticky top-0 bg-white">
        <div className="logo mx-5">
          <Link href={"/"}>
            <Image src={"/logo.webp"} width={200} height={40} alt="jjh"></Image>
          </Link>
        </div>
        <div className="nav">
          <ul className="flex space-x-4 items-center font-bold md:text-md">
            <Link href={"/tshirts"} className="hover:text-pink-700">
              <li>Tshirts</li>
            </Link>
            <Link href={"/hoodies"} className="hover:text-pink-700">
              <li>Hoodies</li>
            </Link>
            <Link href={"/stickers"} className="hover:text-pink-700">
              <li>Stickers</li>
            </Link>
            <Link href={"/mugs"} className="hover:text-pink-700">
              <li>Mugs</li>
            </Link>
          </ul>
        </div>
        <div className="flex">
          <div className="absolute right-0 mx-5 top-8 md:top-4 text-xl md:text-3xl cursor-pointer">
            <Link href={"/login"}>
              <RiAccountCircleFill className="mx-6 md:mx-10" />
            </Link>
          </div>
          <div
            className=" absolute right-0 mx-5 top-8 md:top-4 text-xl md:text-3xl cursor-pointer"
            onClick={toggleCart}
          >
            <FaShoppingCart />
          </div>
        </div>
        <div
          ref={ref}
          className={`sideCart absolute right-0 top-0 bg-pink-200 px-8 py-10  ${
            Object.keys(cart).length === 0
              ? "translate-x-full"
              : "translate-x-0"
          } transition-transform w-72 h-[100vh]`}
        >
          <h2 className="font-bold text-xl text-center">
            This is my Shopping Cart
          </h2>
          <p
            className="absolute right-2 top-2 cursor-pointer "
            onClick={toggleCart}
          >
            <IoCloseCircleSharp className="text-pink-500 text-2xl" />
          </p>
          <ol className="list-decimal font-semibold">
            {Object.keys(cart).length === 0 && (
              <div className="mx-auto my-4 font-semibold">
                Your Cart is Empty! Please add some items to chekcout
              </div>
            )}
            {Object.keys(cart).map((k) => {
              return (
                <li key={k}>
                  <div className="item flex my-3">
                    <div className="w-2/3 font-semibold">{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                    <div className="w-1/3 flex justify-center items-center font-semibold">
                      <IoAddCircle
                        className="text-xl text-pink-600 cursor-pointer"
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
          <div className="flex">
            <Link href={"/checkout"}>
              <button className="flex mx-auto my-10 text-white bg-pink-500 border-0 py-2 px-2  focus:outline-none hover:bg-pink-600 rounded text-lg">
                <FaShoppingBag className="m-1 mr-2" />
                Checkout
              </button>
            </Link>
            <button
              className="flex mx-auto my-10 text-white bg-pink-500 border-0 py-2 px-2  focus:outline-none hover:bg-pink-600 rounded text-lg"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
