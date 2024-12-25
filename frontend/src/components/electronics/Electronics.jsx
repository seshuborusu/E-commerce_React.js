import electronicsService from ".././service/electronicsService/electronicsService"
import { useState, useEffect } from "react";
import Electriccard from "../card/electroniccard/Electriccard";
import "./Electronics.css"
import Footer from "../Footer/Footer";

function Electronics() {
    let [electronicproducts, setElectronicsproducts] = useState([])

    useEffect(() => {
        getElectronics()
        document.title = "Electonic products"
    },[])

    const getElectronics = () => {
        electronicsService().then((products) => {
            console.log(products.data);
            setElectronicsproducts(products.data)
        }).catch((err) => {
            alert("no data")
            console.log(err);

        })


    }

    return (
        <div>


        <div className="container-fluid ">
            <div>
                {/* <h2 className="fw-bold">Electronics component</h2> */}
                <div className="bgimage my-2"></div>
            <div><h4 className="p-0  mx-4">Trending Products</h4></div>
            </div>
            
            <div className="my-3 ">
                {electronicproducts.length > 0 &&
                    <div className="row row-gap-4">
                        {electronicproducts.map((product) => {
                            return <Electriccard products={product} />
                        })

                        }
                    </div>}
            </div>
           
        </div>
        <Footer/>
        </div>
    )
}
export default Electronics