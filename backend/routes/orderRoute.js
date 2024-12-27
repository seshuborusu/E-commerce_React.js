const express = require("express");
const orderrouter = express.Router();
const jwt = require("jsonwebtoken");
const usermodel = require("../model/Auth")
const secret_Key = "asbncjhbcnvhj";
const orderModel=require("../model/order")

orderrouter.post("/placeorder", async (req, res) => {
    const token = req.headers.authorization?.slice(7); // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, secret_Key);
        req.user = decoded; // Attach decoded user info to the request
        console.log(req.body);
        const { cart, totalAmount, shippingAddress } = req.body;
        const userId = req.user.userid;

        // Find the user
        const user = await usermodel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create order (you can also create an Order model to save the order details)
        const newOrder = {
            cart,
            totalAmount,
            shippingAddress,
            orderDate: new Date(),
            status: "pending"
        };
        // console.log(newOrder);

        const order=await orderModel.create(newOrder)
        const d=await order.save()
        console.log(d);
        // Save the order (you can use an Order model)
        // const order = await ordermodel.create(newOrder);

        // Clear the user's cart
        user.cart = [];
        await user.save();

        res.json({ ok: true, message: "Order placed successfully", order: newOrder });
    } catch (error) {
        console.error("Error placing the order:", error);
        res.status(500).json({ message: "Error placing order", error: error.message });
    }
});

module.exports = orderrouter;
