const express = require("express");
const userModel=require("../model/Auth")
const addressRoute = express.Router();

addressRoute.post("/addAddress", async (req, res) => {
    const { mobile, address } = req.body; // The mobile number of the logged-in user and the address data

    try {
        // Find the user by their mobile number (or use JWT for authentication)
        const user = await userModel.findOne({ mobile });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Add the new address to the user's addresses array
        user.addresses.push(address);

        // Save the updated user document
        await user.save();

        return res.status(200).json({ message: "Address added successfully" });
    } catch (error) {
        console.error("Error adding address:", error);
        return res.status(500).json({ message: "An error occurred while adding the address" });
    }
});





addressRoute.get("/getAddresses", async (req, res) => {
    const { mobile } = req.query;   // The mobile number of the logged-in user (or use JWT for authentication)

    try {
        // Find the user by their mobile number
        const user = await userModel.findOne({ mobile });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return the user's addresses
        return res.status(200).json({ addresses: user.addresses });
    } catch (error) {
        console.error("Error fetching addresses:", error);
        return res.status(500).json({ message: "An error occurred while fetching addresses" });
    }
});




module.exports=addressRoute
