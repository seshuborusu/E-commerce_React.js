import "./Electriccard.css"
import { Link } from "react-router-dom"
import { useState } from "react"
import { BiRupee } from "react-icons/bi";
import { FaStar } from "react-icons/fa6"
function Electriccard({ products }) {
    let [cart, setCart] = useState(false)
    var { title, image, price, rating, _id } = products
    const formatPrice = (price) => {
        if (typeof price === "number" && !isNaN(price)) {
            return price.toLocaleString(); // Formats the number with commas
        }
        return "0"; // Return 0 if price is not a valid number
    };
    return (
        <div className="col-lg-2 col-md-3 col-6 ">
            <Link to={`/productdetails/${_id}`} className="text-decoration-none">
                <div className="card h-100  border-0   ">
                    <div className="card-header bg-transparent text-center border-0 ">
                        <img className="img " src={image} width={"100%"} height={200}  />
                    </div>
                    <div className="card-body  text-decoration-none ">
                        <h6 className=" card_title  " >{title}</h6>
                        <p className=" card_text "><BiRupee className="rupee_icon" />{formatPrice(price)}</p>
                       <div className="d-inline d-flex justify-content-start align-items-center"> <p className="card_rating  fw-semibold bg-success d-inline rounded-4">{rating.rate}  <FaStar className="star" /></p><p className="rating-count">({rating.count})</p></div>
                        <div>
                            {/* {cart ? <button className="btn btn-info btn-sm">Remove cart</button> : <button className="btn btn-outline-danger btn-sm"> Add cart</button>} */}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}
export default Electriccard