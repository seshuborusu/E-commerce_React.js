import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function EditAddress() {
    const location = useLocation();
    const navigate = useNavigate();

    // Retrieve the address passed from the Shippingaddress component
    const [address, setAddress] = useState(location.state.selectedAddress || {
        name: '', // To store the name of the user
        phone: '',
        zip: '',
        city: '',
        state: '',
        address: "",
        street: ''
    });

    console.log(location.state);
    const [loading, setLoading] = useState(false);

    const saveAddress = async () => {

        setLoading(true);

        try {
            const response = await axios.post("http://localhost:1234/routes/updateAddress", {
                mobile: localStorage.getItem("logged"),  // Pass the logged user's mobile number
                address: address
            });

            if (response.data.success) {
                // alert("Address updated successfully");
                navigate("/ordersummery");  // Redirect to the shipping page
            } else {
                alert("Failed to update address");
            }
        } catch (error) {
            console.error("Error updating address:", error);
            alert("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <div className="container mt-2 border py-5">
                <div className=" d-flex justify-content-cente flex-column">
                    <h3 className='text-center fw-bold mb-4'>Edit Address</h3>
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 col-md-8 mb-2">
                            <label for="exampleFormControlInput1" className="form-label mb-1 fw-semibold">Name</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="John " onChange={handleChange} name='name' value={address.name} />
                        </div>
                        <div className="col-12 col-md-8 mb-2 ">
                            <label for="exampleFormControlInput1" className="form-label mb-1 fw-semibold">Phone Number</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Tie" onChange={handleChange} name='phone' value={address.phone} />
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <div className="mb-2 col-12 col-md-2">
                            <label for="exampleFormControlInput1" className="form-label mb-1 fw-semibold">Pincode</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="000000" onChange={handleChange} name='zip' value={address.zip} />
                        </div>
                        <div className="mb-2 col-12 col-md-3">
                            <label for="exampleFormControlInput1" className="form-label mb-1 fw-semibold">City</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter city" onChange={handleChange} name='city' value={address.city} />
                        </div>
                        <div className="mb-2 col-12 col-md-3">
                            <label for="exampleFormControlInput1" className="form-label mb-1 fw-semibold">State</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Enter State" onChange={handleChange} name='state' value={address.state} />
                        </div>

                    </div>
                    <div className="row d-flex justify-content-center">
                        <div className="mb-2 col-12 col-md-5">
                            <label for="exampleFormControlInput1" className="form-label mb-1 text-dark fw-semibold">Address</label>
                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Address" onChange={handleChange} name='address' value={address.address} />
                        </div>
                        <div className="mb-2 col-12 col-md-3">
                            <label for="exampleFormControlInput1" className="form-label mb-1 fw-semibold">Street</label>
                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Street" onChange={handleChange} name='street' value={address.street} />
                        </div>
                    </div>

                </div>
                <div className=' mt-2 p-3 row d-flex justify-content-center'>
                    <button onClick={saveAddress} className='form-proceedbtn col-12 col-md-4 col-lg-4 text-center'>{loading ? "Updating..." : "Update Address"}</button>
                </div>
            </div>

        </div>
    );
}

export default EditAddress;
