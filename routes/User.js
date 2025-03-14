const express = require("express");

const userController = require("../controller/User");
const router = express.Router();

router
  .get("/:id", userController.fetchUserById)
  .patch("/:id", userController.updateUser)
  
  exports.router=router