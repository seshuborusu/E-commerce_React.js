import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState } from 'react';
import "./Login.css"
function Login({onswitch}) {

    let [state, setSate] = useState(false)
    return (
        <div>
            <h3 className='text-center'> Login  </h3>
            <Box
                component="form"
                sx={{ '& .MuiTextField-root': { m: 1, width: '100%' } }}
                noValidate
                autoComplete="off"

            >
                <TextField
                    id="outlined-password-input"
                    label="Mobile"
                    type="Number"
                    autoComplete="current-password"
                    size='small'
                    color='success'

                />

                <TextField
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    size='small'
                    color='success'

                />
                <p className='px-2 text-link'>Forgot Password?</p>

                <div className='text-center mt-2 '> <button  className=' btn-danger btn  butn px-3'>Submit</button></div>
                <div className='text-center mt-1'><p>Dont have an Account? <span className='text-link fw-bold'  onClick={onswitch} style={{cursor:"pointer"}}>Register</span></p></div>
            </Box>

        </div>
    )
}
export default Login