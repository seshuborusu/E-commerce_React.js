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
        phone: Number,
        zip: Number,
        city: String,
        state: String,
        address: String,
        street: String, // Street address

    },
    paymentStatus: String
})

const orderModel = mongoose.model("order", orderSchema)

module.exports = orderModel