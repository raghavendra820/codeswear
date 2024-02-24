import Order from "@/models/Order";
import connectDb from "@/middleware/mongoose";

async function handler(req, res) {
  if (req.body.STATUS == "TXN_SUCCESS") {
    const order = await Order.findOneAndUpdate(
      { orderId: req.body.ORDERID },
      { status: "Paid", paymentInfo: JSON.stringify(req.body) }
    );
    res.redirect("/order?id=" + order.id, 200);
  } else if (req.body.STATUS == "TXN_PENDING") {
    const order = await Order.findOneAndUpdate(
      { orderId: req.body.ORDERID },
      { status: "Pending", paymentInfo: JSON.stringify(req.body) }
    );
    res.redirect("/order?id=" + order.id, 200);
  }
}

export default connectDb(handler);
