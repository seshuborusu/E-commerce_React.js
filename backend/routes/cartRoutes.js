const express = require("express")
const usermodel = require("../model/Auth")
const jwt = require("jsonwebtoken")
const secret_Key = "asbncjhbcnvhj";


const cartrouter = express.Router()

cartrouter.post("/cart", async (req, res) => {
   const token = req.headers.authorization?.slice(7); // Extract token from Authorization header

   if (!token) {
       return res.status(401).json({ message: "No token provided" });
   }

   try {
       // Verify the token
       const decoded = jwt.verify(token, secret_Key);
       req.user = decoded; // Attach decoded user info to the request

       const cartdata = req.body;
      //  console.log(cartdata);
       const { quantity, _id } = cartdata; // Destructure quantity and _id from cartdata
       const userId = req.user.userid; // Get user ID from token

       // Find the user
       const user = await usermodel.findById(userId);
       if (!user) {
           return res.status(404).json({ message: "User  not found" });
       }

       // Check if the item already exists in the cart
       const existingItem = user.cart.find(item => item._id == _id); // Ensure comparison is done as strings

       if (existingItem) {
           // If the item exists, update the quantity
           existingItem.quantity += quantity; // Increase the quantity
           await user.save(); // Save the updated user document
           return res.json({ ok: true, result: "Product quantity updated in cart" });
       } else {
           // If the item does not exist, add it to the cart
           user.cart.push(cartdata);
           await user.save(); // Save the updated user document
           return res.json({ ok: true, result: "Product added to cart" });
       }
   } catch (error) {
       // Handle errors
       if (error.name === 'JsonWebTokenError') {
           return res.status(401).json({ message: "Token not valid" });
       } else if (error.name === 'TokenExpiredError') {
           return res.status(401).json({ message: "Token has expired" });
       } else {
           console.error("Error adding to cart:", error);
           return res.status(500).json({ message: "Error adding product to cart", error: error.message });
       }
   }
});


cartrouter.get("/getcartdata", (req, res, next) => {
   const token = req.headers.authorization.slice(7)
   jwt.verify(token, secret_Key, (error, decoded) => {
      if (error) {
         res.json("token not match")
      } else {

         req.user = decoded;
         // console.log(decoded);
         next()
      }
   })
}, async (req, res) => {

   // console.log(req.headers);  
   const userId = req.user.userid;

   const user = await usermodel.findById(userId)
   // console.log(user);
   if (user) {
      res.json({ ok: true, result: user.cart })
      // console.log(user.cart);
   } else if (!user || user.cart.length === 0) {
      res.json({ ok: false, result: "cart is empty" })
   }
   else {
      res.json({ ok: false, result: "user not founf" })
   }
})


cartrouter.delete("/deletecartproduct/:id", (req, res, next) => {
   const token = req.headers.authorization.slice(7)
   jwt.verify(token, secret_Key, (error, decoded) => {
      if (error) {
         res.json("token not match")
      } else {

         req.user = decoded;
         // console.log(decoded);
         next()
      }
   })
}, async (req, res) => {
   const userId = req.user.userid;
   const productId = req.params.id

   const user = await usermodel.findOneAndUpdate({_id:userId},{$pull:{cart:{_id:productId}}},{new:true})
   if(user){
      res.json({ok:true,cart:user.cart,message:"weorking"})
   }else{
      res.status(404).json({ok:false,message:"user not found"})
   }
   // console.log(id);
   
  
   
  

})





// app.put('/api/cart/:productId', authenticateUser , async (req, res) => {
//    const { quantity } = req.body; // Get new quantity from request body
//    const userId = req.user.id; // Access user ID from the decoded JWT
//    const { productId } = req.params; // Get productId from URL parameters

//    try {
//        const user = await User.findById(userId);
//        if (!user) {
//            return res.status(404).json({ message: 'User  not found' });
//        }

//        const cartItem = user.cart.find(item => item.productId.toString() === productId);
//        if (cartItem) {
//            // If the item exists in the cart, update the quantity
//            cartItem.quantity = quantity;
//            await user.save();
//            return res}})



// const existingItem = user.cart.find(item => item._id === _id); // Compare as strings

//    if (existingItem) {
//       // If the item exists, update the quantity
//       existingItem.quantity = (parseInt(existingItem.quantity) + parseInt(quantity)).toString(); // Update quantity
//       await user.save(); // Save the updated user
//       return res.json({ ok: true, result: "Product quantity updated in cart" });
//    } else {
//       // If the item does not exist, add it to the cart
//       const newItem = {
//          _id: _id, // Ensure this is the product ID
//          title: cartdata.title,
//          price: cartdata.price,
//          image: cartdata.image,
//          description: cartdata.description,
//          category: cartdata.category,
//          rating: cartdata.rating,
//          thumbnails: cartdata.thumbnails,
//          quantity: quantity // Ensure quantity is passed correctly
//       };
//       user.cart.push(newItem);
//       await user.save(); // Save the updated user
//       return res.json({ ok: true, result: "Product added to cart" });
//    }
// });

module.exports = cartrouter