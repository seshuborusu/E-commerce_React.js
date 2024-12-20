const express = require("express")

const cartmodel = require("../model/cart")
const jwt=require("jsonwebtoken")


const cartrouter = express.Router()

cartrouter.post("/cart", async (req, res) => {
   const cartdata = req.body
   const {quantity} =req.body
   // console.log(cartdata);

   const existingItem = await cartmodel.findById(cartdata._id)

   // console.log(existingItem); 
   if (existingItem) {
      // If the item exists, update the quantity
      existingItem.quantity += quantity; // Increase the quantity
      await existingItem.save(); // Save the updated item
      return res.json({ ok: true, result: "Product quantity updated in cart" });
   } else {

      await cartmodel.create(cartdata)
      res.json({ ok: true, result: "Product Added to cart"})
   }
})


cartrouter.get("/getcartdata",(req,res,next)=>{
   // console.log(req.headers);  
   const token=req.headers.authorization.slice(7)
   console.log(token);
   jwt.verify(token,"jjjjjjjjjjjjj",(error,decode)=>{
      if(error){
         res.json({ok:false,message:"Token not matched"})
         console.log(error);
      }else{
         next()
      }
   })
}, async (req, res) => {
   const data = await cartmodel.find()
   if (data == null) {
      res.json({ ok: false, result: "cart is empty" })
   } else {
      res.json({ ok: true, result: data })
   }
})


cartrouter.delete("/deletecartproduct/:id", async (req, res) => {
   const id = req.params.id
   const d = await cartmodel.deleteOne({ _id: id })
   res.json({ ok: true, result: "deleted Succesfully" })

})
module.exports = cartrouter