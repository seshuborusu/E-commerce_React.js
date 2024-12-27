import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Addressform() {
    const [address, setAddress] = useState({
        address: '',
        city: '',
        state: '',
        zip: ''
    });
const navigate=useNavigate()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddress((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    console.log(address);

    
    return (
        <div className="container mt-5 ">
            <div className="container d-flex justify-content-center flex-column ">
                <h3>Shipping Address</h3>
                <div className="row d-flex justify-content-center">
                    <div class="col-12 col-md-4 mb-2">
                        <label for="exampleFormControlInput1" class="form-label mb-1">Name</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="John " onChange={handleInputChange} name='address' />
                    </div>
                    <div class="col-12 col-md-4 mb-2 ">
                        <label for="exampleFormControlInput1" class="form-label mb-1">Email address</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Tie" onChange={handleInputChange} name='city' />
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div class="mb-2 col-12 col-md-8">
                        <label for="exampleFormControlInput1" class="form-label mb-1">Email address</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" onChange={handleInputChange} name='state' />
                    </div>
                    <div class="mb-2 col-12 col-md-8">
                        <label for="exampleFormControlInput1" class="form-label mb-1">Phone Number</label>
                        <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="0000000000" onChange={handleInputChange} name='zip' />
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <div class="mb-2 col-12 col-md-3">
                        <label for="exampleFormControlInput1" class="form-label mb-1">Email address</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                    </div>
                    <div class="mb-2 col-12 col-md-3">
                        <label for="exampleFormControlInput1" class="form-label mb-1">Phone Number</label>
                        <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="0000000000" />
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