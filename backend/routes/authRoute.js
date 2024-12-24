const express = require("express")
const usermodel = require("../model/Auth")
const jwt = require("jsonwebtoken")
const secret_Key = "asbncjhbcnvhj"


const userroute = express.Router()

userroute.post("/signup", async (req, res) => {
    try {
        const user = req.body
        // console.log(user);
        const { name, mobile, password } = user

        const existinguser = await usermodel.findOne({ mobile })
        console.log(existinguser);
        if (existinguser) {
            return res.status(400).json({ message: "User with this mobile already exists!" })
        } else {
            const data = new usermodel({ name, mobile, password })
            const a = await data.save()
            console.log(a, data);

            return res.status(201).json({
                ok: true,
                message: "User registered successfully",
                // user: userResponseData, // Ex
            })
        }
    }

    catch (error) {
        console.error("Error during signup:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
})


userroute.post("/login", async (req, res) => {
    const { mobile, password } = req.body
    // console.log(req.body);
    const data = await usermodel.findOne({ mobile, password }).exec()
    // console.log(data);
    if (data == null) {
        res.json({ ok: false, message: "user not Found" })
    } else {
        payload = {
            number: data.mobile,
            userid: data._id
        }
        const key = jwt.sign(payload, secret_Key)
        res.json({ ok: true, message: "user Valid", result: key })
    }
})

module.exports = userroute