import React, {useEffect, useState } from "react";
import { useRouter } from "next/router";
import Order from "@/models/Order";
import mongoose from "mongoose";

const MyOrder = ({ order, clearCart }) => {
  const [date, setDate] = useState("")
  let products = order.products;
  const router=useRouter();
  useEffect(() => {
    const d=new Date(order.createdAt);
    setDate(d);
    if(router.query.clearCart==1){
      clearCart()
    }
  }, [])

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              CodesWear.com
            </h2>
            <h1 className="text-gray-900 text-xl title-font font-medium mb-4">
              Order Id:{order.orderId}
            </h1>
            <p className="leading-relaxed mb-4">
              Yay!Your order has been successfully placed.<br></br> Your payment status is{" "}
              <b>{order.status}</b>
            </p>
            <p className="leading-relaxed mb-4">
              Order placed on: {date && date.toLocaleString("hi-IN")}
            </p>
            <div className="flex mb-4">
              <a className="flex-grow text-center py-2 text-lg px-1">
                Item Description
              </a>
              <a className="flex-grow text-center border-gray-300 py-2 text-lg px-1">
                Item Quantity
              </a>
              <a className="flex-grow text-center border-gray-300 py-2 text-lg px-1">
                Item Total
              </a>
            </div>
            {Object.keys(order.products).map((key) => {
              return (
                <div key={key} className="flex border-t border-gray-200 py-2">
                  <span className="text-gray-500">
                    {products[key].name}({products[key].size}/
                    {products[key].variant})
                  </span>
                  <span className="m-auto text-gray-900">
                    {products[key].qty}
                  </span>
                  <span className="m-auto text-gray-900">
                    ₹{products[key].price}
                  </span>
                </div>
              );
            })}
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900 my-6">
                SubTotal:₹{order.amount}
              </span>
            </div>

            <div className="my-6">
              <button className="flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">
                Track order
              </button>
            </div>
          </div>
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src="https://images-cdn.ubuy.co.in/6369799f6d3c0f448360aaa5-long-sleeve-striped-t-shirt-men-rainbow.jpg"
          />
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let order = await Order.findById(context.query.id);

  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    },
  };
}

export default MyOrder;
