import axios from "axios";
import{toast} from "react-toastify"
function Placeorder({ ordertotal, priceDetails, prod, setPriceDetails, setProd }) {
    const logged = localStorage.getItem("logged")
    const storedtoken = localStorage.getItem("token")
    const placeOrder = () => {
        if (!logged) {
            toast.error("Please log in to place an order");
            return;
        }
        // Gather order details
        const orderDetails = {
            // orderId: ,
            cart: prod,
            totalAmount: priceDetails.orderTotal,
            shippingAddress: "User's shipping address", // You may need a shipping address here
            paymentStatus: "pending" // Assume payment is pending unless implemented
        };
        // console.log(orderDetails);

        axios.post("http://localhost:1234/routes/placeorder", orderDetails, {
            headers: {
                Authorization: `Bearer ${storedtoken}`
            },
        }).then((res) => {
            if (res.data.ok) {
                toast.success("Order placed successfully!");
                // Optionally clear the cart after order is placed
                setProd([]);
                setPriceDetails({});
            } else {
                toast.error(res.data.message || "Error placing the order");
            }
        }).catch((err) => {
            console.error("Error placing the order:", err);
            toast.error("An error occurred while placing the order.");
        });
    }
    return (
        <div>
            <div className="container-fluid shadow p-3  border mt-3 d-flex align-items-center justify-content-between">
                <div className="order-container  ">
                    <h6>{priceDetails.orderTotal}</h6>
                    <p>Grand Total</p>
                </div>
                <div><button className="orderplace-btn" onClick={placeOrder}>Place Order</button></div>
            </div>
        </div>
    )
}
export default Placeorder