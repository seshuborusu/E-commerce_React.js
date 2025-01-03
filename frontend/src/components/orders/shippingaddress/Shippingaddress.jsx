import axios from "axios"
import { useState, useEffect } from "react"
import "./Shippingaddress.css"
import { useNavigate, useLocation } from "react-router-dom"
import BottomToTopModal from "../Changeaddress/Changeaddress"


function Shippingaddress() {
    const logged = localStorage.getItem("logged")
    const storedtoken = localStorage.getItem("token")
    const location = useLocation();
    const [address, setAddress] = useState(location.state?.selectedAddress || {
        name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        phone: ""
    }); 

    const navigate = useNavigate()
    useEffect(() => {
        // If address is not passed via location state, fetch from backend
        if (!location.state?.selectedAddress) {
            axios.get("http://localhost:1234/routes/getAddresses", {
                params: { mobile: logged },
                headers: {
                    Authorization: `Bearer ${storedtoken}`,
                },
            }).then((res) => {
                setAddress(res.data.addresses[0]); // Set the first address as default
            }).catch((err) => {
                alert("Error fetching address");
            });
        }
    }, [logged, storedtoken, location.state]);


    const handleAddresses = () => {
        navigate("/changeaddress")
    }
    console.log(address);
    return (
        <div className="">
            <p className="shipping-title border-bottom p-1">Shipping Address</p>
            <div className=" border-bottom p-2 m-0 address-container">
                <h6>{address.name}</h6>
                <p>{address.address},{address.city},{address.state},{address.zip}</p>
                <p>Mobile: <span>{address.phone}</span></p>
            </div>
            <div className=" me-md-5  d-flex justify-content-end">
                 {/* <button className="address-btn" onClick={handleAddresses}>Edit Address</button>*/}<BottomToTopModal /><button className="address-btn" >Add new address</button> 
            </div>
        </div>
    )
}
export default Shippingaddress