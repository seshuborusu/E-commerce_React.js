import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const QuantitySelector = ({ id, setprod, quan,setPriceDetails }) => {  // Ensure id is passed as a prop
    const [quantity, setQuantity] = useState(quan || 1); // Default quantity set to 1

    // Trigger API call whenever quantity changes
    const handleChange = (event) => {
        const newQuantity = parseInt(event.target.value, 10);

        if (!isNaN(newQuantity) && newQuantity > 0) {
            setQuantity(newQuantity); // Update state only if valid number
        } else {
            // toast.error("Please enter a valid quantity.");
            alert("no num") // Use toast for error handling
        }
    };

    useEffect(() => {
        if (quantity && !isNaN(quantity)) { // Ensure quantity is valid before making the request
            // console.log(quantity);
            axios.post(`http://localhost:1234/routes/updatequantity/${id}`, { quantity },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
                .then((res) => {
                    // toast.success("Cart updated successfully!"); // Show success message
                    setprod(res.data.cart || []);  // Update the products in the parent component
                    setPriceDetails(res.data.priceDetails || {});
                })
                .catch((err) => {
                    toast.error('Error updating quantity: ' + (err.response ? err.response.data.message : err.message));
                });
        }
    }, [quantity, id, setprod]); // Run effect when `quantity` or `id` changes




    return (
        <div>
            <ToastContainer />
            <label htmlFor="quantity">Qty:</label>
            <select
                id="quantity"
                value={quantity}
                onChange={handleChange}
                style={{
                    fontSize: '0.875rem', // Decrease font size
                    padding: '4px 5px',
                    border: 'none', // Remove border
                    backgroundColor: 'transparent', // Transparent background
                    cursor: 'pointer',
                    borderBottom: "2px solid whitesmoke"
                }}
            >
                {/* Generate quantity options dynamically */}
                {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                        {num}
                    </option>
                ))}
            </select>

        </div>
    );
};

export default QuantitySelector;