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
    alert("Something Went Wrong. Try Again")
})
document.title = "Mens Wear"
}
    return (
        <div>
        <div className="container-fluid">

            {mpoducts.length>0 && <div className="row row-gap-3 py-4">
                {mpoducts.map((ele,ind)=>{
                    return<Menscard products={ele} key={ind}/>
                })
            }</div>}


        </div>
        <Footer/>
        </div>
    )
}
export default Mensclothing