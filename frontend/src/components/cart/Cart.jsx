import { useState, useEffect } from "react"
import axios from "axios"

function Cart() {
    let [prod, setProd] = useState([])
    let [logged, setLogged] = useState("")
    useEffect(() => {

        const storedtoken = localStorage.getItem("token")
        if (storedtoken) {
            setLogged(storedtoken)
            axios.get("http://localhost:1234/routes/getcartdata", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            }).then((res) => {
                setProd(res.data.result || [])
                console.log(res.data);
            }).catch((err) => {
                // console.log("err");
                console.log(err);
    
            })
        } else {
            setLogged("")
        }

        // console.log(prod);
    }, [])



    const removeitem = (id) => {
        // console.log(id);
        axios.delete(`http://localhost:1234/routes/deletecartproduct/${id}`,{
            
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },}).then((res) => {
            console.log(res.data);
            setProd(res.data.cart || [])
        }).catch((err) => {
            console.log(err)
        })


    }



    return (
        <div className="container">
            {logged ? (
                <div className="row">
                    {
                        prod.length > 0 ? (
                            prod.map((ele, ind) => {
                                // console.log(ele);
                                return <div className="row shadow my-4 d-flex justify-content-evenly align-items-center      p-2" key={ind} >
                                    <div className="col-2"><img src={ele.image} height={85} width={75}></img></div>
                                    <div className="col-7">{ele.title}</div>
                                    <div className="col-2"><i class="bi bi-currency-rupee"></i>{ele.price}</div>
                                    <div className="col-1" ><button className="btn btn-sm btn-danger" onClick={() => {
                                        removeitem(ele._id)
                                    }}>Remove</button></div>
                                </div>

                            })
                        ) : (<h1 className="text-danger fw-bold my-5 text-center">Cart is Empty</h1>)
                    }
                </div>) : (
                <div className="container">
                    <div>
                        <h3>please login to cart data</h3>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Cart