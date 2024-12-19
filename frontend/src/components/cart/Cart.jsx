import { useState, useEffect } from "react"
import axios from "axios"

function Cart() {
    let [prod, setProd] = useState([])
    useEffect(() => {
        cartData()
    }, [])

    const cartData = () => {
        axios.get("http://localhost:1234/routes/getcartdata").then((res) => {
            setProd(res.data.result)
        }).catch(() => { console.log("err"); })
    }



    const removeitem = (id) => {
        axios.delete(`http://localhost:1234/routes/deleteproduct/${id}`).then((res) => {
            // console.log(res.data);
            cartData()
        }).catch((err) => {
            console.log(err)
        })


    }



    return (
        <div className="container">
            <div className="row">
                <h1>cart component</h1>

                {
                    prod.length > 0 ? (
                        prod.map((ele, ind) => {
                            // console.log(ele);
                            return <div className="row shadow my-4 d-flex justify-content-evenly align-items-center      p-2">
                                <div className="col-2" key={ind}><img src={ele.image} height={85} width={75}></img></div>
                                <div className="col-7">{ele.title}</div>
                                <div className="col-2"><i class="bi bi-currency-rupee"></i>{ele.price}</div>
                                <div className="col-1"><button className="btn btn-sm btn-danger" onClick={() => {
                                    removeitem(ele._id)
                                }}>Remove</button></div>
                            </div>

                        })
                    ) : (<h1 className="text-danger fw-bold my-5 text-center">cart is Empty</h1>)
                }
            </div>
        </div>
    )
}
export default Cart