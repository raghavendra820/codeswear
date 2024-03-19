import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaShoppingCart, FaShoppingBag } from "react-icons/fa";
import {
  IoCloseCircleSharp,
  IoAddCircle,
  IoRemoveCircle,
} from "react-icons/io5";
import { RiAccountCircleFill } from "react-icons/ri";
import { useRef } from "react";
import { useRouter } from "next/router";

const Navbar = ({
  cart,
  addToCart,
  removeFromCart,
  subTotal,
  clearCart,
  user,
  rerender,
  logout,
}) => {
  const [dropdown, setDropdown] = useState(false);
  const [sideBar, setSideBar] = useState(false);
  const ref = useRef(null);
  const router = useRouter();


  useEffect(() => {
    Object.keys(cart).length === 0 && setSideBar(true);
    let exempted=["/checkout","/orders","/order","myaccount"]
    if(exempted.includes(router.pathname)){
      setSideBar(false)
    }
  }, []);

  // useEffect(() => {
  //   setSideBar(!sideBar);
  // }, [rerender])

  const toggleCart = () => {
    setSideBar(!sideBar);
  };

  return (
    <>
    {dropdown && (
                <span
                  className="absolute text-sm top-10 bg-pink-50  p-4 rounded-md w-32 z-50 right-8"
                  onMouseLeave={() => {
                    setDropdown(false);
                  }}
                  onMouseOver={() => {
                    setDropdown(true);
                  }}
                >
                  <ul>
                    <Link href={"/account"}>
                      <li className="py-1 hover:text-pink-700 font-bold text-l">
                        My account
                      </li>
                    </Link>
                    <Link href={"/orders"}>
                      <li className="py-1 hover:text-pink-700 font-bold">
                        Orders
                      </li>
                    </Link>
                    <li
                      className="py-1 hover:text-pink-700 font-bold  cursor-pointer"
                      onClick={logout}
                    >
                      Logout
                    </li>
                  </ul>
                </span>
              )}
      <div className={`flex flex-col md:flex-row md:justify-start justify-center items-center py-2 shadow-md z-30 sticky top-0 bg-white
      ${!sideBar&& "overflow-hidden"}`} >

        <div className="logo md:mx-5 mr-auto">
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
          <div className="absolute right-0 mx-5 top-6 md:top-2 text-xl md:text-3xl cursor-pointer">
            <div
               onMouseLeave={() => {
                setDropdown(false);
              }}
              onMouseOver={() => {
                setDropdown(true);
              }}
            >

              {user.value && (
                <RiAccountCircleFill className="mx-7 md:mx-10 md:mt-2 " />
              )}
            </div>
            {!user.value && (
              <Link href={"/login"}>
                <button className="px-2 py-1 text-sm bg-pink-500 rounded-md text-white md:mr-10 mr-7 mb-9">
                  Login
                </button>
              </Link>
            )}
          </div>
          <div
            className=" absolute right-0 mx-5 top-6 md:top-4 text-xl md:text-3xl cursor-pointer item-center"
            onClick={toggleCart}
          >
            <FaShoppingCart />
          </div>
        </div>
        <div
          key={rerender}
          ref={ref}
          className={`sideCart absolute  top-0 bg-pink-200 px-8 py-10  ${
            sideBar
              ? "right-0"
              : "-right-96"
          } transition-all w-72 h-[100vh]`}
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
                    <div className="w-2/3 font-semibold">
                      {cart[k].name}({cart[k].size}/{cart[k].variant})
                    </div>
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
              <button
                className="flex mx-auto my-10 text-white bg-pink-500 border-0 py-2 px-2  focus:outline-none hover:bg-pink-600 rounded text-lg disabled:bg-pink-300"
                disabled={Object.keys(cart).length == 0}
              >
                <FaShoppingBag className="m-1 mr-2" />
                Checkout
              </button>
            </Link>
            <button
              className="flex mx-auto my-10 text-white bg-pink-500 border-0 py-2 px-2  focus:outline-none hover:bg-pink-600 rounded text-lg disabled:bg-pink-300"
              onClick={clearCart}
              disabled={Object.keys(cart).length == 0}
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
