const express = require("express")
const usermodel = require("../model/Auth")
const jwt = require("jsonwebtoken")


const userroute = express.Router()

userroute.post("/adduser", async (req, res) => {
    const user = req.body

    const existinguser = await usermodel.findOne(user)
    // console.log(user,existinguser);
    if (existinguser) {
        res.json({ ok: false, message: 'user Already Registered' })
    } else {
        const data = new usermodel(user)
        const a = await data.save()
        // console.log(a,data);

        res.json({ ok: true, message: "User Registered succesfully", a })
    }


})


userroute.post("/getuser", async (req, res) => {
    const { mobile, password } = req.body
    const data = await usermodel.findOne({ mobile, password }).exec()
    // console.log(data);
    if (data == null) {
        res.json({ ok: false, message: "user not Found" })
    } else {
        const token = jwt.sign({ data }, "jjjjjjjjjjjjj")
        res.json({ ok: true, message: "user Valid", token: token })
    }
})

module.exports = userroute