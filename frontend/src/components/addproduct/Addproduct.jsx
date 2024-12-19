import { useState } from "react"
function Addproduct() {
    let [data, setData] = useState({ pname: "", pprice: "", pimage: "", pthumbnail: [], pdescrption: "", pcatagery: "", prating: {rate:"",count:""} })
    const getData = (e) => {
        const { value, name } = e.target
        setData({ ...data, [name]: value })
    }
    console.log(data);
    return (
        <div className="container">
            <h1>ADD PRODUCTS</h1>
            <div className="border p-3">
                <input type="text" placeholder="Product Name" className="form-control" onChange={getData} name="pname" />
                <input type="number" placeholder="Product Price" className="form-control my-2" onChange={getData} name="pprice" />
                <input type="text" placeholder="Product Image" className="form-control" onChange={getData} name="pimage" />
                <input type="text" placeholder="Product Thumbnail" className="form-control my-2" onChange={getData} name="pthumbnail" />
                <input type="text" placeholder="Product description" className="form-control" onChange={getData} name="pdescription" />
                <input type="text" placeholder="Product catagery" className="form-control my-2" onChange={getData} name="pcatagery" />
                <input type="text" placeholder="Product rating" className="form-control" onChange={getData} name="rate" />
                <input type="text" placeholder="Product count" className="form-control mt-2" onChange={getData} />


            </div>
        </div>
    )
}
export default Addproduct