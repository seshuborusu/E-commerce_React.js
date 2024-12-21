const mongoose = require("mongoose")

const cartschema = ({
_id:String,
    title: String,
    price: String,
    image: String,
    description: String,
    category: String,
    rating: { rate: Number, count: Number },
    thumbnails: [{ name: String, url: String }],
    quantity: { type: String, required: true, default: 1 },



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