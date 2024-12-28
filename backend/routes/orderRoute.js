const express = require("express");
const orderrouter = express.Router();
const jwt = require("jsonwebtoken");
const usermodel = require("../model/Auth")
const secret_Key = "asbncjhbcnvhj";
const orderModel = require("../model/order")

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
        const { cart, totalAmount, ShippingAddress } = req.body;
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
            ShippingAddress,
            orderDate: new Date(),
            status: "pending"
        };
        // console.log("hiiii",newOrder);

        const order = await orderModel.create(newOrder)
        const d = await order.save()
        // console.log(order,"hhhh",d);
        
        // Clear the user's cart
        user.cart = [];
        await user.save();
        // console.log(user.cart);

        res.json({ ok: true, message: "Order placed successfully", order: newOrder });
    } catch (error) {
        console.error("Error placing the order:", error);
        res.status(500).json({ message: "Error placing order", error: error.message });
    }
});


orderrouter.get("/ordersummery", async (req, res) => {
    const token = req.headers.authorization?.slice(7); // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, secret_Key);
        req.user = decoded; // Attach decoded user info to the request
        console.log(req.body);
        const userId = req.user.userid;

        // Find the user
        const user = await usermodel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ ok: true, result: user })
        // console.log(user)

    } catch {
        // console.log("error");
        res.status(500).json({ message: 'Server error' })
    }
})

module.exports = orderrouter;
