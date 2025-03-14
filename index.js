const express=require("express");
const server=express();
const mongoose = require('mongoose');
const productsRouter=require("./routes/Products")
const brandsRouter=require("./routes/Brands")
const categoriesRouter=require("./routes/Categories")
const authRouter=require("./routes/Auth")
const cartRouter=require("./routes/Cart")
const userRouter=require("./routes/User")
const cors=require("cors")
const orderRouter=require("./routes/Order")
const path = require('path');


//middlewares

server.use(cors({
  exposedHeaders:['X-Total-Count']
}))
server.use(express.json())
server.use('/products',productsRouter.router)
server.use('/brands',brandsRouter.router)
server.use('/categories',categoriesRouter.router)
server.use('/cart',cartRouter.router)
server.use('/users',userRouter.router)
server.use('/auth', authRouter.router);
server.use('/orders',orderRouter.router)
server.use(express.static(path.resolve(__dirname,'dist')))

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
console.log("database connected")
}

server.get('/',(req,res)=>{
    res.json({status:"Success"})
})

server.listen(8080,()=>{
    console.log("Server Started");
})