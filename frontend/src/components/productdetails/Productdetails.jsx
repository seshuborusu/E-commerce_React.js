import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast, Bounce } from 'react-toastify';

function ProductDetails() {
    let { id } = useParams();
    // console.log(id);
    let [product, setProduct] = useState({
        image: "",
        thumbnails: [],
        title: "",
        quantity: 10,
        price: 0,
        description: "",
        rating: {
            rate: 0,
            count: 0,
        },
    });

    const [mainImage, setMainImage] = useState(product.image);

    // const addCart = () => {
    //     axios.post("http://localhost:1234/routes/cart", product, {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem("token")}`
    //         }
    //     })
    //         .then((res) => {
    //             console.log(res);
    //             if (res.data.result === "Product Added to cart") {
    //                 toast.success('Added to Cart', {
    //                     position: "top-right",
    //                     autoClose: 3000,
    //                     hideProgressBar: false,
    //                     closeOnClick: false,
    //                     pauseOnHover: true,
    //                     draggable: true,
    //                     progress: undefined,
    //                     theme: "light",
    //                     transition: Bounce,
    //                 });
                
    //             } else {
    //                 toast.success('Updated the Cart', {
    //                     position: "top-right",
    //                     autoClose: 3000,
    //                     hideProgressBar: false,
    //                     closeOnClick: false,
    //                     pauseOnHover: true,
    //                     draggable: true,
    //                     progress: undefined,
    //                     theme: "light",
    //                     transition: Bounce,
    //                 });
    //             }

    //         })
    //         .catch((err) => { console.log(err); });
    // };

    const addCart = () => {
        // Ensure that the product object contains the necessary fields (_id and quantity)
       
    
        // Post request to add/update the product in the cart
        axios.post("http://localhost:1234/routes/cart", product, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}` // Token from localStorage
            }
        })
        .then((res) => {
            // console.log(res);
            
            // Check for success status code (200 or 201) and process response
            if (res.status === 200 || res.status === 201) {
                if (res.data.result === "Product added to cart") {
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
                } else if (res.data.result === "Product quantity updated in cart") {
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
            }
        })
        .catch((err) => {
            // Check for specific error status codes and display appropriate error messages
            if (err.response) {
                // If server responds with an error status code
                if (err.response.status === 401) {
                    toast.error('Unauthorized. Please login again.', {
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
                } else if (err.response.status === 404) {
                    toast.error('Product not found or user not found.', {
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
                } else {
                    toast.error('Failed to add to cart. Please try again.', {
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
            } else {
                // Handle network errors or other issues
                toast.error('Network error. Please check your internet connection.', {
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
    
            console.error("Error adding product to cart:", err);
        });
    };
    

    useEffect(() => {
        axios.get(`http://localhost:1234/getsingleproduct/${id}`)
            .then((response) => {
                setProduct(response.data.result);
                setMainImage(response.data.result.image); 
                // console.log(response.data.result);
            })
            .catch((error) => {
                console.error("Error fetching product:", error);
            });
    }, [id]);

    // console.log(product.thumbnails);
    const changeImage = (src) => {
        setMainImage(src);
    };


    const getdata = (e) => {
        setProduct({ ...product, quantity: e.target.value })
    }
    // console.log(product);
    return (

        <div className="container my-2" >
            <ToastContainer />
            <div className="row m-2 p-1 py-3">
                <div className="col-12 col-lg-4 ">
                    <img src={mainImage} alt="" height={400} width={"100%"} className="border p-1" />


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
                        <p className="fs-4 fw-normal" style={{ color: "gray" }}>{product.title}</p>
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
                        <input type="text" placeholder="qty" onChange={getdata} />
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