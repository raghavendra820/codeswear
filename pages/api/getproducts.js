import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";
import mongoose from "mongoose";

const handler= async(req,res)=>{
  let products=await Product.find();
  let tshirts={};
  for(let item of products){
    if(item.title in tshirts){
      if(!tshirts[item.title].color.includes(item.color) && item.availableQty>0){
        tshirts[item.title].color.push(item.color)
      }
      if(!tshirts[item.title].color.includes(item.size) && item.availableQty>0){
        tshirts[item.title].color.push(item.size)
      }
    }else{
      tshirts[item.title]=JSON.parse(JSON.stringify(item));
      tshirts[item.title].color=[item.color]
      tshirts[item.title].size=[item.size]
    }

  }
  res.status(400).json({tshirts})
}

export default connectDb(handler);