import axios from "axios";
import { toast } from "react-toastify"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Placeorder({ priceDetails }) {
    const [address, setAddress] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state for asynchronous operations
    const navigate = useNavigate()

    const logged = localStorage.getItem("logged")
    const storedtoken = localStorage.getItem("token")


    // Fetch address function
    const fetchAddress = async () => {

        if (!logged) {
            toast.error("Please log in to place an order");
            return;
        }

        try {
            setLoading(true); // Set loading state to true before fetching
            const res = await axios.get("http://localhost:1234/routes/getAddresses", {
                params: { mobile: logged },
                headers: {
                    Authorization: `Bearer ${storedtoken}`,
                },
            });

            if (res.data.addresses && res.data.addresses.length > 0) {
                setAddress(res.data.addresses[0]); // Set the first address if found
                // console.log(res.data.addresses);
            } else {
                setAddress(null); // No address found
            }
        } catch (error) {
            toast.error("An error occurred while fetching the address");
        } finally {
            setLoading(false); // Set loading state to false after fetching
        }
    };

    // Handle "Place Order" button click
    const handlePlaceOrderClick = () => {
        // Check if address exists
        if (!address) {
            navigate("/address"); // Redirect to Address Form if user confirms
        } else {
            navigate("/ordersummery")
        }
    };

    useEffect(() => {
        fetchAddress(); // Fetch the address when the component mounts
        // console.log("useF", address)
    }, []);

    return (
        <div>
            <div className="container-fluid shadow p-3  border mt-3 d-flex align-items-center justify-content-between">
                <div className="order-container  ">
                    <h6>{priceDetails.orderTotal}</h6>
                    <p>Grand Total</p>
                </div>


                <div><button className="orderplace-btn" onClick={handlePlaceOrderClick}>Place Order</button></div>
            </div>
        </div>
    )
}
export default Placeorder