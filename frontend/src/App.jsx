import Electronics from "./components/electronics/Electronics";
import Jewellery from "./components/jewellery/Jewellery";
import Mensclothing from "./components/mens/Mensclothing";
import Womensclothing from "./components/womens/Womensclothing";
import Home from "./components/home/Home";
import { Route, Routes, Navigate } from "react-router-dom"
import Pagenotfound from "./components/pagenotfound/Pagenotfound";
import "./App.css";
import Productdetails from "./components/productdetails/Productdetails";


import Cart from "./components/cart/Cart/Cart";
import NavScrollExample from "../src/components/Navbar/Navbar"
function App() {  
    
    return (
        <div>
         
            {/* <Navbar /> */}
            {/* <Addproduct/> */}
            <NavScrollExample/>
            <Routes>
               
                <Route path="/" element={<Home />}></Route>
                {/* <Route path="" element={<Navigate to="mens"/>}/> */}
                <Route path="/Electronics" element={<Electronics />} />
                <Route path="/Jewellery" element={<Jewellery />} />
                <Route path="/mens" element={<Mensclothing />} />
                <Route path="/womens" element={<Womensclothing />} />
                <Route path="/productdetails/:id" element={<Productdetails />} />
                <Route path="/cart" element={<Cart />} />

            

                        <Route path="*" element={<Pagenotfound />} />

            </Routes>
          

        </div>
    )
}
export default App