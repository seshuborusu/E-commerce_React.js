import womensService from "../service/womesservice/womensService"
import Womenscard from "../card/womenscard/Womenscard"
import { useState, useEffect } from "react"
import Footer from "../Footer/Footer"
function Womensclothing() {
    let [wpoducts, setWproducts] = useState([])
    useEffect(() => {
        getWomenproducts()
    }, [])
    const getWomenproducts = () => {
        womensService().then((products) => {
            setWproducts(products.data)
        }).catch(() => {
            alert("no data")
        })
        document.title = "Womens wear"
    }
    return (
        <div className="container-fluid mt-4 px-5 ">

            {wpoducts.length > 0 && <div className="row my-4 row-gap-3 ">
                {wpoducts.map((ele) => {
                    return <Womenscard products={ele} />
                })
                }</div>}
            
        </div>
    )
}
export default Womensclothing