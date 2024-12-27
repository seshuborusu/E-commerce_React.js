const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const productmodel = require("../backend/model/connection")
const cartrouter=require("../backend/routes/cartRoutes")
const userroute = require("./routes/authRoute")
const orderrouter=require("./routes/orderRoute")



const app = express()

app.use(cors())
app.use(express.json())

async function connectDb() {
    await mongoose.connect("mongodb://localhost:27017/productsdb")
    


}

connectDb()


app.use("/routes",cartrouter) //

app.use("/routes",cartrouter)

app.use("/routes",cartrouter)

app.use("/routes",userroute) //post users signup

app.use("/routes",userroute) //get for login http://localhost:1234/routes/getuser

app.use("/routes",cartrouter)

app.use("/routes",userroute)

app.use("/routes",orderrouter)

app.post("/addproduct", async (req, res) => {
    const data = req.body
    const response = await productmodel.create(data)
    res.json(response)
})

app.get("/getproducts", async (req, res) => {
    const data = await productmodel.find()
    res.json(data)
})


app.get("/getsingleproduct/:id", async (req, res) => {

    const ids = req.params.id

    const data = await productmodel.findById(ids)
    if (data == null) {
        res.json({
            ok: false, result: "User not Found"
        })
    } else {
        res.json({ ok: true, result: data })
    }
})

app.get("/getelectronics",async(req,res)=>{
   const data=await productmodel.find({category: 'electronics'})
   res.json(data);
})

app.get("/getjewelery",async(req,res)=>{
   const data=await productmodel.find({ category: 'jewelery'})
   res.json(data)
})

app.get("/getmensclothing",async(req,res)=>{
    const data=await productmodel.find({category: "men's clothing"})
    res.json(data)
})

app.get("/getwomensclothing",async(req,res)=>{
    const data=await productmodel.find({category: "women's clothing"})
    res.json(data)
})





app.listen(1234, () => {
    console.log("server started");
})