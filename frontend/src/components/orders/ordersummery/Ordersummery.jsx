import axios from "axios";
import { useState, useEffect } from "react";
import { BiRupee } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Quantity from "../../cart/Quantity/Quantity";
import Shippingaddress from "../shippingaddress/Shippingaddress";
import "./Ordersummery.css";

function Ordersummery() {
    const [cart, setCart] = useState([]);
    const [address, setAddress] = useState()
    const [price, setPrice] = useState({
        bagTotal: "",
        savings: "",
        subtotal: "",
        shippingCharges: "",
        orderTotal: 0
    });
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();




    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate('/');
            // console.log(token);
        } else {
            // console.log(token);
            setLoading(true)
            axios
                .get("http://localhost:1234/routes/ordersummery", {
                    headers: {
                        Authorization: ` Bearer ${localStorage.getItem("token")}`,
                    },
                })
                .then((res) => {
                    setCart(res.data.result.cart || []);
                    // console.log(res.data);
                    setAddress(res.data.result.addresses[0])

                })
                .catch((err) => {
                    console.log("Error:", err);
                });

            axios.get("http://localhost:1234/routes/getcartdata", {
                headers: {
                    Authorization: ` Bearer ${localStorage.getItem("token")}`,
                },
            })
                .then((res) => {
                    setPrice(res.data.priceDetails);
                    console.log(res.data);

                })
                .catch((err) => {
                    console.log("Error:", err);
                }).finally(() => {
                    setLoading(false)
                })
        }
    }, [navigate]);

    const handlePlaceOrderClick = async () => {
        if (!address) {
            navigate("/address");
            // alert("Addres not found")
        } else {

            // console.log(price.orderTotal);
            const url = "https://api.razorpay.com/v1/payments/qr_codes/qr_FuZIYx6rMbP6gs";

            const options = {
                key: "rzp_test_Su4WV4zdBIGTmZ",
                entity: url,
                amount: `${price.orderTotal * 100}`,
                name: "SHOP",
                description: "Insurance Payment",
                image: "",
                handler: async function (response) {
                    const orderDetails = {

                        cart: cart,
                        totalAmount: price.orderTotal,
                        ShippingAddress: address,
                        paymentStatus: "pending",
                    };
                    try {
                        const res = await axios.post(
                            "http://localhost:1234/routes/placeorder",
                            orderDetails,
                            {
                                headers: {
                                    Authorization: ` Bearer ${localStorage.getItem("token")}`,
                                },
                            }
                        );

                        if (res.data.ok) {
                            navigate("/mens");


                        } else {
                            console.error(res.data.message || "Error placing the order");
                        }
                    } catch (error) {
                        console.log("Error:", error);
                    }
                    alert("Payment successful with ID: " + response.razorpay_payment_id);
                },
                prefill: {
                    name: "Customer Name",
                    email: "name@gmail.com",
                    contact: `${address.phone}`,
                },
                notes: {
                    address: "404, Aditya Trade Center, Ameerpet, Hyderabad",
                },
                theme: {
                    color: "#20c997",
                },
            };

            const pay = new window.Razorpay(options);
            pay.open();
        }
    };

    const formatPrice = (price) => {
        if (typeof price === "number" && !isNaN(price)) {
            return price.toLocaleString();
        }
        return "0";
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="container mt-3">
                <div>
                    <Shippingaddress />
                </div>
                <div>Items</div>
                {cart.length > 0 &&
                    cart.map((ele, ind) => (
                        <div className="mt-1 align-items-center d-flex" key={ind}>
                            <div>
                                <img src={ele.image} height={"45px"} width={"40px"} alt={ele.title} />
                            </div>
                            <div className="summery-cart-title mt-3">
                                <div className="ele-title ms-3">
                                    <p>{ele.title}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                <div className="container mt-5 border p-3">
                    <div className="summery-price-details">
                        <h6 className="fw-bold">Price Details</h6>
                        <div className="d-flex justify-content-between">
                            <p>Total MRP:</p>
                            <p className="rupee">
                                <BiRupee className="insiderupee" />
                                {formatPrice(price.bagTotal)}
                            </p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p>Savings on MRP:</p>
                            <p className="rupee">
                                <BiRupee className="insiderupee" />
                                {formatPrice(price.savings)}
                            </p>
                        </div>
                        <div className="d-flex justify-content-between">
                            <p>Sub Total:</p>
                            <p className="rupee">
                                <BiRupee className="insiderupee" />
                                {formatPrice(price.subtotal)}
                            </p>
                        </div>
                        <div className="d-flex justify-content-between border-bottom">
                            <p>Shipping & Other Charges:</p>
                            <p className="rupee">
                                <BiRupee className="insiderupee" />
                                {formatPrice(price.shippingCharges)}
                            </p>
                        </div>
                        <div className="d-flex justify-content-between fw-bold my-3">
                            <h6 className="fw-bold">Order Total:</h6>
                            <h6 className="rupee fw-bold">
                                <BiRupee className="insiderupee" />
                                {formatPrice(price.orderTotal)}
                            </h6>
                        </div>
                    </div>
                    <div className="d-flex justify-content-end me-2">
                        <button onClick={handlePlaceOrderClick} className="payment-btn">
                            Continue Payment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ordersummery;