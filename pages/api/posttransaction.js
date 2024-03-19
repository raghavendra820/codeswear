import Order from "@/models/Order";
import connectDb from "@/middleware/mongoose";
import Product from "@/models/Product";
import PaytmChecksum from "paytmchecksum";

async function handler(req, res) {
  let order;
  //Validate Checksum
  var paytmChecksum = "";
  var paytmParams = {};

  const received_data = req.body;
  for (var key in received_data) {
    if (key == "CHECKSUMHASH") {
      paytmChecksum = received_data[key];
    } else {
      paytmParams[key] = received_data[key];
    }
  }
  var isValidChecksum = PaytmChecksum.verifySignature(
    paytmParams,
    process.env.PAYTM_MKEY,
    paytmChecksum
  );

  if (!isValidChecksum) {
    res.status(400).send("Some error Occurred")
    return
  }

  if (req.body.STATUS == "TXN_SUCCESS") {
    //Update status into orders table after checking transaction status
    order = await Order.findOneAndUpdate(
      { orderId: req.body.ORDERID },
      { status: "Paid", paymentInfo: JSON.stringify(req.body), transactionid:req.body.TXTID }
    );
    let products = order.products;
    for (let slug in products) {
      // products[slug].qty-=products[slug].qty;
      await Product.findOneAndUpdate(
        { slug: slug },
        { $inc: { availableQty: -products[slug].qty } }
      );
    }
  } else if (req.body.STATUS == "TXN_PENDING") {
    order = await Order.findOneAndUpdate(
      { orderId: req.body.ORDERID },
      { status: "Pending", paymentInfo: JSON.stringify(req.body) }
    );
  }
  res.redirect("/order?clearCart=1&id=" + order.id, 200);
}

export default connectDb(handler);
