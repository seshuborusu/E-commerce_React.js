import axios from "axios"
import { useState, useEffect } from "react"
import { BiRupee } from "react-icons/bi"
import { useNavigate } from "react-router-dom"
const token = localStorage.getItem("token")
function Ordersummery() {
    const [cart, setCart] = useState([])
    const [address, setAddress] = useState([])
    const [price, setprice] = useState({
        bagTotal: "", savings: "", subtotal: "", shippingCharges: "", orderTotal: ""
    })
    const navigate = useNavigate()


    useEffect(() => {
        if (!token) {
            navigate('/')
        } else {

            axios.get("http://localhost:1234/routes/ordersummery", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            }).then((res) => {
                // console.log(res);
                setCart(res.data.result.cart || [])
                setAddress(res.data.result.addresses[0] || [])
            }).catch((err) => {
                console.log("err")
                console.log(err);
            })

            axios.get("http://localhost:1234/routes/getcartdata", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            }).then((res) => {
                // console.log(res.data.priceDetails);
                setprice(res.data.priceDetails)
            }).catch((err) => {
                console.log("err")
                console.log(err);
            })
        }

    }, [navigate])

    const handlePlaceOrderClick = async () => {
        // Check if address exists

        if (!address) {
            navigate("/address"); // Redirect to Address Form if user confirms
        } else {
            // If address exists, show order summary and confirmation
            const orderDetails = {
                // user_id:token,
                cart: cart,
                totalAmount: price.orderTotal,
                ShippingAddress: address,
                paymentStatus: "pending",
            };

            // console.log(orderDetails);
            // Proceed with placing the order
            try {
                const res = await axios.post(
                    "http://localhost:1234/routes/placeorder",
                    orderDetails,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );

                if (res.data.ok) {
                    // toast.success("Order placed successfully!");
                    console.log("add");
                    // console.log(orderDetails);
                    navigate("/mens")
                } else {
                    // toast.error(res.data.message || "Error placing the order");
                }
            } catch (error) {
                console.log("er");
                console.log(error);
                // toast.error("An error occurred while placing the order.");
            }
        }
    };



    const formatPrice = (price) => {
        if (typeof price === "number" && !isNaN(price)) {
            return price.toLocaleString(); // Formats the number with commas
        }
        return "0"; // Return 0 if price is not a valid number
    };


    return (
        <div>
            <div className="container">

                <div>Shippinddetais <p>{address.state}</p> <p>{address.name}</p></div>
                {
                    cart.length > 0 &&

                    cart.map((ele, ind) => {
                        return <div className="row mt-4 d-flex align-items-center p-2 border-bottom" key={ind} >
                            <div className="col-3 col-lg-2 col-md-2 p-3 cart-image"><img src={ele.image} height={115} width={"100%"}></img></div>
                            <div className="col-9 col-lg-10 col-md-10  px-3  cart-title"><div className="ele-title"><p className="">{ele.title}</p></div>
                                <h5 className="cart-price"><i class="bi bi-currency-rupee"></i>{formatPrice(ele.price)}</h5>
                            </div>
                        </div>
                    })
                }

                <div className="container mt-5 border p-3" >
                    <div className="price-details"><h6 className="fw-bold "> Price Details</h6>
                        <div className="d-flex justify-content-between "> <p>Total MRP : </p><p className="rupee"><BiRupee className="insiderupee" />{formatPrice(price.bagTotal)}</p></div>
                        <div className="d-flex justify-content-between "> <p>Savings on MRP:</p><p className="rupee"><BiRupee className="insiderupee" />{formatPrice(price.savings)}</p></div>
                        <div className="d-flex justify-content-between "> <p>Sub Total :</p><p className="rupee"><BiRupee className="insiderupee" />{formatPrice(price.subtotal)}</p></div>
                        <div className="d-flex justify-content-between border-bottom "> <p>Shipping & Other Charges :</p><p className="rupee"><BiRupee className="insiderupee" />{formatPrice(price.shippingCharges)}</p></div>
                        <div className="d-flex justify-content-between fw-bold my-2  "> <h6 className="fw-bold">Order Total:</h6><h6 className="rupee fw-bold"><BiRupee className="insiderupee" />{formatPrice(price.orderTotal)}</h6></div>
                        <div className=""><button onClick={handlePlaceOrderClick}>Continue Payment</button></div>
                    </div>
                </div>


            </div>
        </div>
    )
}
export default Ordersummery