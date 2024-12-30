import axios from "axios"
import { useState, useEffect } from "react"
import "./Shippingaddress.css"
function Shippingaddress() {
    const logged = localStorage.getItem("logged")
    const storedtoken = localStorage.getItem("token")
    let [address, setAddress] = useState({
        name: "", address: "", city: "", zip: ""
    })

    useEffect(() => {
        axios.get("http://localhost:1234/routes/getAddresses", {
            params: { mobile: logged },
            headers: {
                Authorization: `Bearer ${storedtoken}`,
            },
        }).then((res) => {
            setAddress(res.data.addresses[0])
            // console.log(res.data.addresses[0]);
        }).catch((err) => {
            alert("err")
        })
    }, [])
    return (
        <div className="">
            <p className="shipping-title border-bottom p-1">Shipping Address</p>
            <div className=" border-bottom p-2 m-0 address-container">
                <h6>{address.name}</h6>
                <p>{address.address},{address.city},{address.state},{address.zip}</p>
                <p>Mobile: <span>{address.phone}</span></p>
            </div>
            <div className="text-end me-md-5">
                <button className="address-btn">Edit Address</button><button className="address-btn">Add new address</button>
            </div>
        </div>
    )
}
export default Shippingaddress