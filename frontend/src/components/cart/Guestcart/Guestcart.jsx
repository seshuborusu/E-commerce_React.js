function Guestcart({cart,setCart}){

    const handleRemove = (productId) => {

        const updatedCart = cart.filter(item => item._id !== productId);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage for guest users
    };

    const formatPrice = (price) => {
        if (typeof price === "number" && !isNaN(price)) {
            return price.toLocaleString(); // Formats the number with commas
        }
        return "0"; // Return 0 if price is not a valid number
    };

    return(
        <div>
             <div className="container my-5">
                            <h3>Your Cart</h3>
                            {cart.length === 0 ? (
                                <p>Your cart is empty</p>
                            ) : (
                                cart.map(item => (
                                    <div className="cart-item" key={item._id}>
                                        <img src={item.image} alt={item.title} width="100" />
                                        <p>{item.title}</p>
                                        <p>₹{formatPrice(item.price)}</p>
                                        <p>Quantity: {item.quantity}</p>
                                        <button onClick={() => handleRemove(item._id)}>Remove</button>
                                    </div>
                                ))
                            )}
                            <div className="cart-footer">
                                <button onClick={() => navigate("/checkout")} className="btn btn-success">Login for Details</button>
                            </div>
                        </div>
        </div>
    )
}
export default Guestcart