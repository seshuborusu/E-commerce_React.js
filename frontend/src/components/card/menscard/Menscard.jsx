import { Link } from "react-router-dom"
import { FaIndianRupeeSign } from "react-icons/fa6"
import { FaStar } from "react-icons/fa6"
function Menscard({products}){
    var {title,image,price,rating,_id}=products
    return(
        <div className="col-lg-2 col-6">
             <Link to={`/productdetails/${_id}`} className="text-decoration-none">
            <div className="card h-100 border-0">
                <div className="card-header bg-transparent border-0">
                    <img className="img" src={image}width={"100%"} height={230} />
                </div>
                <div className="card-body ">
                    <h6 className="card-title w-100  card_title" >{title}</h6>
                    <p className="card_text fw-normal  fw-semibold"> <FaIndianRupeeSign className="rupee_icon mb-1"/>{price}</p>
                    <p className="card_text px-1 text-light fw-semibold bg-success d-inline rounded-2">{rating.rate} <FaStar className=" mb-1"/></p>
                    <div>
                       
                 
                    </div>
                </div>
            </div>
            </Link>
        </div>
    )
}
export default Menscard