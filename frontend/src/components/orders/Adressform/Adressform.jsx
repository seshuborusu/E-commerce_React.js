import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Addressform.css"
function Addressform() {
    const [address, setAddress] = useState({
        name: '', // To store the name of the user
        phone: '',
        zip: '',
        city: '',
        state: '',
        address: "",
        street: '', // Street address


    });
    const navigate = useNavigate();
    const storedtoken = localStorage.getItem("token");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddress((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveAddress = async () => {
        console.log(address);
        try {
            const user = await axios.post(
                "http://localhost:1234/routes/addAddress",
                { mobile: localStorage.getItem("logged"), address },
                {
                    headers: {
                        Authorization: `Bearer ${storedtoken}`,
                    },
                }
            );
            toast.success("Address saved successfully!");
            navigate("/ordersummery");
            alert("added")// Redirect back to placeorder after saving address
        } catch (error) {
            toast.error("Error saving address");
        }
    };


    return (
        <div className="container mt-2 border py-5">
            <div className=" d-flex justify-content-cente flex-column">
                <h3 className='text-center fw-bold mb-4'>Shipping Address</h3>
                <div className="row d-flex justify-content-center">
                    <div class="col-12 col-md-8 mb-2">
                        <label for="exampleFormControlInput1" class="form-label mb-1 fw-semibold">Name</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="John " onChange={handleInputChange} name='name' />
                    </div>
                    <div class="col-12 col-md-8 mb-2 ">
                        <label for="exampleFormControlInput1" class="form-label mb-1 fw-semibold">Phone Number</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Tie" onChange={handleInputChange} name='phone' />
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div class="mb-2 col-12 col-md-2">
                        <label for="exampleFormControlInput1" class="form-label mb-1 fw-semibold">Pincode</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="000000" onChange={handleInputChange} name='zip' />
                    </div>
                    <div class="mb-2 col-12 col-md-3">
                        <label for="exampleFormControlInput1" class="form-label mb-1 fw-semibold">City</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter city" onChange={handleInputChange} name='city' />
                    </div>
                    <div class="mb-2 col-12 col-md-3">
                        <label for="exampleFormControlInput1" class="form-label mb-1 fw-semibold">State</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Enter State" onChange={handleInputChange} name='state' />
                    </div>

                </div>
                <div className="row d-flex justify-content-center">
                    <div class="mb-2 col-12 col-md-5">
                        <label for="exampleFormControlInput1" class="form-label mb-1 text-dark fw-semibold">Address</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Address" onChange={handleInputChange} name='address' />
                    </div>
                    <div class="mb-2 col-12 col-md-3">
                        <label for="exampleFormControlInput1" class="form-label mb-1 fw-semibold">Street</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Street" onChange={handleInputChange} name='street' />
                    </div>
                </div>

            </div>
            <div className=' mt-2 p-3 row d-flex justify-content-center'>
                <button onClick={handleSaveAddress} className='form-proceedbtn col-12 col-md-4 col-lg-4 text-center'>Save Address</button>
            </div>
        </div>
    )
}
export default Addressform