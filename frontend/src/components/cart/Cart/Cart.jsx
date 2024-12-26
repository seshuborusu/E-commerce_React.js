import { useState, useEffect } from "react"
import axios from "axios"
import Emptycart from "../Emptycart/Emptycart"
import { BiRupee } from "react-icons/bi";
import QuantitySelector from "../Quantity/Quantity"
import "./Cart.css"
import Guestcart from "../Guestcart/Guestcart";
import { ToastContainer,toast } from "react-toastify";


function Cart() {
    let [prod, setProd] = useState([])
    let [logged, setLogged] = useState(localStorage.getItem("logged"))
    let [priceDetails, setPriceDetails] = useState({
        bagTotal: 0,
        savings: 0,
        subtotal: 0,
        shippingCharges: 0,
        orderTotal: 0
    });
    const storedtoken = localStorage.getItem("token")
    useEffect(() => {
        if (storedtoken) {
            setLogged(storedtoken)
            axios.get("http://localhost:1234/routes/getcartdata", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            }).then((res) => {
                if (res.data.ok) {
                    setProd(res.data.result || []);  // Set cart items
                    setPriceDetails(res.data.priceDetails || {});  // Set price details
                } else {
                    // Handle empty cart response
                    toast.info(res.data.result);  // Show a message like 'Cart is empty'
                    setProd([]);  // Empty the cart items
                    setPriceDetails({});  // Reset price details
                }
            }).catch((err) => {
                console.log(err);
                console.error(err);
                toast.error("Error fetching cart data");
            });
        } else {
            setLogged("");  // Reset logged status if no token
        }
        
    }, [storedtoken])

    const removeitem = (id) => {
        axios.delete(`http://localhost:1234/routes/deletecartproduct/${id}`, {

            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        }).then((res) => {
            if (res.data.ok) {
                setProd(res.data.cart || []); // Update cart products
                setPriceDetails(res.data.priceDetails || {}); // Update price details
                toast.success("Item removed from cart!");  // Show success toast
            } else {
                console.error("Failed to update cart:", res.data.message);
                toast.error("Failed to remove item from cart.");  // Show error toast
            }
        }).catch((err) => {
            console.error("Error while removing item from cart:", err);
            toast.error("An error occurred while removing the item.");  // Sh
        })


    }

    const formatPrice = (price) => {
        if (typeof price === "number" && !isNaN(price)) {
            return price.toLocaleString(); // Formats the number with commas
        }
        return "0"; // Return 0 if price is not a valid number
    };


    return (
        <div className="container-fluid">
            {logged ? (
                <div className="container p-0 pricedetails_containe ">
<ToastContainer/>
                    <div className="">
                        {
                            prod.length > 0 ? (
                                prod.map((ele, ind) => {
                                    // console.log(ele);
                                    return <div className="row mt-4 d-flex justify-content-between align-items-center p-2 border-bottom" key={ind} >
                                        <div className="col-2  p-3"><img src={ele.image} height={135} width={"100%"}></img></div>
                                        <div className="col-10  px-3 "><p className="fw-normal">{ele.title}</p>
                                            <h5><i class="bi bi-currency-rupee"></i>{formatPrice(ele.price)}</h5>
                                            <QuantitySelector id={ele._id} setprod={setProd} quan={ele.quantity} setPriceDetails={setPriceDetails} />
                                            <div className="mt-3">
                                                <button className="btn btn-sm btn-light me-5" onClick={() => {
                                                    removeitem(ele._id)
                                                }}>Remove</button>
                                                <button className="btn btn-sm btn-light ">Move To Wishlist</button>
                                            </div>
                                        </div>
                                    </div>
                                })
                            ) : (
                                <h1 className=" m-0  text-center"><Emptycart /></h1>
                            )
                        }
                    </div>
                    {prod.length > 0 &&
                        <div className="container mt-5 border p-3" >
                            <div><h6 className="fw-bold "> Price Details</h6>
                                <div className="d-flex justify-content-between "> <p>Total MRP : </p><p className="rupee"><BiRupee className="insiderupee" />{formatPrice(priceDetails.bagTotal)}</p></div>
                                <div className="d-flex justify-content-between "> <p>Savings on MRP:</p><p className="rupee"><BiRupee className="insiderupee" />{formatPrice(priceDetails.savings)}</p></div>
                                <div className="d-flex justify-content-between "> <p>Sub Total :</p><p className="rupee"><BiRupee className="insiderupee" />{formatPrice(priceDetails.subtotal)}</p></div>
                                <div className="d-flex justify-content-between border-bottom "> <p>Shipping & Other Charges :</p><p className="rupee"><BiRupee className="insiderupee" />{formatPrice(priceDetails.shippingCharges)}</p></div>
                                <div className="d-flex justify-content-between fw-bold my-2"> <h6>Order Total:</h6><h6 className="rupee fw-bold"><BiRupee className="insiderupee" />{formatPrice(priceDetails.orderTotal)}</h6></div>

                            </div>

                        </div>
                    }
                </div>) : (
                <div className="container">
                    <div>
                        <h3>please login to cart data</h3>
                        <Guestcart/>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Cart