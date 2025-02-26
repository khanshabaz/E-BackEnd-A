const express = require("express");

const cartController = require("../controller/Cart");
const router = express.Router();

router
  .post("/", cartController.addToCart)
  .get("/",cartController.fetchCartByUser)
  .delete("/:id",cartController.deleteFromCart)
  .patch("/:id",cartController.updateCart
  )
  exports.router=router