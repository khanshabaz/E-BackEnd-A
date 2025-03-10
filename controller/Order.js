const model = require("../model/Order");
const Order = model.Order;

exports.createOrder = async (req, res) => {
  const order = new Order(req.body);
  try {
    const doc = await order.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};


exports.fetchOrdersByUser = async (req, res) => {
 const {userId}=req.params
 console.log(userId)
  try {
    const orders = await Order.find({user:userId});
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


 exports.fetchAllOrders = async (req, res) => {
 
  let query = Order.find({deleted:{$ne:true}});
  let totalOrdersQuery = Order.find({deleted:{$ne:true}});

  

  const totalDocs = await totalOrdersQuery.countDocuments().exec();
  console.log({ totalDocs });

  if (req.query._page && req.query._per_page) {
    const pageSize = req.query._per_page;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const docs = await query.exec();
    res.set('X-Total-Count', totalDocs);
    res.status(200).json(docs);
  } catch (err) {
    res.status(400).json(err);
  }
};