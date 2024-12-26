import { useState,useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { ToastContainer,toast,Bounce } from "react-toastify";

function Guestcart(){

    const [cartItems, setCartItems] = useState([]);
   
    useEffect(() => {
        // Load cart data from localStorage when the component mounts
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(savedCart);
    }, []);

    const removeFromCart = (productId) => {
        // Remove product from the cart
        const updatedCart = cartItems.filter(item => item._id !== productId);
        setCartItems(updatedCart);

        // Save the updated cart back to localStorage
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        toast.success('Item removed from cart', {
            position: "top-right",
            autoClose: 3000,
            theme: "light",
            transition: Bounce,
        });
    };

    const updateQuantity = (productId, quantity) => {
        // Update the quantity of a specific product
        const updatedCart = cartItems.map(item => {
            if (item._id === productId) {
                return { ...item, quantity: quantity };
            }
            return item;
        });
        setCartItems(updatedCart);

        // Save the updated cart back to localStorage
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const goToCheckout = () => {
        navigate("/checkout");
    };


    const formatPrice = (price) => {
        if (typeof price === "number" && !isNaN(price)) {
            return price.toLocaleString(); // Formats the number with commas
        }
        return "0"; // Return 0 if price is not a valid number
    };

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>
            <div className="cart-items">
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    cartItems.map(item => (
                        <div key={item._id} className="cart-item">
                            <img src={item.image} alt={item.title} width="100" height="100" />
                            <div>
                                <p>{item.title}</p>
                                <p>Price: ₹{item.price}</p>
                                <p>Quantity: 
                                    <input 
                                        type="number" 
                                        min="1" 
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                                    />
                                </p>
                            </div>
                            <button onClick={() => removeFromCart(item._id)}>
                                <FaTrashAlt /> Remove
                            </button>
                        </div>
                    ))
                )}
            </div>

            {cartItems.length > 0 && (
                <div className="cart-summary">
                    <button onClick={goToCheckout}>Login for Details</button>
                </div>
            )}

            <ToastContainer />
        </div>
    );
}
export default Guestcart