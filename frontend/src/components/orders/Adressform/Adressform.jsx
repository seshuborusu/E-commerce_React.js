import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Addressform() {
    const [address, setAddress] = useState({
        name: '', // To store the name of the user
        street: '', // Street address
        city: '',
        state: '',
        zip: '',
        phoneNumber: ''
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
            navigate("/ordersummery"); // Redirect back to placeorder after saving address
        } catch (error) {
            toast.error("Error saving address");
        }
    };


    return (
        <div className="container mt-5 ">
            <div className="container d-flex justify-content-center flex-column ">
                <h3>Shipping Address</h3>
                <div className="row d-flex justify-content-center">
                    <div class="col-12 col-md-4 mb-2">
                        <label for="exampleFormControlInput1" class="form-label mb-1">Name</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="John " onChange={handleInputChange} name='name' />
                    </div>
                    <div class="col-12 col-md-4 mb-2 ">
                        <label for="exampleFormControlInput1" class="form-label mb-1">Email address</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Tie" onChange={handleInputChange} name='street' />
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div class="mb-2 col-12 col-md-8">
                        <label for="exampleFormControlInput1" class="form-label mb-1">Email address</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" onChange={handleInputChange} name='city' />
                    </div>
                    <div class="mb-2 col-12 col-md-8">
                        <label for="exampleFormControlInput1" class="form-label mb-1">Phone Number</label>
                        <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="0000000000" onChange={handleInputChange} name='state' />
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div class="mb-2 col-12 col-md-3">
                        <label for="exampleFormControlInput1" class="form-label mb-1">Email address</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" onChange={handleInputChange} name='zip' />
                    </div>
                    <div class="mb-2 col-12 col-md-3">
                        <label for="exampleFormControlInput1" class="form-label mb-1">Phone Number</label>
                        <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="0000000000" onChange={handleInputChange} name='phoneNumber' />
                    </div>
                    <div class="mb-2 col-12 col-md-2">
                        <label for="exampleFormControlInput1" class="form-label mb-1">Phone Number</label>
                        <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="0000000000" />
                    </div>
                </div>
                <div> <button onClick={handleSaveAddress}>submit</button></div>
            </div>

        </div>
    )
}
export default Addressform