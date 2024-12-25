const mongoose = require("mongoose")
// const cartschema=require("./cart")

const cartschema = ({
_id:String,
    title: String,
    price: Number,
    image: String,
    quantity: { type: Number, required: true, default: 1 }
})

const userschema = mongoose.Schema({

    name: {
        type: String,
        required: true,

    },
    mobile: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    , cart: [cartschema ]
})

const usermodel = mongoose.model("user", userschema)


module.exports = usermodel