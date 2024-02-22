"use client"
import Link from "next/link";
import React from "react";
import mongoose from "mongoose";
import Product from "@/models/Product";


const hoodies = ({ products }) => {
  return (
    <div>
      <section className="text-gray-600 body-font ">
        <div className="container px-5 py-24 mx-auto">
          {Object.keys(products).length ===0 && <div>Item you are looking for is currently out of stock! Stay Tuned....</div>}
          <div className="flex flex-wrap -m-4 justify-center">
            {Object.keys(products).map((item) => {
              return (
                  <div key={products[item]._id} className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-md m-5">
                    <Link href={`product/${products[item].slug}`}>
                    <div className="block relative rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="m-auto h-[30vh] md:h-[36vh] block "
                        src={products[item].img}
                      />
                    </div>
                    <div className="mt-4 text-center md:text-left ">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        T-Shirt
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {products[item].title}
                      </h2>
                      <p className="mt-1 ">{products[item].price}</p>
                      <div className="mt-1">
                      {products[item].size.includes('S')&& <span className="mx-1 px-1 border border-grey-600">S</span>}
                      {products[item].size.includes('M')&& <span className="mx-1 px-1 border border-grey-600">M</span>}
                      {products[item].size.includes('L')&& <span className="mx-1 px-1 border border-grey-600">L</span>}
                      {products[item].size.includes('XL')&& <span className="mx-1 px-1 border border-grey-600">XL</span>}
                      {products[item].size.includes('XXL')&& <span className="mx-1 px-1 border border-grey-600">XXL</span>}

                      </div>
                      <div className="mt-1">
                        {products[item].color.includes('red')&& <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes('blue')&& <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes('pink')&& <button className="border-2 border-gray-300 ml-1 bg-pink-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes('indigo')&& <button className="border-2 border-gray-300 ml-1 bg-indigo-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes('black')&& <button className="border-2 border-gray-300 ml-1 bg-black-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                        {products[item].color.includes('yellow')&& <button className="border-2 border-gray-300 ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                      </div>
                    </div>
                    </Link>
                  </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  let products = await Product.find({category:"hoodie"});
  let hoodies={};
  for(let item of products){
    if(item.title in hoodies){
      if(!hoodies[item.title].color.includes(item.color) && item.availableQty>0){
        hoodies[item.title].color.push(item.color)
      }
      if(!hoodies[item.title].color.includes(item.size) && item.availableQty>0){
        hoodies[item.title].color.push(item.size)
      }
    }else{
      hoodies[item.title]=JSON.parse(JSON.stringify(item));
      hoodies[item.title].color=[item.color]
      hoodies[item.title].size=[item.size]
    }

  }
  return { props: { products: JSON.parse(JSON.stringify(hoodies)) } };
}

export default hoodies;
