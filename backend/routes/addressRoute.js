const express = require("express");
const userModel = require("../model/Auth")
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



addressRoute.post("/updateAddress", async (req, res) => {
    const { mobile, address } = req.body;
    //console.log("Mobile:", mobile, "Address:", address);

    try {
        // Find the user by mobile number
        const user = await userModel.findOne({ mobile });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if the user has addresses
        if (user.addresses.length === 0) {
            return res.status(400).json({ success: false, message: 'No addresses found for this user' });
        }

        // If you want to update a specific address (by index or a field like `phone`, `city`, etc.)
        const addressToUpdate = user.addresses.find(addr => addr.phone === address.phone);  // Find the address by matching the phone number

        if (!addressToUpdate) {
            return res.status(404).json({ success: false, message: 'Address not found for the provided phone number' });
        }

        // Update the found address with new data
        Object.assign(addressToUpdate, address);  // Copy the new address data into the existing address

        await user.save();  // Save the updated user document with the new address

        return res.json({
            success: true,
            message: 'Address updated successfully',
            user: user  // Send the updated user document back
        });
    } catch (error) {
        console.error("Error updating address:", error);
        res.status(500).json({ success: false, message: 'An error occurred while updating the address' });
    }
});



// In your Express backend
addressRoute.delete('/removeaddress', async (req, res) => {
    const { mobile, addressId } = req.body;

    if (!mobile || !addressId) {
        return res.status(400).json({ message: "Mobile and Address ID are required." });
    }

    try {
        // Find and remove the address by its ID
        const address = await userModel.findOneAndDelete({ _id: addressId, mobile: mobile });

        if (!address) {
            return res.status(404).json({ message: "Address not found." });
        }

        res.status(200).json({ message: "Address removed successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});



module.exports = addressRoute
