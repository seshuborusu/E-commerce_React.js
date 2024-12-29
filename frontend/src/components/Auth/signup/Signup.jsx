import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useState } from 'react';
import axios from "axios"
import { toast, Bounce, ToastContainer } from 'react-toastify';


function Signup({ onswitch }) {
    let [userdata, setUserdata] = useState({
        name: "", mobile: 0, password: ""
    })

    const getuserdetails = (event) => {
        const { name, value } = event.target
        setUserdata({ ...userdata, [name]: value })
    }



    const postData = () => {
        // console.log(userdata); // Log the data you are about to send to the backend.

        axios.post("http://localhost:1234/routes/signup", userdata)
            .then((res) => {
                // console.log(res.data); // Log the response data

                // Check if the response is successful and user is registered
                if (res.status === 201 && res.data.ok) {
                    toast.success('User registered successfully!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce, // Bounce transition effect for success
                    });

                    onswitch(); // Call onswitch or any function to handle post-signup logic (like redirect to login)
                } else {
                    // Handle the case when the user already exists (Error from backend)
                    toast.error(res.data.message || 'User already exists', {
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
            .catch((error) => {
                // console.log(error); // Log the error for debugging

                // Handle different types of errors
                if (error.response) {
                    if (error.response.status === 400) {
                        // User already exists or other 400 error from backend
                        toast.error(error.response.data.message || 'User already exists', {
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
                    } else if (error.response.status === 500) {
                        // Server error
                        toast.error('Internal server error. Please try again later.', {
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
                    // Handle network errors or issues outside the backend
                    toast.error("Error while signing up. Please try again.", {
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
            });
    }

    return (
        <div className='container-fluid'>
            <ToastContainer />
            <h3 className='text-center'> Sign Up </h3>

            <Box
                // component="frm"
                sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}
                noValidate
                autoComplete="off"

            >
                <TextField
                    id="outlined-name-input"
                    label="Name"
                    type="text"
                    autoComplete="current-password"
                    size='small'
                    color='success'
                    onChange={getuserdetails}
                    name='name'

                />

                <TextField
                    id="outlined-mobile-input"
                    label="Mobile"
                    type="number"
                    autoComplete=""
                    size='small'
                    color='success'
                    onChange={getuserdetails}
                    name="mobile"


                />

                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    size='small'
                    color='success'
                    onChange={getuserdetails}
                    name="password"

                />

                <div className='  text-center mt-2'> <button className=' btn-danger btn  butn  px-4 ' onClick={postData}>
                    Submit</button></div>
                <div className='text-center mt-2'><p>Already an Account? <span className='text-link fw-bold' onClick={onswitch} style={{ cursor: "pointer" }}>Login</span> </p></div>
            </Box>

        </div>








    )
}
export default Signup