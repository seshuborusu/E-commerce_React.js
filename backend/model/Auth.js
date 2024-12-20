const mongoose = require("mongoose")

const userschema = mongoose.Schema({
    name: {
        type: String,
        require: true,

    },
    mobile: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

const usermodel = mongoose.model("user", userschema)


module.exports = usermodel