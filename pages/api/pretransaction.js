const https = require("https");
const PaytmChecksum = require("paytmchecksum");
import Order from "@/models/Order";
import connectDb from "@/middleware/mongoose";
import Product from "@/models/Product";

/*
 * import checksum generation utility
 * You can get this utility from https://developer.paytm.com/docs/checksum/
 */

async function handler(req, res) {
  if(req.body.subTotal==0){
    res.status(400).json({ success:false,error: "Please build your cart and try again!!" });
    return;
  }
  let product, sumTotal = 0;
  let cart = req.body.cart;
  for (let item in cart) {
    sumTotal += cart[item].price * cart[item].qty;
    product = await Product.findOne({ slug: item  });
    //Check if the cart is tampered with
    if (product.price != cart[item].price) {
      console.log(product.price)
      console.log(cart[item].price)
      res.status(400).json({ success:false,error: "The price of some items in your cart has changed.Please try again!!" });
      return;
    }
    //To check if items are out of stock
    if(product.availableQty < cart[item].qty){
      res.status(400).json({ success:false,error: "Some of the items in your cart are out of stock!" });
      return;
    }
  }
  if(req.body.phone.length != 10 && Number.isInteger(Number(req.body.phone))){
    res.status(400).json({ success:false,error: "Please enter your 10 digit valid number" });
    return;
  }
  if(req.body.pincode.length != 6 && Number.isInteger(Number(req.body.phone))){
    res.status(400).json({ success:false,error: "Please enter your 6 digit valid number" });
    return;
  }

  if (sumTotal != req.body.subTotal) {
    res.status(400).json({ success:false,error: "The price of some items in your cart has changed.Please try again!!" });
    return;
  }

  const order = new Order({
    email: req.body.email,
    orderId: req.body.oid,
    address: req.body.address,
    amount: req.body.subTotal,
    products: req.body.cart,
  });
  await order.save();
  if (req.method === "POST") {
    var paytmParams = {};

    paytmParams.body = {
      requestType: "Payment",
      mid: process.env.NEXT_PUBLIC_PAYTM_MID,
      websiteName: "YOUR_WEBSITE_NAME",
      orderId: req.body.oid,
      callbackUrl: `${process.env.NEXT_PUBLIC_HOST_URL}/api/posttransaction`,
      txnAmount: {
        value: req.body.subTotal,
        currency: "INR",
      },
      userInfo: {
        custId: req.body.email,
      },
    };

    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      process.env.PAYTM_MKEY
    );
    paytmParams.head = {
      signature: checksum,
    };

    var post_data = JSON.stringify(paytmParams);

    const requestAsync = () => {
      return new Promise((resolve, reject) => {
        var options = {
          /* for Staging */
          // hostname: "securegw-stage.paytm.in",

          /* for Production */
          hostname: "securegw.paytm.in",

          port: 443,
          path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MID}&orderId=${req.body.oid}`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": post_data.length,
          },
        };

        var response = "";
        var post_req = https.request(options, function (post_res) {
          post_res.on("data", function (chunk) {
            response += chunk;
          });

          post_res.on("end", function () {
            console.log("Response: ", response);
            let ress=JSON.parse(response).body
            ress.success=true;
            resolve(res);
          });
        });
        post_req.write(post_data);
        post_req.end();
      });
    };

    let myrequest = await requestAsync();
    res.status.json(myrequest);
  }
}

export default connectDb(handler);
