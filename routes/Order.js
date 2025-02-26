const express = require("express");

const orderController = require("../controller/Order");
const router = express.Router();

router
  .post("/", orderController.createOrder)
  .get("/",orderController.fetchOrdersByUser)
  .delete("/:id",orderController.deleteOrder)
  .patch("/:id",orderController.updateOrder
  )
  exports.router=router