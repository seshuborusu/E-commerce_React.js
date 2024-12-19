
const mongoose=require("mongoose")

const cartschema=new mongoose.Schema({
    _id:String,
    title:String,
    price:String,
    image:String,
    description:String,
    category:String,
    rating:{rate:Number,count:Number},
   thumbnails:[{name:String,url:String}]



})

const cartmodel=mongoose.model("cart",cartschema)

module.exports=cartmodel