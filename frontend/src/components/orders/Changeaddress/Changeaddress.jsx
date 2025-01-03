import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Slide transition from the bottom
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function BottomToTopModal() {
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const logged = localStorage.getItem("logged");
    const storedtoken = localStorage.getItem("token");
    const navigate = useNavigate();

    // Fetch addresses on component mount
    useEffect(() => {
        axios.get("http://localhost:1234/routes/getAddresses", {
            params: { mobile: logged },
            headers: {
                Authorization: `Bearer ${storedtoken}`,
            },
        })
            .then((res) => {
                setAddress(res.data.addresses || []);
                //console.log(res.data);
                // Set the first address as the default selected address if available
                if (res.data.addresses && res.data.addresses.length > 0) {
                    setSelectedAddress(res.data.addresses[0]);
                }
            })
            .catch((err) => {
                alert("Error fetching addresses");
            });
    }, []);

    const handleAddressChange = (address) => {
        setSelectedAddress(address); // Update the selected address
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleSelectAddress = () => {
        if (selectedAddress) {
            navigate("/ordersummery", {
                state: { selectedAddress },
            });
            handleClose(); // Close the modal
        } else {
            alert("Please select an address.");
        }
    };

    const handleEditAddress = () => {
        navigate("/editaddress", { state: { selectedAddress } })
        handleClose(); // Close the current modal (address selection)
    };

    //console.log(location.state);
    const removeAddress = (id) => {
        console.log(id);
        axios.delete(`http://localhost:1234/routes/removeaddress/${id}`, {
            params: { mobile: logged },
        }).then((res) => {
            console.log(res.data);
            setAddress((prevAddresses) => prevAddresses.filter((address) => address._id !== id));

        }).catch((err) => { alert("err") })
    }

    return (
        <div>
            <button className='address-btn' onClick={handleOpen}>
                Edit/Change
            </button>

            {/* Address Selection Modal */}
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    '& .MuiDialog-paper': {
                        width: '50vw',
                        maxWidth: 'none',
                        '@media (max-width: 960px)': {
                            width: '60vw',
                        },
                        '@media (max-width: 600px)': {
                            width: '80vw',
                        },
                    },
                }}
            >
                <DialogContent className='px-2'>
                    <div>
                        {address.map((address, ind) => (
                            <div key={ind} className='border-bottom '>
                                <label
                                    htmlFor={`address-${ind}`} // Link the label to the radio input
                                    className="d-flex align-items-center px-2 cursor-pointer"
                                    style={{ display: 'block', width: '100%', padding: '10px', cursor: 'pointer' }} // Ensure the whole div is clickable
                                >
                                    {/* Radio Button */}
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="address"
                                        id={`address-${ind}`}
                                        onChange={() => handleAddressChange(address)}
                                        checked={selectedAddress === address}
                                        style={{
                                            marginRight: '10px', // Space between the radio button and the address text
                                        }}
                                    />
                                    <div className=" p-1 m-0 address-container" style={{ width: '100%' }}>
                                        <h6>{address.name}</h6>
                                        <p>{address.address}, {address.city}, {address.state}, {address.zip}</p>
                                        <p>Mobile: <span>{address.phone}</span></p>
                                    </div>
                                </label>
                                {selectedAddress === address && (
                                    <div className="text-end me-md-5">
                                        <button
                                            className="address-btn"
                                            onClick={handleEditAddress} // Open edit modal
                                        >
                                            Edit
                                        </button>
                                        <button className="address-btn" onClick={() => { removeAddress(address._id) }}>Remove</button>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="text-center mt-3 border p-1">
                            <button
                                className="address-btn "
                                onClick={handleSelectAddress}
                            >
                                Ship to this address
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
