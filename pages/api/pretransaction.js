const https = require("https");
const PaytmChecksum = require("paytmchecksum");
import Order from "@/models/Order";
import connectDb from "@/middleware/mongoose";

/*
 * import checksum generation utility
 * You can get this utility from https://developer.paytm.com/docs/checksum/
 */

async function handler(req, res) {
  const order = new Order({
    email: req.body.email,
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
            resolve(JSON.parse(response).body);
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
