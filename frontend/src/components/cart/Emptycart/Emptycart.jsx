import { Link } from "react-router-dom"
import "./Emptycart.css"
import Footer from "../../Footer/Footer"
function Emptycart() {
    return (
        <div className="" >
        <div className="container-fluid emptycart_container my-5 " >
           
                <img src="https://media6.ppl-media.com/mediafiles/ecomm/promo/1669805391_empty-pana-2.png" alt="cart" className="img-fluid" />
                <div><h4 className=" text-dark my-3 fw-bold">There are no items in this cart.</h4></div>
                <div><p className="fs-6 fw-normal">Add something to make me happy  :) </p></div>
                <div><Link to={"/"} className=" text-light"><button className="btn shopping_custom_btn px-3">CONTINUE SHOPPING</button></Link></div>
               

            <div></div>
        </div>
        </div>
    )
}
export default Emptycart