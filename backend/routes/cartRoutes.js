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
      // console.log(cartdata);

      const { quantity, _id } = cartdata; // Destructure quantity and _id from cartdata
      const userId = req.user.userid; // Get user ID from token

      // Find the user
      const user = await usermodel.findById(userId);
      if (!user) {
         return res.status(404).json({ message: "User  not found" });
      }

      // Check if the item already exists in the cart
      const existingItem = user.cart.find(item => item._id == _id); // Ensure comparison is done as strings
      // console.log(existingItem);
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

   try {
      const userId = req.user.userid;
      const user = await usermodel.findById(userId);

      if (user) {
         const cart = user.cart;

         // Calculate Bag Total (subtotal)
         const bagTotal = cart.reduce((total, product) => {
            return total + (product.price * product.quantity);
         }, 0);

         // Savings (for now, assuming a fixed value of 0, you can adjust this logic)
         const savings = 0; // Set savings if you want a dynamic discount logic

         // Shipping and Other Charges (for now, assuming a fixed shipping cost, can be dynamic)
         const shippingCharges = 100; // Adjust this based on your requirements

         // Subtotal is the same as the Bag Total
         const subtotal = bagTotal;

         // Order Total is the subtotal + shipping - savings
         const orderTotal = subtotal + shippingCharges - savings;

         res.json({
            ok: true,
            result: cart,
            priceDetails: {
               bagTotal,
               savings,
               subtotal,
               shippingCharges,
               orderTotal
            }
         });
      } else {
         res.json({ ok: false, result: 'Cart is empty', priceDetails: {} });
      }
   } catch (error) {
      res.status(500).json({ message: 'Server error' });
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

   try {
      const user = await usermodel.findOneAndUpdate({ _id: userId }, { $pull: { cart: { _id: productId } } }, { new: true })
      if (!user) {
         res.status(404).json({ ok: false, message: "user not found" })
      }

      const updatedCart = user.cart;

      const bagTotal = updatedCart.reduce((total, product) => {
         return total + (product.price * product.quantity);
      }, 0);

      // Example savings (you can modify this logic as needed)
      const savings = 0;

      // Shipping charges (can be fixed or calculated dynamically)
      const shippingCharges = 100;

      // Subtotal is same as bag total
      const subtotal = bagTotal;

      // Calculate the order total (subtotal + shipping - savings)
      const orderTotal = subtotal + shippingCharges - savings;

      res.json({
         ok: true,
         cart: updatedCart,
         priceDetails: {
            bagTotal,
            savings,
            subtotal,
            shippingCharges,
            orderTotal
         },
         message: "Cart updated successfully"
      });
   } catch (error) {
      console.error("Error deleting cart product:", error);
      res.status(500).json({ message: "Error deleting product from cart", error: error.message });
   }
   // console.log(id);

})



cartrouter.post("/updatequantity/:id", (req, res, next) => {
   const token = req.headers.authorization.slice(7)
   jwt.verify(token, secret_Key, (error, decode) => {
      if (error) {
         res.json("Token not match")
      } else {
         req.user = decode
         // console.log(decode);
         next()
      }
   })
},
   async (req, res) => {
      const userId = req.user.userid;
      const productId = req.params.id; // The product ID to be updated
      const { quantity } = req.body; // The new quantity to update to
      // console.log(quantity);
      if (!quantity || quantity <= 0) {
         return res.status(400).json({ message: "Invalid quantity" });
      }

      try {
         // Find the user and the cart item
         const user = await usermodel.findById(userId);
         if (!user) {
            return res.status(404).json({ message: "User not found" });
         }

         //  console.log(user);

         const cartItem = user.cart.find(item => item._id == productId);
         if (!cartItem) {
            return res.status(404).json({ message: "Product not found in cart" });
         }
         // console.log(cartItem);
         // Update the quantity of the product
         cartItem.quantity = quantity;
         await user.save();

         // Recalculate price details
         const updatedCart = user.cart;
         const bagTotal = updatedCart.reduce((total, product) => {
            return total + (product.price * product.quantity);
         }, 0);

         // Example savings (you can modify this logic as needed)
         const savings = 0;

         // Shipping charges (can be fixed or calculated dynamically)
         const shippingCharges = 100;

         // Subtotal is same as bag total
         const subtotal = bagTotal;

         // Calculate the order total (subtotal + shipping - savings)
         const orderTotal = subtotal + shippingCharges - savings;

         res.json({
            ok: true,
            message: "Cart updated successfully",
            cart: updatedCart,
            priceDetails: {
               bagTotal,
               savings,
               subtotal,
               shippingCharges,
               orderTotal
            }
         })
      } catch (error) {
         console.error("Error updating cart product:", error);
         res.status(500).json({ message: "Error updating product in cart", error: error.message });
      }

   })


// POST endpoint to merge guest cart with user cart
cartrouter.post("/cart/merge",(req, res, next) => {
   const token = req.headers.authorization.slice(7)
   jwt.verify(token, secret_Key, (error, decode) => {
      if (error) {
         res.json("Token not match")
      } else {
         req.user = decode
         // console.log(decode);
         next()
      }
   })
}, async (req, res) => {
   const userId = req.user.userid; // User ID from token
   const guestCart = req.body.guestCart; // The guest cart sent from the frontend
console.log(guestCart);
   try {
      const user = await usermodel.findById(userId);
      console.log(userId,"hiii");
      if (!user) {
         return res.status(404).json({ message: "User not found" });
      }

      if (!user.cart) {
         user.cart = [];
     }
      // Merge guest cart with user's cart
      guestCart.forEach(guestItem => {
         const existingItem = user.cart.find(item => item._id == guestItem._id);

         if (existingItem) {
            // If item already exists, update the quantity
            existingItem.quantity += guestItem.quantity;
         } else {
            // If item does not exist, add it to the cart
            user.cart.push(guestItem);
         }
      });

      await user.save(); // Save the updated cart to the database
      res.json({ message: "Cart merged successfully", cart: user.cart });
   } catch (error) {
      console.error("Error merging cart:", error);
      res.status(500).json({ message: "Error merging cart" });
   }
});







const mergeGuestCart = () => {
   const guestCart = JSON.parse(localStorage.getItem("cart")) || [];
   const token = localStorage.getItem("token");

   if (guestCart.length > 0 && token) {
      axios.post("http://localhost:1234/routes/cart/merge", { guestCart }, {
         headers: { Authorization: `Bearer ${token}` }
      })
         .then(response => {
            console.log("Cart merged successfully:", response.data);
            localStorage.removeItem("cart"); // Remove guest cart from localStorage
         })
         .catch(error => {
            console.error("Error merging cart:", error);
         });
   }
};

// Example: Call this function after user logs in


module.exports = cartrouter