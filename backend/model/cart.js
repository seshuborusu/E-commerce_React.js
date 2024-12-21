
const mongoose=require("mongoose")

const cartschema=new mongoose.Schema({
    _id:{String ,required:true},
    title:String,
    price:String,
    image:String,
    description:String,
    category:String,
    rating:{rate:Number,count:Number},
   thumbnails:[{name:String,url:String}],
   quantity:{ type: String, required: true,default:1 },



})

const cartmodel=mongoose.model("cart",cartschema)

module.exports=cartmodel
module.exports=cartschema