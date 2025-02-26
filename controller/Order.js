const model = require("../model/Order");
const Order = model.Order;

exports.createOrder = async (req, res) => {
  const order = new Order(req.body);
  try {
    const doc = await order.save();
    const result=await doc.populate("product")
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};


exports.fetchOrdersByUser = async (req, res) => {
 const {user}=req.query
  try {
    const orders = await Order.find({user:user});
    res.status(200).json(orders);
  } catch (err) {
    console.error({ err });
    res.status(400).json(err);
  }
};


exports.updateOrder = async (req, res) => {
  const {id}=req.params
   try {
     const order = await Order.findByIdAndUpdate(id,req.body,{new:true});
     res.status(200).json(order);
   } catch (err) {
     console.error({ err });
     res.status(400).json(err);
   }
 };
 

 
exports.deleteOrder = async (req, res) => {
  const {id}=req.params
   try {
     const doc = await Order.findByIdAndDelete(id);
     res.status(200).json(doc);
   } catch (err) {
     console.error({ err });
     res.status(400).json(err);
   }
 };