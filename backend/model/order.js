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
        type: String
    },
    paymentStatus: String
})

const orderModel = mongoose.model("order", orderSchema)

module.exports = orderModel