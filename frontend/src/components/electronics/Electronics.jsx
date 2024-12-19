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


        <div className="container-fluid mt-4 px-5 ">
            <div>
                {/* <h2 className="fw-bold">Electronics component</h2> */}
                <div className="bgimage my-2"></div>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae, laboriosam aut neque debitis nihil ab aperiam placeat ut cumque sunt ad autem voluptates tenetur doloremque quidem quisquam a incidunt ea alias id inventore minima voluptate excepturi. Quia, explicabo. Porro ex et quisquam deserunt non at iste dolor fugiat ipsa distinctio.</p>
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