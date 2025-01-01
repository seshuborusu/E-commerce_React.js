const express = require("express");
const orderrouter = express.Router();
const usermodel = require("../model/Auth")
const orderModel = require("../model/order")
const jwtAuthentication=require("../middleware/token")

orderrouter.post("/placeorder",jwtAuthentication, async (req, res) => {
    try {
        const { cart, totalAmount, ShippingAddress } = req.body;
        const userId = req.id;
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


orderrouter.get("/ordersummery",jwtAuthentication, async (req, res) => {
    try {
        const userId = req.id;
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
