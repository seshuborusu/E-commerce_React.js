const express = require("express")

const cartmodel = require("../model/cart")

const cartrouter = express.Router()
cartrouter.post("/cart", async (req, res) => {
   const cartdata = req.body
   await cartmodel.create(cartdata)
   res.json({ ok: true, result: "Product Added to cart" })
})


cartrouter.get("/getcartdata", async (req, res) => {
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
   res.json({ok:true,result:"deleted Succesfully"})

})
module.exports = cartrouter