import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { Router, useRouter } from "next/router";
import { useState, useEffect } from "react";
import LoadingBar from 'react-top-loading-bar'

export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);
  const [progress, setProgress] = useState(0)





  const router = useRouter();
  useEffect(() => {
    router.events.on('routeChangeStart', ()=>{
      setProgress(50);
    })//On to subscribe to a event

    router.events.on('routeChangeComplete', ()=>{
      setProgress(100);
    })

    const myuser=JSON.parse(localStorage.getItem("myuser"))
    if(myuser){
      setUser({value:myuser.token, email: myuser.email})
      setKey(Math.random())
    }
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }
  }, [router.query]);

  const logout= ()=>{
    localStorage.removeItem("myuser")
    // setKey(Math.random())
     setUser({ value: null })
     router.push("/")
     clearCart();
  }
  const buyNow = (itemCode, qty, price, name, size, variant) => {
    let newCart ={}
    newCart[itemCode] =  { qty: 1, price, name, size, variant } ;

    setCart(newCart);
    saveCart(newCart);
    router.push("/checkout");
  };

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].qty * myCart[keys[i]].price;
    }
    setSubTotal(subt);
  };

  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if (itemCode in newCart) {
      newCart[itemCode].qty -= qty;
    }
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if (itemCode in newCart) {
      newCart[itemCode].qty += qty;
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, variant };
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
  };

  return (
    <>
     <LoadingBar
        color='#ff2d55'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        waitingTime={300}
      />
      <Navbar
        cart={cart}
        clearCart={clearCart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        saveCart={saveCart}
        subTotal={subTotal}
        buyNow={buyNow}
        user={user}
        logout={logout}
      />
      <Component
        {...pageProps}
        cart={cart}
        clearCart={clearCart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        saveCart={saveCart}
        subTotal={subTotal}
        buyNow={buyNow}
        user={user}
      />
      <Footer />
    </>
  );
}
