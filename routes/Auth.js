const express = require("express");

const authController = require("../controller/Auth");
const router = express.Router();

router
  .post("/", authController.createUser)
  .post("/login",authController.loginUser)
  
  exports.router=router