import jewelleryService from "../service/jewelleryService/jewelleryService"
import Jewellerycard from "../card/jewellerycard/Jewellerycard"
import { useState, useEffect } from "react"
import Footer from "../Footer/Footer"
function Jewellery() {
    let [jpoducts, setJproducts] = useState([])

    useEffect(() => {
        jewelleryService().then((products) => {
            setJproducts(products.data)
        }).catch(() => {
            alert("no data")
        })
        document.title = "Jewellery products"
    }, [])
    
    return (
        <div>
        <div className="container-fluid mt-4 px-5">
            <div>
                <h4 className="text-cente mt-5 fs-3">Trending Products</h4>
            </div>

            {jpoducts.length > 0 && <div className="row my-5 row-gap-5">
                {jpoducts.map((ele) => {
                    return <Jewellerycard products={ele} />
                })
                }</div>}
        </div>
        <Footer/>
        </div>
    )
}
export default Jewellery