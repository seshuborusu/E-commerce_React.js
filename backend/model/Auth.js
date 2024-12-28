const mongoose = require("mongoose")
// const cartschema=require("./cart")

const addressSchema = new mongoose.Schema({
    name: { type: String,  },
    street: { type: String,  },
    city: { type: String,  },
    state: { type: String,  },
    zip: { type: String,  },
    phoneNumber: { type: String,  },
    isDefault: { type: Boolean, default: false },  // Optional field to mark the default address
});


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
    , cart: [cartschema ],
    addresses: [addressSchema]
})

const usermodel = mongoose.model("user", userschema)


module.exports = usermodel