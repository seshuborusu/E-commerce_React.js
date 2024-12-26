import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useState } from 'react';
import "./Login.css"
import axios from "axios"
import { toast,Bounce, ToastContainer } from 'react-toastify';
import {useNavigate} from "react-router-dom"
function Login({ onswitch, onclose }) {

    let [user, setUser] = useState({
        mobile: "", password: ""
    })
    const navigate=useNavigate()


    const getuserData = (event) => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })
    }
// console.log(user);
    const login = (user, onclose) => {
        axios.post("http://localhost:1234/routes/login", user)
            .then((res) => {
                console.log(res.data);
                if (res.data.ok) {
                    // Successfully logged in, store token
                    localStorage.setItem("token", res.data.result);
                    localStorage.setItem("logged",true)
    
                    // Close the login modal (or other UI element) if applicable
                    onclose();
    
                    // Navigate to the homepage
                    navigate("/");
                } else {
                    // If user not found or invalid credentials
                    toast.error('Invalid mobile number or password.', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce, // Ensure proper toast transition
                    });
                }
            })
            .catch((err) => {
                console.error("Error during login:", err);
                console.log(err);
                // Network or server error
                toast.error("An error occurred. Please try again later.", {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: "bounce",
                });
            });
    };
    return (
        <div>
            <ToastContainer/>
            <h3 className='text-center'> Login  </h3>
           
            <Box
                // component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}
                noValidate
                autoComplete="off"

            >
                <TextField
                    id="outlined-mobile-input"
                    label="Mobile"
                    type="Number"
                    autoComplete="current-password"
                    size='small'
                    color='success'
                    onChange={getuserData}
                    name='mobile'

                />

                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    size='small'
                    color='success'
                    onChange={getuserData}
                    name='password'

                />
                <p className='px-2 text-link'>Forgot Password?</p>

                <div className='text-center mt-2 '> <button className=' btn-danger btn  butn px-3' onClick={() => login(user, onclose)}>Submit</button></div>
                <div className='text-center mt-1'><p>Dont have an Account? <span className='text-link fw-bold' onClick={onswitch} style={{ cursor: "pointer" }}>Register</span></p></div>
            </Box>

        </div>
    )
}
export default Login