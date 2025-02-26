const express = require("express");

const userController = require("../controller/User");
const router = express.Router();

router
  .get("/", userController.fetchUserById)
  // .post("/",authController.loginUser)
  
  exports.router=router