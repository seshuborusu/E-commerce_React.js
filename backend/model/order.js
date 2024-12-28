const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    cart: [{
        _id: String,
        title: String,
        price: Number,
        quantity: Number
    }
    ],
    totalAmount: Number,
    ShippingAddress: {
        // user_id:Number,
        name: String, // To store the name of the user
        street: String, // Street address
        city: String,
        state: String,
        zip: Number,
        phoneNumber: Number
    },
    paymentStatus: String
})

const orderModel = mongoose.model("order", orderSchema)

module.exports = orderModel