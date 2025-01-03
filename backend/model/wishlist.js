const mongoose = require('mongoose')

const wishlistSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to the Product
    addedAt: { type: Date, default: Date.now } // Date when the product was added to the wishlist
});

const wishlistModel = mongoose.model('Wishlist', wishlistSchema);
module.exports = wishlistModel;
