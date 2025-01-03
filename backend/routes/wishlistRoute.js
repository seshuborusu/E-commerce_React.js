// POST /add-to-wishlist/:productId
const express = require("express")
const wishlistModel = require("../model/wishlist")
const jwtAuthentication = require("../middleware/token")

const wishlistRoute = express.Router()
wishlistRoute.post('/add-to-wishlist', jwtAuthentication, async (req, res) => {
    const { userId } = req.id;  // Get userId from the authenticated session or token
    const { product } = req.body;


    try {
        //     // Check if the item is already in the wishlist
        const existingWishlistItem = await wishlistModel.findOne({ userId });

       if (existingWishlistItem) {
            return res.status(400).json({ message: "Item already in wishlist" });
        }
        //console.log(existingWishlistItem);
        //     // Add the product to the wishlist
            const wishlistItem = new wishlistModel({ product });
          await wishlistItem.save();
          console.log(wishlistItem);

          res.status(200).json({ message: "Product added to wishlist", wishlistItem });
    } catch (error) {
            res.status(500).json({ message: "Error adding to wishlist",error });
        
    }});
module.exports = wishlistRoute
