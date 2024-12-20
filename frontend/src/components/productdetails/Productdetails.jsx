import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer,toast,Bounce } from 'react-toastify';

function ProductDetails() {
    let { id } = useParams();
    // console.log(id);
    let [product, setProduct] = useState({
        image: "",
        thumbnails: [],
        title: "",
        quantity:10,
        price: 0,
        description: "",
        rating: {
            rate: 0,
            count: 0,
        },
    });

    const [mainImage, setMainImage] = useState(product.image);

    const addCart = () => {
        axios.post("http://localhost:1234/routes/cart", product)
            .then((res) => {

                if(res.data.result==="Product Added to cart"){
                toast.success('Added to Cart', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
                    // console.log(res.data);
                }else{
                    toast.success('Updated the Cart', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                        });
                }

             })
            .catch((err) => { console.log(err); });
    };

    useEffect(() => {
        axios.get(`http://localhost:1234/getsingleproduct/${id}`)
            .then((response) => {
                setProduct(response.data.result);
                setMainImage(response.data.result.image); // Set the main image from the fetched product
                console.log(response.data.result);
            })
            .catch((error) => {
                console.error("Error fetching product:", error);
            });
    }, [id]);

    // console.log(product.thumbnails);
    const changeImage = (src) => {
        setMainImage(src);
    };


    const getdata=(e)=>{
        setProduct({...product,quantity:e.target.value})
    }
// console.log(product);
    return (

        <div className="container my-2" >
            <ToastContainer/>
            <div className="row m-2 p-1 py-3">
                <div className="col-12 col-lg-4 ">
                    <img src={mainImage} alt="" height={400} width={"100%"} className="border p-1"/>


                    <div className="d-flex px-1 gap-1" >
                        {product.thumbnails.length > 0 ? (
                            product.thumbnails.map((thumbnail, index) => (
                               
                                <div className="my-2" key={index}>
                                    <img
                                        src={thumbnail.url}
                                        className="img-fluid "
                                        alt={`Thumbnail ${index + 1}`}
                                        onMouseMove={() => changeImage(thumbnail.url)}
                                        style={{ cursor: 'pointer', height: '70px', objectFit: 'cover', borderRadius: '4px' }}
                                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                    />
                                </div>
                            ))
                        ) : (
                            <p>No thumbnails available</p> // Fallback message if no thumbnails
                        )}
                    </div>

                </div>


                <div className="col-lg-8 col-12 ">
                    <div>
                        {/* <p>Title</p> */}
                        <p className="fs-4 fw-normal" style={{color:"gray"}}>{product.title}</p>
                    </div>
                    <div>
                        
                        <p className="fs-4 text-danger fw-bold "><i class="bi bi-currency-rupee"></i>{product.price}</p>
                    </div>
                    <div className="d-flex ">
                        
                        <p className="px-2 text-light fw-semibold bg-success d-inline rounded-1 ">{product.rating.rate} </p>
                        <p className="ms-2 fw-semibold">{product.rating.count} Reviews</p>
                    </div>
                    <div className="mt-3">
                        <p className="my-2 fs-5 fw-normal " >Description</p>
                        <p>{product.description}</p>
                    </div>

                    <div>
                        qty
                        <input type="text" placeholder="qty" onChange={getdata}/>
                    </div>
                    <div className="d-flex mt-5 ">
                    <button className="btn btn-success w-50 me-4 p-1" onClick={addCart}>Add to cart</button>
                    <button className="btn btn-danger w-50">Wishlist</button>  
                    </div>
                </div>
            </div>




        </div>
    );
}

export default ProductDetails;