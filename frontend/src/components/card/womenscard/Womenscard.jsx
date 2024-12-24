import { Link } from "react-router-dom"
import { FaIndianRupeeSign } from "react-icons/fa6"
import { FaStar } from "react-icons/fa6"
function Womenscard({products}){
    var {title,image,price,rating,_id}=products
    const formatPrice = (price) => {
        if (typeof price === "number" && !isNaN(price)) {
            return price.toLocaleString(); // Formats the number with commas
        }
        return "0"; // Return 0 if price is not a valid number
    };
    return(
        <div className="col-lg-2 col-md-4 col-6 ">
            <Link to={`/productdetails/${_id}`} className="text-decoration-none">
            <div className="card h-100 border-0">
                <div className="card-header bg-transparent text-center border-0 ">
                    <img  className="img"src={image}width={"100%"} height={160} />
                </div>
                <div className="card-body ">
                    <h6 className="card_title fw-normal " >{title}</h6>
                    <p className="card_text fw-normal  fw-semibold"> <FaIndianRupeeSign className="rupee_icon mb-1"/>{formatPrice(price)}</p>
                   
                    <p className="card_text px-1 text-light fw-semibold bg-success d-inline rounded-2">{rating.rate} <FaStar className=" mb-1"/></p>
                   
                  </div>  
                </div>
                </Link>
            </div>
    )
}
export default Womenscard