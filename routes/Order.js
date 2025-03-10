const express = require("express");

const orderController = require("../controller/Order");
const router = express.Router();

router
  .post("/", orderController.createOrder)
  .get("/own/:userId",orderController.fetchOrdersByUser)
  // .delete("/:id",orderController.deleteOrder)
  .get('/',orderController.fetchAllOrders)
  .patch("/:id",orderController.updateOrder
  )
  exports.router=router