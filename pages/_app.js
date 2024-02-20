import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [cart,setCart]=useState({})
  const [subTotal,setSubTotal]=useState(0)

  useEffect(() => {
    try {
      if(localStorage.getItem("cart")){
        setCart(JSON.parse(localStorage.getItem("cart")))
      }
    } catch (error) {
      console.log(error);
      localStorage.clear()
    }
  }, [])


  const saveCart=(myCart)=>{
    localStorage.setItem("cart",myCart);
  }

  const removeFromCart=(itemCode,qty,price,name,size,variant)=>{
    let newCart=cart;
    if(itemCode in newCart){
      newCart[itemCode].qty-=qty;
    }
    if(newCart[itemCode].qty<=0){
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  }

  const addToCart=(itemCode,qty,price,name,size,variant)=>{
    let newCart=cart;
    if(itemCode in newCart){
      newCart[itemCode].qty+=qty;
    }else{
      newCart[itemCode]={qty:1,price,name,size,variant}
    }
    setCart(newCart);
    saveCart(newCart);
  }

  const clearCart=()=>{
    setCart({});
    saveCart({});
  }


  return (
    <>
    <Navbar/>
      <Component {...pageProps} />
    <Footer/>
    </>
  );
}
