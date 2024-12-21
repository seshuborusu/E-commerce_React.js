import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useState } from 'react';
import "./Login.css"
import axios from "axios"
import { toast,Bounce } from 'react-toastify';
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

    const login = () => {
        axios.post("http://localhost:1234/routes/getuser", user).then((res) => {
            console.log(res.data);
            if (res.data.ok) {
                localStorage.setItem("token",res.data.result)
                
                onclose() //for closing
                navigate("/")
            }else{
                // alert("user not found")
                toast.error('Please enter valid Details', {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });

            }
        }).catch((err) => {
            alert("error")
        })
    }

    return (
        <div>
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

                <div className='text-center mt-2 '> <button className=' btn-danger btn  butn px-3' onClick={login}>Submit</button></div>
                <div className='text-center mt-1'><p>Dont have an Account? <span className='text-link fw-bold' onClick={onswitch} style={{ cursor: "pointer" }}>Register</span></p></div>
            </Box>

        </div>
    )
}
export default Login