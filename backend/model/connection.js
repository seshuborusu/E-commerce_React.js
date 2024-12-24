const mongoose=require("mongoose")

const productsschema=new mongoose.Schema({
    _id:String,
    title:String,
    price:Number,
    image:String,
    description:String,
    category:String,
    rating:{rate:Number,count:Number},
   thumbnails:[{name:String,url:String}]



})

const productmodel=mongoose.model("product",productsschema)





module.exports=productmodel
