import mensService from "../service/mensservice/mensService"
import Menscard from "../card/menscard/Menscard"
import { useState,useEffect } from "react"
import Footer from "../Footer/Footer"
function Mensclothing(){
let[mpoducts,setMproducts]=useState([])
useEffect(()=>{
    getMenproducts()
},[])
const getMenproducts=()=>{
mensService().then((products)=>{
setMproducts(products.data)
}).catch(()=>{
    alert("no data")
})
document.title = "Mens Wear"
}
    return (
        <div>
        <div className="container-fluid">

            {mpoducts.length>0 && <div className="row row-gap-3 py-4">
                {mpoducts.map((ele)=>{
                    return<Menscard products={ele}/>
                })
            }</div>}


        </div>
        <Footer/>
        </div>
    )
}
export default Mensclothing