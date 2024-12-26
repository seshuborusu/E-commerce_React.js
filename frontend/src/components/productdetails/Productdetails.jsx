import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import Footer from "../Footer/Footer";
import { FaStar } from "react-icons/fa";
import "./Productdetails.css"
import { CiHeart } from "react-icons/ci";

function ProductDetails() {
    let { id } = useParams();
    // console.log(id);
    let [product, setProduct] = useState({
        image: "",
        thumbnails: [],
        title: "",
        quantity: 0,
        price: 0,
        description: "",
        rating: {
            rate: 0,
            count: 0,
        },
    });

    const [mainImage, setMainImage] = useState(product.image);
    const [buttonText, setButtonText] = useState(true);
    const Navigate = useNavigate()

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

        if (localStorage.getItem("token")) {
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
                            setButtonText(false); // Change button text after updating cart
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
        } else {



            // If the user is not logged in, store the cart data in localStorage
            let cartData = JSON.parse(localStorage.getItem("cart")) || [];
            const isProductInCart = cartData.some(item => item._id === product._id);

            if (isProductInCart) {
                // If the product is already in the cart, update the quantity
                cartData = cartData.map(item =>
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
                toast.success('Updated the Cart', {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "light",
                    transition: Bounce,
                });
            } else {
                // If the product is not in the cart, add it
                cartData.push(product);
                toast.success('Added to Cart', {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "light",
                    transition: Bounce,
                });
            }

            // Save the updated cart data back to localStorage
            localStorage.setItem("cart", JSON.stringify(cartData));
            setButtonText(false); // Change button text after updating the cart

        }
    };


    const goToCart = () => {
        Navigate("/cart")
    }

    const formatPrice = (price) => {
        if (typeof price === "number" && !isNaN(price)) {
            return price.toLocaleString(); // Formats the number with commas
        }
        return "0"; // Return 0 if price is not a valid number
    };


    useEffect(() => {
        axios.get(`http://localhost:1234/getsingleproduct/${id}`)
            .then((response) => {
                setProduct(response.data.result);
                setMainImage(response.data.result.image);
                // console.log(response.data.result);
                const logged = localStorage.getItem("logged")
                if (logged) {
                    axios.get(`http://localhost:1234/routes/getcartdata`, { //cjecking when the product is present in card r not
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                    }).then((cartResponse) => {
                        // console.log(cartResponse);
                        const isProductInCart = cartResponse.data.result.some(item => item._id === id);

                        if (isProductInCart) {
                            setButtonText(false); // Change to "Go to Cart" if the product is in the cart
                        }
                    }).catch((error) => {
                        console.error("Error checking cart:", error);
                        console.log(error);
                    });
                }

            })
            .catch((error) => {
                console.error("Error fetching product:", error);
            });
    }, [id]);

    // console.log(product.thumbnails);
    const changeImage = (src) => {
        setMainImage(src);
    };

    const style = {
        title: {
            fontSize: "18px!important",
            color: "black",
            fontWeight: "600"
        }
    }
    // console.log(product);
    return (
        <div>
            <div className="container my-2" >

                <div className="row  py-3">
                    <div className="col-12 col-lg-5 col-md-5">
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


                    <div className="col-lg-7 col-md-7 col-12 ">
                        <div>
                            {/* <p>Title</p> */}
                            <p className="" style={style.title}>{product.title}</p>
                        </div>

                        <div className="d-flex my-2 align-items-center">

                            <p className="bg-success d-inline rounded-4 product-rating">{product.rating.rate} <FaStar className=" rating-star" /> </p>
                            <p className="product-reviews ">({product.rating.count} Reviews)</p>

                        </div>
                        <div>

                            <p className="product-price p-0 m-0"><i className="bi bi-currency-rupee rupeesymbol "></i>{formatPrice(product.price)}</p>
                            <p className="taxes">Inclusive of all taxes</p>
                        </div>
                        <div className="mt-3">
                            <p className="product-description p-0 m-0" >Description</p>
                            <p className="description-content">{product.description}</p>
                        </div>
                        <div className=""><p className="product-description m-0">Specifications</p>
                            <p className="m-0">Brand: Shop</p>
                            <p className="m-0">color: NA</p>
                            <p>Country of Origin: India</p>
                        </div>

                        <div className="d-flex mt-5 ">
                            {buttonText ? (
                                <button className=" w-50 cart-button me-3 p-2" onClick={addCart}>Add to Cart</button>
                            ) : (
                                <button className="  w-50 cart-button p-2 me-3" onClick={goToCart}>Go to Cart</button>
                            )}
                            <button className="wishlist-button  w-50 "><CiHeart className="fs-4 mb-1" /> Wishlist</button>
                        </div>
                    </div>
                </div>

                <ToastContainer />


            </div>
            <Footer />
        </div>
    );
}

export default ProductDetails;